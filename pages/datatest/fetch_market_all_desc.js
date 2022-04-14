export default function Blog(props) {
  const { posts } = props
  return (
    <div>
      <p>Status: {posts.Status}</p>
      <p>Message: {posts.Message}</p>
      <p>SQL Statement: {posts.SQL}</p>
      <br></br>
      <p>Current Sample:</p>
      <h1>All Data in MarketPlace with DESC Ordering</h1>
      <br></br>
      <p>
        Results: <br></br>
      </p>
      {posts.Results.map((item) => (
        <>
          <p>NFTID: {item.NFT_ID}</p>
          <p>Owner: {item.Owner}</p>
          <p>OnSale: {item.OnSale}</p>
          <p>Price: {item.Price}</p>
          <p>CollectionID: {item.Collection_ID}</p>
          <p>--------------------------------</p>
        </>
      ))}
    </div>
  )
}
/* 
Examples for getting data from DB with function.php by JQUERY AJAX
'Values' is useless in these cases, no need to set
This Example will execute the following SQL Statement:
    SELECT * FROM marketplace ORDER BY NFT_ID DESC
*/
export async function getStaticProps(context) {
  const res = await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Process: 'GetData',
      Table: 'TABLE_MARKET',
      Columns: null,
      Conditions: "Collection_ID = '1'",
      Values: null,
      Orderby: 'NFT_ID',
      Ordersort: null,
      Extra: null,
    }),
  })
  const posts = await res.json()
  return {
    props: { posts },
  }
}
