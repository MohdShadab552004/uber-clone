import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GoDotFill } from "react-icons/go";
import { BiCheckboxSquare, BiCloudLightRain } from "react-icons/bi";
import { FaLocationArrow } from "react-icons/fa";
import Navbar from '../component/Navbar';


const RideHomePage = () => {

    return (
        <>
            <Navbar />
            <main className='max-w-[1280px] min-h-[calc(100vh_-_64px)] mx-auto px-[10px] flex justify-between py-20 max-[950px]:flex-col'>
                <section className='w-[45%] '>
                    <h2 className='text-[52px] font-bold leading-[64px]'>Go anywhere with Uber</h2>
                    <form className='relative pr-50 flex flex-col gap-5'>
                        <span className='absolute top-[30px] left-[16.5px] w-[1.5px] h-[45px] bg-[#000000]'></span>
                        <div className='w-full bg-[#F3F3F3] p-2.5 rounded-lg flex items-center gap-2'>
                            <GoDotFill />
                            <input type='text' placeholder='Pickup location' className='flex-1 focus:border-none focus:outline-none' />
                            <FaLocationArrow />
                        </div>
                        <div className='w-full bg-[#F3F3F3] p-2.5 rounded-lg flex items-center gap-2'>
                            <BiCheckboxSquare />
                            <input type='text' placeholder='Dropoff location' className='flex-1 focus:border-none focus:outline-none' />
                        </div>
                        <div className='w-full flex items-center gap-2'>
                            <button className='w-[128px] h-[50px] bg-[#000000] text-[#FFFFFF] flex justify-center items-center rounded-lg hover:bg-[#000000cb] transition-color duration-200 ease-in-out'>See prices</button>
                            <p>Log in to see your recent activity</p>
                        </div>
                    </form>
                </section>
                <section className='w-1/2 h-[380px] rounded-2xl overflow-hidden'>
                    <img src='/images/homePage.png' alt='home image' className='w-full h-full object-fit' />
                </section>
            </main>
        </>
    )
}

export default RideHomePage