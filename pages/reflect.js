import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import getUser from "../lib/getUser";
import { deleteCookie } from "cookies-next";
import {
  Feeling,
  Wrapper,
  NavbarCommon,
  Journal,
  Container,
} from "../components";
export const ReflectContext = React.createContext();

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

export default function Reflect({ user }) {
  const router = useRouter();
  const [count, setcount] = useState(0);
  const triggerCount = () => {
    setcount((e) => e + 1);
  };

  return (
    <>
      <Head>
        <title>Fortitude Reflect</title>
      </Head>
      <NavbarCommon current="reflect" user={user} />
      <Wrapper>
        <ReflectContext.Provider value={(count, triggerCount, user)}>
          <div className="p-3 px-5">
            <div className="flex justify-content-between gap-5 sm:flex-wrap-reverse md:flex-nowrap">
              <Container styles={" basis-full md:basis-2/5 align-self-start "}>
                <Feeling
                  user={user}
                  trigger={count}
                  triggerCount={triggerCount}
                />
              </Container>
              <Container styles={"basis-full md:basis-3/5"}>
                <Journal
                  user={user}
                  trigger={count}
                  triggerCount={triggerCount}
                />
              </Container>
            </div>
          </div>
        </ReflectContext.Provider>
      </Wrapper>
    </>
  );
}
