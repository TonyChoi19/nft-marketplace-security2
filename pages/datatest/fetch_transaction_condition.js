export default function Blog(props){
    const {posts} = props;
    return (
        <div>
            <p>Status: {posts.Status}</p>
            <p>Message: {posts.Message}</p>
            <p>SQL Statement: {posts.SQL}</p><br></br>
            <p>Current Sample:</p>
            <h1>Selected Data with Condition</h1><br></br>
            <p>Results: <br></br></p>
            {
                posts.Results.map(
                    (item) => 
                    <>
                        <p>NFTID: {item.NFT_ID}</p>
                        <p>Seller: {item.FromUser}</p>
                        <p>Buyer: {item.ToUser}</p>
                        <p>Price: {item.Price}</p>
                        <p>Transaction Date: {item.TransactionDatetime}</p>
                        <p>--------------------------------</p>
                    </>
                )
            }
        </div>
    )
}
/* 
Examples for getting data from DB with function.php by JQUERY AJAX
'Values' is useless in these cases, no need to set
This Example will execute the following SQL Statement:
    SELECT * FROM marketplace WHERE NFT_ID = ?
*The values setting in attribute - "Values" will replace each question mark sequentially
*/
export async function getStaticProps(context) {
    const res = await fetch("http://comp3334.test/DBTest/API/function.php", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {Process:"GetData", Table: "TABLE_TRANSACTION", Columns: null, Conditions: "NFT_ID = ?", Values: "112",
                Orderby: null, Ordersort: null, Extra: null}),	
    })
    const posts = await res.json();
    return{
        props: {posts}
    }
}