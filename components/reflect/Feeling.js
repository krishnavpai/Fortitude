import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Reflect.module.scss';
import Emotions from './Emotions';
import EditModal from './EditModal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const emotions = [
  {
    icon: '😄',
    id: 5,
    name: 'happy',
  },
  {
    icon: '😥',
    id: 1,
    name: 'sad',
  },
  {
    icon: '🥳',
    id: 6,

    name: 'celebration',
  },
  {
    icon: '😇',
    id: 4,

    name: 'grateful',
  },
  {
    icon: '🤩',
    id: 3,
    name: 'spunky',
  },
  {
    icon: '🙂',
    id: 2,
    name: 'it is what it is',
  },
  {
    icon: '😎',
    id: 7,
    name: 'Confident',
  },
  {
    icon: '😛',
    id: 8,
    name: 'Silly',
  },
];
export default function Feeling({ user, triggerCount }) {
  const [modal, setmodal] = useState(false);
  const [chosenEmotions, setChosenEmotions] = useState([]);
  const [loadEmotions, setLoadEmotions] = useState(false);
  const updateChosen = ({ chosen, data }) => {
    if (chosen) {
      setChosenEmotions((e) => [...e, data]);
    } else {
      setChosenEmotions((e) => {
        return e.filter((e) => e.id != data.id);
      });
    }
  };
  const handleSubmit = async (data) => {
    data = { ...data, emotions: chosenEmotions, uid: user.uid };
    const payload = {
      uid: user.uid,
      ...data,
      emotions: chosenEmotions,
    };
    axios
      .post('/api/reflect/journal', payload)
      .then((e) => {
        console.log(e);
        toast.success('Entry added successfully!');
        triggerCount();
      })
      .catch((err) => console.log(err));
  };
  const journalinp = useRef('');
  const changeModalState = (e) => {
    setmodal(e);
  };
  useEffect(() => {
    axios.get('/api/reflect/emotion').then((e) => {
      console.log(e.data);
      setChosenEmotions(e.data.emotions || []);
      setLoadEmotions(true);
    });
  }, []);
  const postEmotions = async () => {
    console.log('api called');
    axios
      .post('/api/reflect/emotion', { emotions: chosenEmotions })
      .then((e) => console.log(e));
  };
  useEffect(() => {
    console.log(chosenEmotions);
    if (loadEmotions == false) return;
    postEmotions();
  }, [chosenEmotions]);
  return (
    <>
      <div className={styles.feeling}>
        <div className="container pt-1 pb-2">
          <h1>How are you feeling today?</h1>
          <hr className="" />
          <div className="">
            <div className="flex gap-3 flex-wrap">
              {emotions.map((e) => (
                <Emotions
                  data={e}
                  key={e.id}
                  update={updateChosen}
                  chosenEmotions={chosenEmotions || []}
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <input
              onFocus={(e) => {
                setmodal(true);
                journalinp.current.blur();
              }}
              ref={journalinp}
              type="text"
              className="w-100 bg-[#eaeaea] p-2 px-3 h-12 rounded-lg focus:outline-none"
              placeholder="Journal Something!"
            />
          </div>
        </div>
      </div>
      <EditModal
        state={modal}
        modalTitle={'Write Journal Entry'}
        changeState={changeModalState}
        handleSubmit={handleSubmit}
        type="new"
        content={{}}
      />
    </>
  );
}
