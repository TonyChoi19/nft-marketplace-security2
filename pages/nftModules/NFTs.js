import React, { useMemo, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Buyfunction } from './Buy'
import { Listfunction } from './List'

const style = {
  purpleWrapper: `bg-[#543561] flex-auto w-[15rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden`,
  imageContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  image: `w-full object-cover`,
  infoContainer: `p-3`,
  info: `flex justify-between text-white`,
  infoLeft: `flex-0.6`,
  assetName: `font-bold text-xl`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-white`,
  priceValue: `flex items-center text-lg text-right font-bold`,
  logo: `h-6 m-2`,
  buyButton: `font-lg mt-1 rounded-full bg-blue-500 py-1 px-4 text-white hover:bg-blue-700`,
  listButton: `font-lg mt-1 rounded-full bg-red-500 py-1 px-4 text-white hover:bg-red-700`,
}

const inputPrompt = (nftId, userID) => {
  const price = parseFloat(prompt('Please set the price'), '0')
  if (!isNaN(price) && price > 0) {
    list(nftId, userID, String(price))
  } else {
    toast.error('Invalid number!')
  }
  ;<Toaster />
}

const NFTs = ({ id, owner, onSale, price, collectionID, image }) => {
  const [isListed, setIsListed] = useState(false)
  useEffect(() => {
    if (onSale == 1) {
      setIsListed(true)
    }
  })

  const [user, setUser] = React.useState({})

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('g_userData')))
  }, [])

  if (!user){
    return(
      <div className={style.purpleWrapper}>
        <Toaster />
        {/* NFT image */}
        <div className={style.imageContainer}>
          <img src={image} className={style.image} />
        </div>
  
        {/* NFT description */}
        <div className={style.infoContainer}>
          <div className={style.info}>
            <div className={style.infoLeft}>
              <div className={style.assetName}>#{id}</div>
              <div className="text-blue-400">Owner@{owner}</div>
            </div>
  
            {/* Show the price details */}
            {isListed && (
              <div className={style.infoRight}>
                <div className={style.priceTag}>Price</div>
                <div className={style.priceValue}>
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    className={style.logo}
                  />
                  {price}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={style.purpleWrapper}>
      <Toaster />
      {/* NFT image */}
      <div className={style.imageContainer}>
        <img src={image} className={style.image} />
      </div>

      {/* NFT description */}
      <div className={style.infoContainer}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.assetName}>#{id}</div>
            <div className="text-blue-400">Owner@{owner}</div>
          </div>

          {/* Show the price details */}
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  className={style.logo}
                />
                {price}
              </div>

              {/* Show buy button */}
              <>
                {user.ID !== owner ? (
                  <button
                    className={style.buyButton}
                    onClick={() => {
                      buy(id, user.ID)
                    }}
                  >
                    Buy
                  </button>
                ) : null}
              </>
            </div>
          )}

          {/* Show list button */}
          {user.ID == owner && !isListed && (
            <div className="flex-0.4 relative bottom-0 text-right">
              <button
                className={style.listButton}
                onClick={() => {
                  inputPrompt(id, user.ID)
                }}
              >
                List
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const buy = async (id, userID) => {
  if (confirm('Please click confirm to buy') == true) {
    const errors = await Buyfunction(id, userID)
    if (errors.userid) toast.error(errors.userid)
    if (errors.nftid) toast.error(errors.nftid)
    if (errors.balance) toast.error(errors.balance)
    if (errors.T_Price)
      toast.success(
        'Purchased Successfully!\nYour balance: ' +
          errors.newBalance +
          '\nPlease refresh your page'
      )
  } else {
    toast.error('You canceled the purchase')
  }
}

const list = async (id, userID, price) => {
  const res = await Listfunction(id, userID, price)
  if (res && res.status == 'Success')
    toast.success('Listed Successfully!\nPlease refresh your page')
  if (res && res.status == 'Failed') toast.error(res.errorMsg)
}

export default NFTs
