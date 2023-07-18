import React from "react";
import Head from "next/head";
import NavbarCommon from "../components/global/navbar";
import getUser from "../lib/getUser";
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
const Appointments = ({ user }) => {
  return (
    <div>
      <Head>
        <title>Fortitude Dashboard</title>
      </Head>
      <NavbarCommon current="dash" user={user} />
      <div>
        <div className="w-screen pt-2">
          <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-xl bg-orange-400 py-2 text-center shadow-xl shadow-gray-300">
            <h1 className="mt-2  px-8 text-3xl font-bold text-white md:text-5xl">
              Book an appointment
            </h1>
            <p className="mt-6 text-lg text-white">
              Get an appointment with our experienced doctors and counselors
            </p>
            <img
              className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>

          <div className="mx-auto grid max-w-screen-lg px-6 ">
            <div className="">
              <p className="font-serif text-xl font-bold text-blue-900">
                Select a service
              </p>
              <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    checked
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-orange-400"></span>
                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-orange-400 peer-checked:text-white"
                    for="radio_1"
                  >
                    <span className="mt-2- font-medium">
                      Guided Meditation
                    </span>
                    <span className="mt-2- font-medium">
                     
                    </span>
                    <span className="text-xs uppercase">1 Hour</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-orange-400"></span>

                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-orange-600 peer-checked:text-white"
                    for="radio_2"
                  >
                    <span className="mt-2 font-medium">
                      Planning
                    </span>
                    <span className="text-xs uppercase">1 Hour</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_3"
                    type="radio"
                    name="radio"
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-orange-400"></span>

                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-orange-600 peer-checked:text-white"
                    for="radio_3"
                  >
                    <span className="mt-2 font-medium">Health Advice</span>
                    <span className="text-xs uppercase">1 Hour</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <p className="mt-8 font-serif text-xl font-bold text-blue-900">
                Select a time
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                <button className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-900 active:scale-95">
                  12:00
                </button>
                <button className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-900 active:scale-95">
                  14:00
                </button>
                <button className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white active:scale-95">
                  09:00
                </button>
                <button className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-900 active:scale-95">
                  12:00
                </button>
                <button className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-900 active:scale-95">
                  15:00
                </button>
                <button className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-900 active:scale-95">
                  12:00
                </button>
                <button className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-900 active:scale-95">
                  14:00
                </button>
                <button className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-900 active:scale-95">
                  12:00
                </button>
              </div>
            </div>

            <button className="mt-8 w-56 rounded-full border-2 border-orange-500 bg-orange-400 px-10 py-1 text-lg font-bold text-white transition hover:translate-y-1">
              Book Now
            </button>
          </div>
        </div>
        <script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></script>
      </div>
    </div>
  );
};

export default Appointments;
