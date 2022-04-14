export default function Blog(props) {
  const { posts } = props
  return (
    <div>
      <p>Current Sample:</p>
      <h1>Remove Last Inserted Data</h1>
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
Example for removing the last inserted data from DB with function.php by JQUERY AJAX
'Values', 'Columns' are useless in these cases, no need to set
This Example will execute the following SQL Statement:
    DELETE FROM marketplace Order by NFT_ID DESC limit 1
*/
export async function getStaticProps(context) {
  const res = await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Process: 'RemoveData',
      Table: 'TABLE_USER',
      Columns: null,
      Conditions: null,
      Values: null,
      Orderby: 'USER_ID',
      Ordersort: 'DESC',
      Extra: 'limit 1',
    }),
  })
  const posts = await res.json()
  return {
    props: { posts },
  }
}
