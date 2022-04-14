<?php
date_default_timezone_set("Asia/Hong_Kong");
define("DB_HOST", "localhost");
define("DB_NAME", "YOUR_DB_NAME_HERE");
define("DB_PASS", "YOUR_DBACOUNT_PASSWORD_HERE");
define("DB_USER", "YOUR_DBACOUNT_NAME_HERE");

define("PHP_VARNAME", "DB_TABLENAME");

if(constant("DB_NAME") == "YOUR_DB_NAME_HERE" || constant("DB_PASS") == "YOUR_DBACOUNT_PASSWORD_HERE" || constant("DB_USER") == "YOUR_DBACOUNT_NAME_HERE"){
   print("config missing, please edit your config.php file first");
   die();
}

try{
   $conn = new PDO('mysql:host='.DB_HOST.';'.'dbname='.DB_NAME.';'.'charset=utf8', DB_USER,DB_PASS);
} catch (PDOException $e) {
   print "Error!: " . $e->getMessage() . "<br/>";
   die();
}
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>