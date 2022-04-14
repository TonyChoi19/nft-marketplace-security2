<?php 
header("content-type: application/json; charset=utf8");
enum DBProcess_Type {
    case UPDATE;
    case SELECT;
    case DELETE;
    case INSERT;

}
$request = json_decode(file_get_contents("php://input"));
$cur_process = $request->Process;
if (isset($cur_process)) {
    $column_array = array();
    $value_array = array();
    if (is_null($request->Columns)) $column_array = array();
    else $column_array = explode(",", $request->Columns);
    if (is_null($request->Values)) $value_array = array();
    else $value_array = explode(",", $request->Values);
	switch($cur_process){
        case "GetData":
            execSQL(DBProcess_Type::SELECT, $request->Table, $column_array, $request->Conditions, $value_array, $request->Orderby, $request->Ordersort, $request->Extra);
        break;
        case "InsertData":
            execSQL(DBProcess_Type::INSERT, $request->Table, $column_array, $request->Conditions, $value_array, $request->Orderby, $request->Ordersort, $request->Extra);
        break;
        case "UpdateData":
            execSQL(DBProcess_Type::UPDATE, $request->Table, $column_array, $request->Conditions, $value_array, $request->Orderby, $request->Ordersort, $request->Extra);
        break;
        case "RemoveData":
            execSQL(DBProcess_Type::DELETE, $request->Table, $column_array, $request->Conditions, $value_array, $request->Orderby, $request->Ordersort, $request->Extra);
        break;
    }
}

function execSQL(DBProcess_Type $type, $tb_name, $columns = array(""), $condition = "", $values = array(""), $orderby = "", $ordersort = "", $extra = ""){
    require_once('../MySQL/config.php');
    $result = array();
    $cur_table = constant($tb_name);
    $sql_query = "";
    if(empty($columns)) $str_columns = "*";
    else $str_columns = implode(",", $columns);
    if(empty($ordersort)) $ordersort = "ASC";
    switch($type){
        case DBProcess_Type::SELECT:
            if($condition == ""){
                $sql_query = "SELECT " . $str_columns . " FROM " . $cur_table;
            } else {
                $sql_query = "SELECT " . $str_columns . " FROM " . $cur_table . " WHERE " . $condition;
            }
            if($orderby != ""){
                if($ordersort != "")
                    $sql_query .= " Order by " . $orderby . " " . $ordersort;
                else
                    $sql_query .= " Order by " . $orderby . " ASC"; //Defealt ASC Sorting
            }

                
            $sql_exec = $conn->prepare($sql_query);
            $sql_exec->execute($values);
            $count = $sql_exec->rowCount();
            if($count == 0){
                $result["Status"] = "Execution Success";
                $result["Message"] = "No Record(s) found\n";
                $result["SQL"] = $sql_query;
            }
            else{
                $result["Status"] = "Execution Success";
                $result["Message"] = "Record(s) found";
                $result["SQL"] = $sql_query;
                $result["Results"] = $sql_exec->fetchALL(PDO::FETCH_ASSOC);
            }
        break;
        case DBProcess_Type::DELETE:
            if($condition == "" && !str_contains($extra, "limit 1")){
                $result["Status"] = "Execution Failure";
                $result["Message"] = "At least one condition must be established to prevent modification of all records!";
                $result["SQL"] = $sql_query;
            } else {
                if($condition != "")
                    $sql_query = "DELETE FROM " . $cur_table . " WHERE " . $condition;
                else
                    $sql_query = "DELETE FROM " . $cur_table;
                if(str_contains($extra, "limit 1")){
                    if($orderby != ""){
                        if($ordersort != "")
                            $sql_query .= " Order by " . $orderby . " " . $ordersort . " " . $extra;
                        else
                            $sql_query .= " Order by " . $orderby . " ASC" . " " . $extra;; //Defealt ASC Sorting
                    }
                }

                $sql_exec = $conn->prepare($sql_query);
                $sql_exec->execute($values);
                $count = $sql_exec->rowCount();
                
                if($count == 0){
                    $result["Status"] = "Execution Success";
                    $result["Message"] = "No Record(s) can be affected\n";
                    $result["SQL"] = $sql_query;
                }
                else{
                    $result["Status"] = "Execution Success";
                    $result["Message"] = "The Record in " . $cur_table . " has been deleted";
                    $result["SQL"] = $sql_query;
                }
            }
        break;
        case DBProcess_Type::INSERT:
            $combined_sets = "";
            if(count($columns) != count($values)){
                $result["Status"] = "Execution Failure";
                $result["Message"] = "Columns and Values Length Not Match!";
                $result["SQL"] = $sql_query;
            } else {
                for($i = 0; $i < count($values); $i++){
                    $combined_sets .= "?";
                    if($i !== count($columns) - 1) $combined_sets .= ", ";
                }
                $sql_query = "INSERT INTO " . $cur_table . " ("  . $str_columns . ") VALUES ("  . $combined_sets . ");";
                $sql_exec = $conn->prepare($sql_query);
                $sql_exec->execute($values);
                $count = $sql_exec->rowCount();
                if($count == 0){
                    $result["Status"] = "Execution Success";
                    $result["Message"] = "No Record(s) can be affected\n";
                    $result["SQL"] = $sql_query;
                }
                else{
                    $result["Status"] = "Execution Success";
                    $result["Message"] = "The New Record has been insert to " . $cur_table;
                    $result["SQL"] = $sql_query;
                }
            }
        break;
        case DBProcess_Type::UPDATE:
            $combined_sets = "";
            if(count($columns) != count($values)){
                $result["Status"] = "Execution Failure";
                $result["Message"] = "Columns and Values Length Not Match!";
                $result["SQL"] = $sql_query;
            }
            for($i = 0; $i < count($columns); $i++){
                $combined_sets .= $columns[$i] . "= ?";
                if($i !== count($columns) - 1) $combined_sets .= ", ";
            }
            $sql_query = "UPDATE " . $cur_table . " SET " . $combined_sets . " WHERE " . $condition;
            if($condition == ""){
                $result["Status"] = "Execution Failure";
                $result["Message"] = "At least one condition must be established to prevent modification of all records!";
                $result["SQL"] = $sql_query;
            } else {
                $sql_exec = $conn->prepare($sql_query);
                $sql_exec->execute($values);
                $count = $sql_exec->rowCount();
                if($count == 0){
                    $result["Status"] = "Execution Success";
                    $result["Message"] = "No Record(s) can be affected\n";
                    $result["SQL"] = $sql_query;
                }
                else{
                    $result["Status"] = "Execution Success";
                    $result["Message"] = "The Record in " . $cur_table . " has been updated";
                    $result["SQL"] = $sql_query;
                }
            }
        break;
    }
    exit(json_encode($result));
}

?>