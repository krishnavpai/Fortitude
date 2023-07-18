import React, { useRef, useEffect, useState } from 'react';
import { Popover, OverlayTrigger, Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function NavbarCommon({ current, signout, user }) {
  const hamburger = useRef('');
  const router = useRouter();
  const [loggingout, setloggingout] = useState(true);

  const signoutHandler = () => {
    setloggingout(true);
    deleteCookie('token');
    router.push('/login');
  };

  const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Header as="h3">Hello There</Popover.Header> */}
      <div>
        <Button variant="danger m-2" onClick={signoutHandler}>
          Logout
        </Button>
      </div>
    </Popover>
  );

  const pages = [
    { name: 'Dashboard', e: 'dash', link: '/dashboard' },
    { name: 'Blogs', e: 'blogs', link: '/blogs' },
    { name: 'Videos', e: 'vids', link: '/videos' },
    { name: 'Appointments', e: 'apps', link: '/appointments' },
    { name: 'Reflect', e: 'reflect', link: '/reflect' },
  ];

  return (
    <>
      <div className={styles.navbar}>
        <div className="d-flex justify-content-between align-items-center">
          <div className={styles.hamburger}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                hamburger.current.style.display =
                  hamburger.current.style.display == 'none' ? 'flex' : 'none';
              }}
            />
          </div>
          <Link href="/" className="cursor-pointer">
            <div className={styles.brand}>Fortitude</div>
          </Link>
          <li className="lg:flex align-items-center" id="pages-list">
            {pages.map((ele, i) => {
              return (
                <ul key={i} className={current == ele.e ? 'font-bold' : ''}>
                  <Link href={ele.link}>{ele.name}</Link>
                </ul>
              );
            })}
          </li>
          <div className="flex justify-content-between gap-4 sm:gap-2 align-items-center">
            {user ? (
              <>
                <FontAwesomeIcon icon={faGear} />
                <FontAwesomeIcon icon={faBell} />
                <OverlayTrigger
                  trigger="focus"
                  placement="bottom"
                  overlay={popover}
                >
                  <button>
                    <img
                      src={`https://avatars.dicebear.com/api/avataaars/human/${
                        user?.name || ''
                      }.png?mood[]=happy`}
                      width="45px"
                      height="45px"
                      className="rounded-full border-2"
                    ></img>
                  </button>
                </OverlayTrigger>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.smallnav} ref={hamburger}>
          {pages.map((ele) => {
            return (
              <div
                className={current == ele.e ? 'font-bold' : 'hover:font-bold'}
              >
                <Link href={ele.link}>{ele.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
