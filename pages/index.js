import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Hero from '../components/Landing/hero';
import LNav from '../components/Landing/landingNav';
import { NavbarCommon } from '../components';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fortitude</title>
        <meta
          name="description"
          content="A blog website for your mental health"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <LNav current="" /> */}
      <NavbarCommon />
      <Hero />
    </div>
  );
}
