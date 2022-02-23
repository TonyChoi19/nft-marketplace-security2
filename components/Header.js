import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { ConnectWallet } from '@3rdweb/react'

const style = {
  wrapper: `bg-[#00000] w-screen px-[1.2rem] py-[0.8rem] flex`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[1rem] text-black font-uber font-bold  text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[550px] items-center bg-[#363840] border-2 border-[#363840] rounded-[0.8rem] hover:bg-[#4c505c] hover:border-[#7A0BC0] `,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: `flex items-center justify-end`,
  headerItem: `text-white px-4 font-black text-l text-[#7A0BC0] cursor-pointer no-underline hover:underline hover:decoration-[#7A0BC0]`,
  headerIcon: `text-[#7A0BC0] text-l font-black px-4 cursor-pointer no-underline hover:underline`,
}

const Header = () => {
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={logo} height={55} width={55} />
          <div className={style.logoText}>NEXT-NFTs</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>
        <div className={style.headerItem}>Collections</div>
        <div className={style.headerItem}>Stats</div>
        <div className={style.headerItem}>Resources</div>
        <div className={style.headerItem}>Create</div>
        <div className={style.headerIcon}>
          {/* <MdOutlineAccountBalanceWallet /> */}
          <ConnectWallet />
        </div>
      </div>
    </div>
  )
}

export default Header
