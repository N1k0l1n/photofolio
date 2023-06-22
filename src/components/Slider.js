import { SliderData } from "@/data/SliderData";
import React from "react";
import Image from "next/image";

const Slider = ({ slides }) => {
  return (
    <div id="gallery">
      <h1>Gallery</h1>
      <div>
        {SliderData.map((slide, index) => {
          return (
            <Image
              key={index}
              src={slide.image}
              alt="/"
              width="4221"
              height="1080"
              style={{ objectFit: "cover" }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
