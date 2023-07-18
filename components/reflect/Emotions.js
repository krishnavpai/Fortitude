import React, { useState, useEffect } from "react";
import styles from "../../styles/Reflect.module.scss";
export default function Emotions({ data, update, chosenEmotions }) {
  const present = chosenEmotions.filter((e) => e.id == data.id);
  const [chosen, setChosen] = useState(present.length ? true : false);
  const handleClick = () => {
    setChosen((e) => !e);
  };
  useEffect(() => {
    const present = chosenEmotions.filter((e) => e.id == data.id);
    if (present.length && chosen) return;
    update({ chosen, data: data });
  }, [chosen]);
  useEffect(() => {
    const present = chosenEmotions.filter((e) => e.id == data.id);
    if (present.length) setChosen(true);
  }, [chosenEmotions]);
  return (
    <>
      {chosen ? (
        <div
          className="flex cursor-pointer bg-[#ff7a00] text-slate-100 justify-content-between gap-2 align-items-center p-1 px-2 rounded-full"
          onClick={handleClick}
        >
          <div>{data.icon}</div>
          <div>{data.name?.charAt(0).toUpperCase() + data.name?.slice(1)}</div>
        </div>
      ) : (
        <div
          id="emo"
          className="flex cursor-pointer hover:bg-[#ff7a00] hover:text-slate-100 justify-content-between gap-2 bg-[#eaeaea] align-items-center p-1 px-2 rounded-full"
          onClick={handleClick}
        >
          <div>{data.icon}</div>
          <div>{data.name?.charAt(0).toUpperCase() + data.name?.slice(1)}</div>
        </div>
      )}
    </>
  );
}
