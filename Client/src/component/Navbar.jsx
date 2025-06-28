import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const navList = ["Ride", "Drive", "Business", "About"]


const Navbar = () => {
    const { isLogin } = useContext(UserContext);

    console.log(isLogin)
    return (
        <header className={`w-full h-[64px] ${(isLogin) ? 'bg-[#FFFFFF]' : 'bg-[#000000]'} `}>
            <nav className={`max-w-[1280px] h-full mx-auto flex justify-between items-center ${(isLogin) ? 'text-[#000000]' : 'text-[#FFFFFF]'} px-[10px]`}>
                <div className='flex items-center gap-10 '>
                    <h1 className='text-2xl'>Uber</h1>
                    <ul className='flex gap-5'>
                        {
                            navList.map((item, index) => {
                                return <li key={index}><Link to="#">{item}</Link></li>
                            })
                        }
                    </ul>
                </div>

                <section className='h-full flex items-center gap-5 text-[16px]'>
                    {
                        (isLogin) ?
                            <p>Hello! User</p> :
                            <>
                                <Link to="#">Log in</Link>
                                <Link to="#" className='flex justify-center items-center px-2 py-1 bg-[#FFFFFF] rounded-full text-[#000000]'>Sign up</Link>
                            </>
                    }
                </section>
            </nav>
        </header>
    )
}

export default Navbar