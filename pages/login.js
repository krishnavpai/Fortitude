import styles from '../styles/Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import axios from 'axios';
import getUser from '../lib/getUser';
import { Alert, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'react-toastify';
import logo from '../assets/images/fortitude-logo.png';

export async function getServerSideProps({ req, res }) {
  const user = await getUser(req, res);
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}

export default function Login({ changeLogging }) {
  const [signLoginState, setState] = useState(0);
  const [logging, setlogging] = useState(0);
  const name = useRef('');
  const alert = useRef('');
  const password = useRef('');
  const email = useRef('');
  const router = useRouter();
  useEffect(() => {
    alert.current.style.display = 'none';
  }, []);

  const refs = { name, password, email };
  const signinHandler = async (obj) => {
    try {
      const res = await axios.post('/api/auth/signin', obj);
      console.log(res);
      toast.success('Logged In');
      changeLogging();
      router.push('/dashboard');
    } catch (error) {
      // alert.current.innerText = error.response.data.message;
      // alert.current.style.display = "block";
      toast.error(error.response.data.message);
      console.log(error);
    }
    setlogging(0);
  };
  const signupHandler = async (obj) => {
    try {
      console.log(obj);
      const res = await axios.post('/api/auth/signup', obj);
      router.push('/dashboard');
      changeLogging();
      toast.success('Logged In');
    } catch (error) {
      // alert.current.innerText = error.response.data.message;
      // alert.current.style.display = "block";
      toast.error(error.response.data.message);
      console.log(error);
    }
    setlogging(0);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setlogging(1);
    let obj = {};
    Object.keys(refs).forEach((e) => {
      obj[e] = refs[e].current?.value;
    });
    if (signLoginState) await signupHandler(obj);
    else await signinHandler(obj);
  };

  return (
    <>
      <div className={styles.parent}>
        <div className={styles.logoside}>
          <div className={styles.imagecontainer}>
            <Image src={logo} width="600px" height="600px" responsive="true" />
          </div>
        </div>
        <div className={styles.loginside}>
          <form action="" onSubmit={handleClick}>
            {signLoginState ? (
              <div className={styles.inputContainer}>
                <FontAwesomeIcon icon={faPerson} className="icons" />
                <input
                  type="text"
                  placeholder="Name"
                  ref={name}
                  required
                  className={styles.input}
                ></input>
              </div>
            ) : (
              ''
            )}
            <div className={styles.inputContainer}>
              <FontAwesomeIcon icon={faUser} className="icons" />
              <input
                type="email"
                required
                ref={email}
                placeholder="Email"
                className={styles.input}
              />
            </div>
            <div className={styles.inputContainer}>
              <FontAwesomeIcon icon={faLock} className="icons" />
              <input
                type="password"
                required
                placeholder="Password"
                className={styles.input}
                ref={password}
              ></input>
            </div>
            <button type="submit">
              {logging ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : signLoginState ? (
                'Sign Up!'
              ) : (
                'Log In'
              )}
            </button>
            <div
              className={styles.signup}
              onClick={() => {
                setState(!signLoginState);
              }}
            >
              {signLoginState ? 'Log In' : 'Sign Up?'}
            </div>
            <Alert ref={alert} variant={'danger'} className="my-4"></Alert>
          </form>
        </div>
      </div>
    </>
  );
}
