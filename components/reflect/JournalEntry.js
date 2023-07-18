import React, { useState } from "react";
import styles from "../../styles/Reflect.module.scss";
import moment from "moment";
import EditModal from "./EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function JournalEntry({ data, updateEntry, handleDelete }) {
  const [modal, setmodal] = useState(false);
  const changeModalState = (e) => {
    setmodal(e);
  };

  return (
    <div
      data-pid={data.pid}
      className="w-100 flex flex-column gap-2 justify-content-between px-4 py-3 pb-2 rounded-lg"
    >
      <div className="flex justify-content-between align-items-center">
        <div className={styles.journaltitle}>{data.title}</div>
        <div className="emotion">
          {data.emotions?.length ? data.emotions[0].icon : ""}
        </div>
      </div>
      <div className={styles.journalbody}>{data.body}</div>
      <footer className="flex justify-content-between align-items-center pt-1">
        <div
          className="p-1"
          onClick={() => {
            setmodal((e) => !e);
          }}
        >
          Edit
          <FontAwesomeIcon icon={faPenToSquare} className="pl-2 text-sm" />
        </div>

        <div className="flex justify-content-around gap-2 align-items-center">
          <div>{moment(data.updatedAt || data.createdAt).from(Date.now())}</div>
          <div className="cursor-pointer">
            <FontAwesomeIcon
              icon={faTrash}
              className="pl-2 text-sm"
              onClick={() => handleDelete({ pid: data.pid })}
            />
          </div>
        </div>
      </footer>
      <EditModal
        state={modal}
        handleSubmit={updateEntry}
        changeState={changeModalState}
        content={data}
      />
    </div>
  );
}
