import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Wrapper, Container } from '../../components';
import getUser from '../../lib/getUser';
import { NavbarCommon } from '../../components';
import Image from 'next/image';
import Link from 'next/link';
export async function getServerSideProps({ req, res, params }) {
  const user = await getUser(req, res);
  const { slug } = params;
  if (user) {
    return {
      props: {
        user,
        slug,
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

export default function Experts({ user, slug }) {
  const [loading, setloading] = useState(true);
  const [details, setdetails] = useState({});
  const scrapeDetails = async () => {
    axios.post(`/api/scraper/personal`, { slug }).then((e) => {
      console.log(e.data);
      setdetails(e.data.info);
      setloading(false);
    });
  };
  useEffect(() => {
    axios.get(`/api/scraper/personal?slug=${slug}`, { slug }).then((e) => {
      console.log(e.data);
      if (!e.data?.info) {
        scrapeDetails();
        console.log(1);
      } else {
        setdetails(e.data.info);
        setloading(false);
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <NavbarCommon current="dash" user={user} />
      <Wrapper>
        <Container styles={'p-5'}>
          <div>
            {loading ? (
              <div className="mx-auto">
                <Spinner animation="border" role="status" variant="primary" />
              </div>
            ) : (
              <div className="flex flex-column">
                <div className="">
                  <img src={details.image} className="float-left mr-10" />
                  <div className=" mx-auto">
                    {details.paras.map((e) => (
                      <p className="pb-1">{e}</p>
                    ))}
                  </div>
                </div>
                <h3 className="pt-2">Contact</h3>
                <ul style={{ listStyle: 'circle' }}>
                  {details.contacts.map((e) =>
                    e.site ? (
                      <a href={e.site}>
                        <li>{e.content}</li>
                      </a>
                    ) : (
                      <li>{e.content}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
