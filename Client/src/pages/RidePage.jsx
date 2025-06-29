import React,{useState,useContext, useEffect} from 'react'
import Navbar from '../component/Navbar'
import { BiCheckboxSquare } from 'react-icons/bi'
import { GoDotFill } from 'react-icons/go'
import Map from '../component/Map'
import { UserContext } from '../context/UserContext'


const vehicleOptions = [
    { id: 1, type: "Bike", icon: "/images/bike.png", fare: 45, eta: "2 min" },
    { id: 2, type: "Mini", icon: "/images/car.png", fare: 100, eta: "4 min" },
    { id: 3, type: "Sedan", icon: "/images/rikhsha.png", fare: 140, eta: "5 min" },
];


const RidePage = () => {
    const [selected,setSelected] = useState();

    const {pickUpLocation, dropLocation, setPickUpLocation, setDropLocation} = useContext(UserContext);

    useEffect(() => {
        if(pickUpLocation && dropLocation){
            console.log("hitting api");
        }
    },[])
    
    return (
        <>
            <Navbar />
            <main className='max-w-[1280px] mx-auto py-10 flex gap-5'>
                <section className='w-[346px] p-4 shadow rounded-lg'>
                    <h2 className='text-[20px] font-bold mb-2'>Get a ride</h2>
                    <form className='flex flex-col gap-5 '>
                        <div className='w-full bg-[#F3F3F3] p-2.5 rounded-lg flex items-center gap-2'>
                            <GoDotFill />
                            <input 
                                type='text' 
                                placeholder='Pickup location' 
                                className='flex-1 focus:border-none focus:outline-none' 
                                value={pickUpLocation}
                                onChange={(e) => {
                                    setPickUpLocation(e.target.value)
                                }}
                            />
                        </div>
                        <div className='w-full bg-[#F3F3F3] p-2.5 rounded-lg flex items-center gap-2'>
                            <BiCheckboxSquare />
                            <input 
                                type='text' 
                                placeholder='Dropoff location' 
                                value={dropLocation}
                                onChange={(e) => {
                                    setDropLocation(e.target.value)
                                }}
                                className='flex-1 focus:border-none focus:outline-none' />
                        </div>
                        <button className='w-full bg-[#F3F3F3] text-[#A6A6A6] p-2.5 rounded-lg hover:bg-[#f3f3f39c] transition-colors duration-200 ease-in-out'>Search</button>
                    </form>
                </section>

                {/* price section */}

                <section className='w-[40%] flex flex-col gap-5'>
                    <h2 className='text-4xl'>Choose a ride</h2>
                    <h4 className='text-2xl'>Rides we think you'll like</h4>
                    {vehicleOptions.map((v,index) => (
                        <div key={index} className={`w-full flex gap-3 ${selected === v.id ? "border" : ""}`} onClick={() => setSelected(v.id)}>
                            <img src={v.icon} alt={v.type} className='w-[124px] h-[124px]'/>
                            <div>{v.type}</div>
                            <div>₹{v.fare} • {v.eta}</div>
                        </div>
                    ))}

                </section>

                {/* map section */}
                <section className='flex-1'>
                    <Map />
                </section>
            </main>
        </>

    )
}

export default RidePage