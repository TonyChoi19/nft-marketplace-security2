import React from 'react'
import chart from '../assets/data/lineChart.JPG'
import Image from 'next/image'

const style = {
  wrapper: `w-full relative`,
  headingContainer: ` h-40`,
  heading: `py-10 text-center font-uber font-bold text-[#7A0BC0] text-[40px] `,
  chartContainer: `h-full`,
  chart: `text-center  pb-8`,
}

const LineChart = () => {
  return (
    <div className = {style.wrapper}>
      <div className={style.headingContainer}>
        <div className = {style.heading}>
          Grab your chances
        </div>
      </div>
      <div className={style.chartContainer}>
        <div className = {style.chart}>
          <Image src={chart} alt="" height={560} width={700}/>
        </div>
      </div>
    </div>
  )
}

export default LineChart