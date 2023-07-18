import React, { useState } from "react";
import styles from "../../styles/Dashboard.module.scss";

const Communities = () => {
  const [comms, setComms] = useState([
    { avatar: "https://joeschmoe.io/api/v1/", name: "Healthy Mind" },
    { avatar: "https://joeschmoe.io/api/v1/", name: "Healthy Mind" },
    { avatar: "https://joeschmoe.io/api/v1/", name: "Healthy Mind" },
  ]);
  return (
    <>
      <div className={styles.comms}>
        <div>
          <h1 className="pb-1">Communities</h1>
          <hr />
        </div>
        <div className="mt-4 p-2 rounded-lg bg-[#eaeaea]/50 flex flex-column gap-2">
          {comms.map((e) => (
            <div className="p-1 px-2 flex justify-content-between align-items-center">
              <img
                src={e.avatar + e.name}
                alt=""
                width="40px"
                height="40px"
                className="rounded-full border-2"
              />
              <div>{e.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Communities;
