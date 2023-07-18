import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Dashboard.module.scss';
const Experts = () => {
  const [experts, setexperts] = useState([]);
  useEffect(() => {
    axios.get('/api/scraper/info').then((e) => {
      console.log(e);
      setexperts(e.data);
    });
  }, []);
  return (
    <div className={styles.experts}>
      <div>
        <h1 className="">Experts</h1>
      </div>
      <div className="p-2 grid grid-cols-2 gap-2 ">
        {experts.map((e, i) => (
          <Link key={i} href={`/experts/${e.slug}`}>
            <div className="p-2 flex justify-content-between cursor-pointer align-items-center border-2 rounded-lg">
              <img
                src={e.image}
                width="45px"
                height="45px"
                className="rounded-full -bold border-2"
              ></img>
              <div>{e.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Experts;
