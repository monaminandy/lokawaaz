"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from '@civic/auth/react';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-9 py-10 ml-[-20] mr-20">
      {/* Left Section */}
      <div className="max-w-2xl text-left md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          Welcome to LokAwaaz 
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Verify your voter identity securely from anywhere. Aadhaar & Face ID powered.
        </p>
        <UserButton />
        <Link href="/signup">          
            <button  className=" lg:flex bg-primary hover:bg-gray-700  dark:bg-white rounded-full text-white mt-10 dark:text-black px-6 py-3">
              Proceed Further
            </button> 
        </Link>
        
      </div>

      {/* Right Section */}
      <div className=" hidden lg:flex md:mt-0">
        <Image src="/lok2.png" alt="Voting Image" width={400} height={400}/>
      </div>

      <div className=" lg:hidden flex justify-center md:mt-0">
        <Image src="/lok2.png" alt="Voting Image" width={400} height={400}/>
      </div>
    </div>
  );
};

export default Hero;
