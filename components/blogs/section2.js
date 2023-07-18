import Link from "next/link";
import Image from "next/image";
// import Author from "./_child/author"
import Img from "../../assets/images/calm.jpg";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

export default function section2() {
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
       
          `https://api.unsplash.com/search/photos?page=1&query=mind&client_id=hZPv6cZAkLGWwZ6iJdtwQn9yZ3OazlAFfOzUFXhm9Oo`
        
      );
      

      const data = await response.json();
      setImages(data.results);
      // console.log(data.results);
    };
    fetchPhotos();
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Mindful Posts</h1>
      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">

        {images.map((image) => (
            <div key ={image.id} className="item">
            <div className="images">
              
                  <img src={image.urls.thumb} className="lg:h-48 md:h-36 w-full object-cover object-center rounded-xl" width={350} />
              
            </div>
            <div className="info flex justify-center flex-col py-4">
              <div className="cat">
                <Link href={"/"}>
                  <a className="text-orange-600 hover:text-orange-800">
                    Mind, Meditation
                  </a>
                </Link>
                <Link href={"/"}>
                  <a className="text-gray-800 hover:text-gray-600">- Oct 3, 2022</a>
                </Link>
              </div>
              <div className="title">
                <Link href={"/"}>
                  <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
                    Set peace of mind as your Highest goal, and organise you life
                    around it
                  </a>
                </Link>
              </div>
              <p className="text-gray-500 py-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempora
                nihil quibusdam, porro voluptates ipsa amet officia debitis fugiat
                qui?
              </p>
              {/* <Author></Author> */}
            </div>
          </div>
        ))}
            
        
      </div>
    </section>
  );
}



