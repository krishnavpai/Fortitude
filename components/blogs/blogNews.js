import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogNews() {
  const [blogNews, setBlogNews] = React.useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios(
        "https://newsapi.org/v2/everything?q=mental&pageSize=11&apiKey=96bc4c44252c41f0af28caa6b5269fc1"
      );

      const art = await response.data.articles;
      setBlogNews(art);
      // console.log(art);
    };
    fetchNews();
  }, []);
  return (
    <div className="bg-orange-100">
      <span className="text-4xl flex justify-center  pt-4 mb-4 text-gray-800">
        Latest News
      </span>
      <section className="text-gray-900 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {blogNews.map((blogNews) => (
              <div key= {blogNews.title} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-orange-400 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={blogNews.urlToImage}
                    alt="blog"
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-blue-900 mb-1">
                      {blogNews.author || "Source"}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {blogNews.title}
                    </h1>
                    <p className="leading-relaxed mb-3">
                      {blogNews.description.slice(0, 150)}...
                    </p>
                    <div className="flex items-center flex-wrap ">
                      <Link 
                        href={blogNews.url}
                        target="_blank"
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        <a target="_blank">

                        See More
                        </a>
                      </Link>
                      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        {blogNews.publishedAt.toString().slice(0, 10)}
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
