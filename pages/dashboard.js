import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import getUser from '../lib/getUser';
import { Button, Popover, Spinner } from 'react-bootstrap';
import { deleteCookie } from 'cookies-next';
import axios from 'axios';
import {
  Communities,
  NavbarCommon,
  Experts,
  Container,
  Wrapper,
  Events,
  Blogs,
  MoodGraph,
} from '../components';
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
        destination: '/login',
      },
      props: {},
    };
  }
}

export default function Dashboard({ user }) {
  return (
    <>
      <Head>
        <title>Fortitude Dashboard</title>
      </Head>
      <NavbarCommon current="dash" user={user} />
      <Wrapper>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mb-4">
          <Container
            styles={'hidden sm:hidden md:block sm:col-span-1 md:col-span-1'}
          >
            <Communities />
          </Container>
          <div className="sm:col-span-2 md:col-span-2">
            <Container styles={'h-100'}>
              <Blogs />
            </Container>
          </div>
          <div className="row-span-1 h-100 sm:col-span-2 md:col-span-1">
            <Container styles={'h-100'}>
              <Events />
            </Container>
          </div>
          <Container styles={'col-span-2'}>
            <MoodGraph />
          </Container>
          <Container styles={'col-span-2'}>
            <Experts />
          </Container>
          {/* <Container styles={"sm:col-span-2 lg:col-span-1"} /> */}
        </div>
        <div className=""></div>
      </Wrapper>
    </>
  );
}
