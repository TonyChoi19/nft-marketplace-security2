import React from 'react'
import Image from 'next/image'
import creatorAvatar from '../assets/creatorAvatar.png'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'

const style = {
  wrapper: `relative`,
  container: `bg-cover before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/DrCbMMM6J6KohH4c4YfCDcdzCWGaL-MrrhyiiBLpNtqR9wykTU9PRgRYeZL0ZuRaPhi0i__fQTQ3EBHt3Fc7zpSGla5USiu6urmR3UQ=w600')] before:bg-cover before:bg-center before:opacity-60 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  splitter: `w-1/2`,
  title: `relative text-white text-[46px] font-semibold`,
  description: `text-xl mt-4 mb-5`,
  buttonContainer: `flex`,
  blueButton: `bg-blue-500 hover:bg-blue-700 text-lg font-semibold px-12 py-4 rounded-lg mr-5 text-white`,
  greyButton: `bg-gray-500 hover:bg-gray-700 text-lg font-semibold px-12 py-4 rounded-lg text-white `,
  infoContainer: `bg-[#202020] p-4 rounded-b-lg flex items-center text-white shadow-2xl`,
  minter: `flex flex-col justify-center ml-4`,
}

const Hero = () => {
  return (
    // Hero Page
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.splitter}>
            {/* Styled Title */}
            <div className={style.title}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Discover Your Next World Here!')
                    .pauseFor(2500)
                    .deleteChars(1)
                    .typeString('!!!!')
                    .pauseFor(2500)
                    .start()
                }}
              />
            </div>

            {/* Website Desciption */}
            <div className={style.description}>
              Next-NFTs is one of the most popular NFT marketplace in the world.
              <br></br>
              Go start exploring!
            </div>

            {/* Button */}
            <div className={style.buttonContainer}>
              {/* Button to Collections */}
              <Link href="/Collections">
                <button className={style.blueButton}>Explore</button>
              </Link>
              {/* Button to Owned NFTs */}
              <Link href="/OwnedNFT">
                <button className={style.greyButton}>Your NFTs</button>
              </Link>
            </div>
          </div>

          {/* NFT showcase */}
          <div className="shadow-2xl">
            <img
              className="rounded-t-lg"
              src="https://lh3.googleusercontent.com/DrCbMMM6J6KohH4c4YfCDcdzCWGaL-MrrhyiiBLpNtqR9wykTU9PRgRYeZL0ZuRaPhi0i__fQTQ3EBHt3Fc7zpSGla5USiu6urmR3UQ=w600"
            ></img>
            <div className={style.infoContainer}>
              <Image src={creatorAvatar} height={45} width={45} alt="" />
              <div className={style.minter}>
                <div className={style.name}>Dope Ape</div>
                <Link href="/Collections">
                  <a className="text-[#1868b7]">Dope NFT Club</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
