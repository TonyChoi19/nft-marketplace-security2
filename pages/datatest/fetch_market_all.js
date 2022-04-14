export default function Blog(props) {
  const { posts } = props
  return (
    <div>
      <p>Status: {posts.Status}</p>
      <p>Message: {posts.Message}</p>
      <p>SQL Statement: {posts.SQL}</p>
      <br></br>
      <p>Current Sample:</p>
      <h1>All Data in MarketPlace with ASC Ordering</h1>
      <br></br>
      <p>
        Results: <br></br>
      </p>
      {posts.Results.map((item) => (
        <>
          <p>USER_ID: {item.USER_ID}</p>
          <p>Username: {item.username}</p>
          <p>email: {item.email}</p>
          <p>HMAC: {item.HMAC}</p>
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
    SELECT * FROM marketplace
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
      Table: 'TABLE_USER',
      Columns: null,
      Conditions: null,
      Values: null,
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
