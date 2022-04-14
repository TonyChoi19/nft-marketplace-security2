import React from 'react'
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

  // Fetch buyer
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
    errors.nftid = 'NFT ID is required'
  }
  if (!USERID_ToFind) {
    errors.userid = 'USER ID is required'
  }

  await fetch1()
  await fetch2()

  // Fetch seller
  async function fetch3() {
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
        Values: NFTobj['Results'][0]['Owner'],
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => (USERobj2 = data))
      // .then(() => console.log('Seller:'))
      // .then(() => console.log(USERobj2))
  }

  await fetch3()

  if (!('Results' in NFTobj)) {
    errors.nftid = 'NFT required does not exist'
  } else {
    //console.log(NFTobj['Results'][0]['Owner'])
    //console.log(USERID_ToFind)
    if (NFTobj['Results'][0]['Owner'] == USERID_ToFind) {
      errors.userid = 'You already own this NFT'
    } else if (NFTobj['Results'][0]['OnSale'] == 0) {
      errors.nftid = 'NFT required not for Sale'
    } else if (!('Results' in USERobj)) {
      errors.userid = 'Buyer does not exist'
    } else if (!('Results' in USERobj2)) {
      errors.userid = 'Seller does not exist'
    } else {
      //console.log(typeof(NFTobj['Results'][0]['Price']))
      //console.log(typeof(USERobj['Results'][0]['Balance']))
      if (
        parseFloat(NFTobj['Results'][0]['Price']) >
        parseFloat(USERobj['Results'][0]['Balance'])
      ) {
        errors.balance =
          'You do not have enough balance\nYour balance: Eth ' +
          parseFloat(USERobj['Results'][0]['Balance'])
      } else {
        errors.newBalance =
          parseFloat(USERobj['Results'][0]['Balance']) -
          parseFloat(NFTobj['Results'][0]['Price'])
        errors.newBalance2 =
          parseFloat(USERobj2['Results'][0]['Balance']) +
          parseFloat(NFTobj['Results'][0]['Price'])

        errors.oldOwner = NFTobj['Results'][0]['Owner']
        errors.newOwner = USERID_ToFind
        errors.T_Date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        errors.T_Price = NFTobj['Results'][0]['Price']
      }
    }
  }

  return errors
}

async function Buyfunction(nftId, userId) {
  // Check if buy is valid
  const errors = await validate(
    nftId,
    userId
    //user.USERID
  )
  // Update transaction, user, nft table
  if ('newBalance' in errors) {
    // console.log('You will be the new owner')
    const value =
      nftId +
      ',' +
      errors.oldOwner +
      ',' +
      errors.newOwner +
      ',' +
      errors.T_Price +
      ',' +
      errors.T_Date
    // console.log(value)

    // Update transaction table
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'InsertData',
        Table: 'TABLE_TRANSACTION',
        Columns: 'NFT_ID, FromUser, ToUser, Price, TransactionDatetime',
        Conditions: null,
        Values: value,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    }).then((response) => response.json())

    const value1 = errors.newBalance + ',' + errors.newOwner
    // Update user table
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'UpdateData',
        Table: 'TABLE_USER',
        Columns: 'Balance',
        Conditions: 'USER_ID = ?',
        Values: value1,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    }).then((response) => response.json())

    const value3 = errors.newBalance2 + ',' + errors.oldOwner
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'UpdateData',
        Table: 'TABLE_USER',
        Columns: 'Balance',
        Conditions: 'USER_ID = ?',
        Values: value3,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    }).then((response) => response.json())

    // Update marketplace table
    const value2 = userId + ',0,' + nftId
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'UpdateData',
        Table: 'TABLE_MARKET',
        Columns: 'Owner, OnSale',
        Conditions: 'NFT_ID = ?',
        Values: value2,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    }).then((response) => response.json())
  }
  return errors
}

module.exports = { Buyfunction }
