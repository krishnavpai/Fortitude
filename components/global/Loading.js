import React, { useState, useEffect } from 'react';
import loading from '../../assets/images/loading-1.svg';
import Image from 'next/image';
import styles from '../../styles/Navbar.module.scss';
import axios from 'axios';
const Loading = () => {
  const [quote, setquote] = useState({});
  useEffect(() => {
    let page = Math.floor(Math.random() * 3) + 1;
    axios
      .get(
        'https://api.quotable.io/random?maxLength=130&tags=life|happiness' +
          page
      )
      .then((e) => {
        console.log(e.data);
        const data = e.data;
        setquote(data);
      });
  }, []);
  return (
    <div className={styles.loadingScreen}>
      <div className="h-screen position-relative">
        <div className="position-absolute top-80 left-1/2 translate-middle w-auto">
          <Image
            src={loading}
            height={'400px'}
            className={'animate-[spin_10s_linear_infinite]'}
            width={'400px'}
          ></Image>
          <div className="text-center pt-4 w-72 m-auto text-lg">
            {quote.content}
          </div>
          <div className=" text-center pt-2 m-auto w-72 italic text-lg">
            - {quote.author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
