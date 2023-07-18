import Image from 'next/image';
import Container from './container';
import HeroImg from '../../assets/images/3d-casual-life-boy-meditating.png';
import Link from 'next/link';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export default function Hero() {
  const [text] = useTypewriter({
    words: ['Become Mindful', 'Show your Fortitude', 'Stay Calm', 'Retrospect'],
    loop: Infinity,
  });
  return (
    <div style={{ height: '100vh', paddingTop: '5em' }}>
      <div className="">
        <Container className="flex flex-wrap pt-5">
          <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-2xl mb-4">
              <h1 className="mt-0 pt-0 text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight ">
                A new journey awaits you
              </h1>
              <p className="py-8 pb-2 text-xl leading-normal text-black-500 lg:text-xl xl:text-2xl">
                Fortitude is the website which helps to bring out the best in
                you. Become a better version of yourself.
              </p>
              <div className="text-black-500 lg:text-2xl xl:text-3xl pb-4">
                {text}
                <Cursor />
              </div>

              <div className="flex flex-col items-start space-y-1 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                <Link
                  href="/login"
                  // target="blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <a className="px-8 py-2 text-lg font-medium text-center text-white bg-orange-500 rounded-md no-underline">
                    Login / Sign up
                  </a>
                </Link>

                <a
                  href="/login"
                  // target="_blank"
                  rel="noopener"
                  className="flex items-center space-x-2 text-gray-500 no-underline"
                >
                  <div>To get the experience</div>
                </a>
              </div>
            </div>
          </div>

          <div className="hidden lg:block mx-auto">
            <Image
              src={HeroImg}
              width="500"
              height="500"
              alt="Hero Illustration"
              layout="intrinsic"
              loading="eager"
              placeholder="blur"
              className="rounded-full lg: w-1/2 sm:hidden"
              responsive="true"
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
