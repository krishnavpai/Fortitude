import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import useScript from "react-script-hook";

import getUser from "../lib/getUser";
import { Button, Popover, Spinner } from "react-bootstrap";
import { deleteCookie } from "cookies-next";
import axios from "axios";
import NavbarCommon from "../components/global/navbar";
import Script from "next/script";

import HashLoader from "react-spinners/HashLoader";

export async function getServerSideProps({ req, res }) {
  const user = await getUser(req, res);
  if (user) {
    return {
      props: {
        user,
      },
    };
  }
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}

export default function Videos({ user }) {
 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 2000);
    }, []);
  

  return (
      <>
      <Script src="https://apps.elfsight.com/p/platform.js" defer />    
      <Head>
        <title>Fortitude Videos</title>
      </Head>
      <NavbarCommon current="vids" user={user} />

   
      {loading ? (
        <div className="flex justify-center items-center h-screen">
        <HashLoader
          color={"#ff7a00"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"

        />
        </div>
      ) : (
        <div className="flex pt-28 mx-10 overflow-hidden overflow-x-hidden">
          <div className="elfsight-app-362049ac-e8ea-416b-bc69-74c147e1a452">
          </div>
        </div>
      )}
    </>
  );
}
