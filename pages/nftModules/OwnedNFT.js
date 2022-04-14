import React, { useMemo, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NFTs from './NFTs'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  splitter: `flex h-screen flex-col lg:grid lg:grid-cols-10`,
  background: `bg-gradient-to-br from-[#42275a] to-[#734b6d] lg:col-span-2`,
  infoContainer: `flex flex-col items-center justify-center lg:min-h-screen`,
  pictureWrapper: `rounded-xl bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] p-2 my-5`,
  clubPicture: `w-44 rounded-xl object-cover lg:h-46 lg:w-46`,
  clubTitle: `text-white text-3xl font-uber font-bold`,
  desciptionWrapper: `text-center p-8 space-y-3`,
  clubDesciption: `text-gray-300 text-md`,
  rightSideWrapper: `lg:col-span-8 `,
}

const OwnedNFT = (props) => {
  const { posts } = props
  const router = useRouter()

  const [user, setUser] = React.useState({})

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('g_userData')))
    if (!user) {
      router.push('/')
    }
  }, [])

  if (!user) {
    return (
      <>
        <Toaster />
        <div className={style.splitter}>
          {/* left side */}
          <div className={style.background}>
            <div className={style.infoContainer}>
              <div className={style.pictureWrapper}>
                <img
                  className={style.clubPicture}
                  src="https://lh3.googleusercontent.com/5LSMQsfk2kgkbTT0ih8TMrhoXDETO3inMahYX6-l-vMRkn-JNxOTubZQFPyDLt0JS5sNIFAQx7jgVLF56nO7OmHh0n7eD3mvCXDEvgE=s130"
                  alt=""
                />
              </div>
              <div className={style.desciptionWrapper}>
                <h1 className={style.clubTitle}>My NFTs</h1>
              </div>
            </div>
          </div>

          {/* right side */}

          <div className={style.rightSideWrapper}>
            <Header />
            <div className="grid gap-2 md:grid-cols-2 lg:min-h-screen lg:grid-cols-5"></div>
            <Footer />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <div className={style.splitter}>
        {/* left side */}
        <div className={style.background}>
          <div className={style.infoContainer}>
            <div className={style.pictureWrapper}>
              <img
                className={style.clubPicture}
                src="https://lh3.googleusercontent.com/5LSMQsfk2kgkbTT0ih8TMrhoXDETO3inMahYX6-l-vMRkn-JNxOTubZQFPyDLt0JS5sNIFAQx7jgVLF56nO7OmHh0n7eD3mvCXDEvgE=s130"
                alt=""
              />
            </div>
            <div className={style.desciptionWrapper}>
              <h1 className={style.clubTitle}>My NFTs</h1>
            </div>
          </div>
        </div>

        {/* right side */}

        <div className={style.rightSideWrapper}>
          <Header />

          <div className="grid gap-2 md:grid-cols-2 lg:min-h-screen lg:grid-cols-5">
            {/* Map through all nfts */}
            {posts.Results.map(
              (nft) =>
                nft.Owner == user.ID && (
                  <NFTs
                    id={nft.NFT_ID}
                    owner={nft.Owner}
                    onSale={nft.OnSale}
                    price={nft.Price}
                    collectionID={nft.Collection_ID}
                    image={nft.image}
                  />
                )
            )}
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
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

export default OwnedNFT
