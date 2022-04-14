export default function Blog(props) {
  const { posts } = props
  return (
    <div>
      <p>Current Sample:</p>
      <h1>Insert Data</h1>
      <br></br>
      <p>
        Results: <br></br>
      </p>
      <p>Status: {posts.Status}</p>
      <p>Message: {posts.Message}</p>
      <p>SQL Statement: {posts.SQL}</p>
      <br></br>
    </div>
  )
}
/*
Examples for getting data from DB with function.php by JQUERY AJAX
'Values' is useless in these cases, no need to set
This Example will execute the following SQL Statement:
    INSERT INTO marketplace (NFT_ID, Owner, OnSale, Price, Collection_ID) VALUES (?, ?, ?, ?, ?);
*The values setting in attribute - "Values" will replace each question mark sequentially
*/
export async function getStaticProps(context) {
  var test_value = '10, 12, 0, 74, 1'
  const res = await fetch('https://comp3334.test/DBTest/API/function.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Process: 'InsertData',
      Table: 'TABLE_MARKET',
      Columns: 'NFT_ID, Owner, OnSale, Price, Collection_ID',
      Conditions: null,
      Values: test_value,
      Orderby: null,
      Ordersort: null,
      Extra: null,
    }),
  })
  const posts = await res.json()
  return {
    props: { posts },
  }
}
