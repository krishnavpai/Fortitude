import { Swiper, SwiperSlide } from "swiper/react"
import React, { useRef, useState } from "react";
import Link from "next/link"
import Image from "next/image"
import PostImg from "../../assets/images/post.jpg"

import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Navigation } from "swiper";

// import Author from "./_child/author"

export default function section3() {
  return (
    <section className="container mx-auto md:px-20 py-16">
        <h1 className="font-bold text-4xl py-12 text-center">Popular</h1>

        {/* swiper */}
        <Swiper
        navigation={true}
        modules = { [Navigation] }
        className="mySwiper"
            slidesPerView={1}
        >
            <SwiperSlide>{  Post() }</SwiperSlide>
            <SwiperSlide>{  Post() }</SwiperSlide>
            <SwiperSlide>{  Post() }</SwiperSlide>
            <SwiperSlide>{  Post() }</SwiperSlide>
            <SwiperSlide>{  Post() }</SwiperSlide>
        </Swiper>

    </section>
  )
}


function Post(){
    return (
        <div className="grid">
            <div className="images flex justify-center    ">
                <Link href={"/"}><a><Image src={PostImg} width={600} height={400} /></a></Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link href={"/"}><a className="text-orange-600 hover:text-orange-800">Tips, Self Help</a></Link>
                    <Link href={"/"}><a className="text-gray-800 hover:text-gray-600">- July 3, 2022</a></Link>
                </div>
                <div className="title">
                    <Link href={"/"}><a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600 no-underline">Content That Makes You Think</a></Link>
                </div>
                <p className="text-gray-500 py-3">
                    Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind 
                    text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
                </p>
            
            
                {/* <Author></Author> */}
            </div>
        </div>
    )
}