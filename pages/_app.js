import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useState } from 'react';
import { Loading } from '../components';
function MyApp({ Component, pageProps }) {
  const [loggingout, setloggingout] = useState(false);
  const changeLogging = () => {
    setloggingout(true);
    setTimeout(() => setloggingout(false), 4000);
  };
  return loggingout ? (
    <Loading />
  ) : (
    <>
      <Component {...pageProps} changeLogging={changeLogging} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </>
  );
}

export default MyApp;
