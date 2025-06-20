"use client";
import Aboutus from '@/components/aboutus';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Hero from '@/components/hero';
import Hitws from '@/components/hiws';
import CarouselDemo from '@/components/knowyourrights';
import NavbarDemo from '@/components/navbar';


export default function Home() {
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 to-red-100 text-center p-8">
      
      <NavbarDemo />
      <Hero />
      <h1 id="aboutus" className="text-4xl  p-5 font-bold text-center mt-[80px] text-primary ">
             ABOUT US
      </h1>
      <Aboutus />
      <h1 id='kyr' className="text-4xl  p-5  font-bold text-center mt-[80px] text-primary ">
             KNOW YOUR RIGHTS
      </h1>
      <CarouselDemo />
      <h1 id="hitws" className="text-4xl font-bold text-center mt-[80px] text-primary ">
             HOW IT WORKS
      </h1>
      <Hitws />
      <h1 id='faqs' className="text-4xl  p-5  font-bold text-center mt-[80px] text-primary ">
             FREQUENTLY ASKED QUESTIONS
      </h1>
      <FAQ />
      <Footer />
    </main>
  );
}
