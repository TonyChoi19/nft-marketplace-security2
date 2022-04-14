let g_setData, g_setIsLoading
let g_setNFTdata

const validate = async (NFTID_ToFind, USERID_ToFind) => {
  const errors = {}
  var NFTobj, USERobj, USERobj2

  // Fetch nft
  async function fetch1() {
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'GetData',
        Table: 'TABLE_MARKET',
        Columns: null,
        Conditions: 'NFT_ID = ?',
        Values: NFTID_ToFind,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => (NFTobj = data))
      // .then(() => console.log('NFT to buy:'))
      // .then(() => console.log(NFTobj))
  }

  // Fetch user
  async function fetch2() {
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'GetData',
        Table: 'TABLE_USER',
        Columns: null,
        Conditions: 'USER_ID = ?',
        Values: USERID_ToFind,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => (USERobj = data))
      // .then(() => console.log('Buyer:'))
      // .then(() => console.log(USERobj))
  }

  if (!NFTID_ToFind) {
    errors.errorMsg = 'NFT ID is required'
  }
  if (!USERID_ToFind) {
    errors.errorMsg = 'USER ID is required'
  }

  await fetch1()
  await fetch2()

  if (!('Results' in NFTobj)) {
    errors.errorMsg = 'NFT required does not exist'
  } else {
    //console.log(NFTobj['Results'][0]['Owner'])
    //console.log(USERID_ToFind)
    if (NFTobj['Results'][0]['Owner'] != USERID_ToFind) {
      errors.errorMsg = 'You do not own this NFT!'
    } else if (!('Results' in USERobj)) {
      errors.errorMsg = 'User does not exist'
    } else {
      //console.log(typeof(NFTobj['Results'][0]['Price']))
      //console.log(typeof(USERobj['Results'][0]['Balance']))
      if (NFTobj['Results'][0]['OnSale'] == 1) {
        errors.errorMsg = 'This NFT already OnSale'
      } else {
        errors.OnSale = 1
      }
    }
  }
  return errors
}

async function Listfunction(nftid_tolist, owner, new_price) {
  // Remove special characters
  nftid_tolist = nftid_tolist.replace(/[/|&;$%@"<>()+,]/g, '')
  owner = owner.replace(/[/|&;$%@"<>()+,]/g, '')
  new_price = new_price.replace(/[/|&;$%@"<>()+,]/g, '')
  //e.preventDefault()
  // Check if buy is valid
  const errors = await validate(
    nftid_tolist,
    owner
    //e.target.nftid_tolist.value,
    //e.target.owner.value
  )

  // console.log('Validation completed. (fetch1 and fetch2)')

  // Update marketplace table
  if (errors.OnSale == 1) {
    console.log('You will list this NFT')
    const value = errors.OnSale + ',' + new_price + ',' + nftid_tolist
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'UpdateData',
        Table: 'TABLE_MARKET',
        Columns: 'OnSale, Price',
        Conditions: 'NFT_ID = ?',
        Values: value,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    }).then((response) => response.json())
    var res = { status: 'Success' }
    return res
  } else {
    // console.log(errors)
    var res = { status: 'Failed', errorMsg: errors.errorMsg }
    return res
  }
}

module.exports = { Listfunction }
