"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="foot" className=" text-primary md:px-20">
    <div className="text-center mt-10 text-sm  border-t border-gray-700 pt-6">
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">LokAwaaz</h2>
          <p className="text-sm">
            Empowering secure and accessible digital voting across India through Aadhaar and Face ID verification.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="#aboutus" className="hover:underline">About</Link></li>
            <li><Link href="/signup" className="hover:underline">Sign Up</Link></li>
            <li><Link href="#faqs" className="hover:underline">FAQs</Link></li>
            <li><Link href="#foot" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Voting Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Voter Info</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#kyr" className="hover:underline">Voting Rights</Link></li>
            <li><Link href="#hitws" className="hover:underline">Face Verification</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="hidden lg:flex ml-[95px] space-x-4">
            <Link href="#"><FaFacebookF className="hover:text-gray-200" /></Link>
            <Link href="#"><FaTwitter className="hover:text-gray-200" /></Link>
            <Link href="#"><FaInstagram className="hover:text-gray-200" /></Link>
            <Link href="#"><FaLinkedinIn className="hover:text-gray-200" /></Link>
          </div>

          <div className="lg:hidden flex ml-[155px] space-x-4">
            <Link href="#"><FaFacebookF className="hover:text-gray-200" /></Link>
            <Link href="#"><FaTwitter className="hover:text-gray-200" /></Link>
            <Link href="#"><FaInstagram className="hover:text-gray-200" /></Link>
            <Link href="#"><FaLinkedinIn className="hover:text-gray-200" /></Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-600 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()}LokAwaaz. All rights reserved.
        <p className="mt-4 text-sm text-gray-600">Powered by Civic Auth</p>
      </div>
    </footer>
  );
};

export default Footer;
