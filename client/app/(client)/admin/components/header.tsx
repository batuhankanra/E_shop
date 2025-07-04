"use client"

import { FaUser } from "react-icons/fa";


const Header = () => {


  return (
    <header className="w-full bg-third shadow-md  p-2 fixed top-0 left-0 z-2 flex items-center justify-end">
        <div className='flex items-center gap-x-1  md:gap-x-5'>
            <span>
                <input type="text" placeholder="Ara!" className="md:p-1 p-1 w-40 md:w-full  m-1 outline-none text-lg border   rounded-md border-secondary focus:border-primary" />
               
            </span>
            <button className=" cursor-pointer flex items-center border hover:border-primary border-secondary p-1 rounded-md">
                <FaUser/>
                User
            </button>
        </div>
        
        
       

    </header>
  );
};

export default Header
