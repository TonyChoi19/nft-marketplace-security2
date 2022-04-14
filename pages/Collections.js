import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const style = {
  background: `bg-gradient-to-br from-[#42275a] to-[#734b6d] lg:min-h-screen`,
  infoContainer: `flex flex-col items-center justify-center lg:min-h-screen sm:min-h-screen`,
  pictureWrapper: `rounded-xl bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] p-2 hover:cursor-pointer`,
  clubPicture: `w-44 rounded-xl object-cover lg:h-86 lg:w-72`,
  clubTitle: `text-white text-4xl font-uber font-bold`,
  desciptionWrapper: `text-center p-8 space-y-3`,
  clubDesciption: `text-gray-300 text-lg`,
}

const Collections = () => {
  return (
    <>
      <Header />
      <div className={style.background}>
        <div className={style.infoContainer}>
          <Link href="../nftModules/DopeNFTClub">
            <div className={style.pictureWrapper}>
              <img
                className={style.clubPicture}
                src="https://lh3.googleusercontent.com/18cldSlheirQ9YT9_jjGm8Zm__SPXlrNQStKd7-lDQXUGNtXDwPk6gAh08OrGto8r-OFDe4gYkY9dmq7KnWNkh1s7HXMaM964cbR6A=w600"
                alt=""
              />
            </div>
          </Link>
          <div className={style.desciptionWrapper}>
            <h1 className={style.clubTitle}>Dope NFT Club</h1>
            <h2 className={style.clubDesciption}>
              Dope NFT Club launched as a fixed set of 10 items in mid-2017 and
              became one of the inspirations for the ERC-721 standard.
            </h2>
            <h2 className={style.clubDesciption}>
              They have been featured in places like The New York Times,
              Christie’s of London, Art|Basel Miami, and The PBS NewsHour.
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Collections
