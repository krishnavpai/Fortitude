import React, { useState, useEffect } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faBell,
  faBars,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

const Blogs = () => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://newsapi.org/v2/everything?q=mental&pageSize=11&apiKey=a0d9afb11a8f49409fc89a49c121fcae'
      )
      .then((e) => {
        const data = e.data.articles || [];
        console.log(data);
        data = data.slice(0, 10);
        setblogs(data);
        console.log(blogs);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className={styles.blogs}>
      <div>
        <h1 className="pb-1">Blogs</h1>
        <hr />
      </div>
      <div className="flex flex-column h-48 gap-2 pt-2 pr-2 overflow-auto">
        {blogs.map((e) => (
          <div className="p-2 border-2 shadow shadow-sm rounded-lg align-items-center flex justify-content-between">
            {e.title}
            <a href={e.url} target="_blank" className="text-[#ff7a00]">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        ))}

        {/* {blogs.map((e) => {
          if (!e.urlToImage) return;
          return (
            <div className="flex flex-column gap-1 cols-span-1 shadow-md shadow-gray-300 rounded-b-lg h-96 overflow-hidden">
              <div className="h-1/3">
                <img
                  src={e.urlToImage}
                  alt=""
                  className="p-0 w-100 rounded-lg rounded-b-none h-full object-cover"
                />
              </div>
              <div className="p-2 h-2/3">
                <div className="font-bold pt-1 text-md">{e.title}</div>
                <div className="overflow-hidden pb-1 leading-5 text-sm">
                  {e.description}
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Blogs;
