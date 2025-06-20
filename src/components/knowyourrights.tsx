"use client";

import Carousel from "@/components/ui/carousel";
export default function CarouselDemo() {
  const slideData = [
    {
      title: "Universal Adult Franchise (General Voting Rights)",
      button: "Learn More",
      src: "/vote4.png",
    },
    {
      title: " Electoral College Voting (Indirect Voting Rights)",
      button: "Learn More",
      src: "/vote3.png",
    },
    {
      title: "Graduates' Constituency Voting",
      button: "Learn More",
      src: "/vote2.png",
    },
    {
      title: " Local Body Elections Voting",
      button: "Learn More",
      src: "/vote3.png",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
