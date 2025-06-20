"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image  from "next/image"

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center ">
      <Navbar className="top-5" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <div
        className={cn("hidden lg:flex relative top-20 inset-x-0 max-w-3xl mx-auto z-50", className)}
      >
        <Menu setActive={setActive}>
          <Link href="#aboutus">
              <MenuItem setActive={setActive} active={null} item="About Us"></MenuItem>
          </Link>
          
          <Link href="#kyr">
              <MenuItem setActive={setActive} active={null} item="Know Your Rights"></MenuItem>
          </Link>
          <Link href="#hitws">
          <MenuItem setActive={setActive} active={null} item="How It Works?"></MenuItem>
          </Link>
          

          <Link href="#faqs">
              <MenuItem setActive={setActive} active={null} item="FAQS"></MenuItem>
          </Link>
          <Link href="#foot">
          <MenuItem setActive={setActive} active={null} item="Contact Us"></MenuItem>
          </Link>
        </Menu>
        
      </div>
      <div className="flex justify-end">
        <Link href="/shortmenu">
          <Image
          src="/ham.svg"
          alt="menu"
          width={40}
          height={40}
          className="lg:hidden inline-block cursor-pointer ml-[400px]" />
        </Link>
        
      </div>
      
    </div>

  );
}