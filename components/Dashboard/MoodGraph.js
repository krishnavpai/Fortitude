import React, { useState, useEffect } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import axios from 'axios';
Chart.register(CategoryScale);
const emotions = [
  {
    icon: '🥳',
    id: 6,
    name: 'celebration',
  },
  {
    icon: '😄',
    id: 5,
    name: 'happy',
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
    icon: '😥',
    id: 1,
    name: 'sad',
  },
];

const MoodGraph = () => {
  const timelines = ['1 week', '1 month', '6 months'];
  const [time, settime] = useState('1 week');
  const [mood, setmood] = useState({ x: [], y: [] });
  useEffect(() => {
    axios.get('/api/dashboard/mood').then((e) => setmood(e.data));
  }, []);
  return (
    <>
      <div className={styles.graph}>
        <div className="flex md:justify-content-center">
          <div className="md:hidden font-bold lg:block sm:w-12 md:w-32 lg:w-48 pb-3">
            Your mood
          </div>
          <div className="flex gap-4 justify-content-around">
            {timelines.map((e) => (
              <div
                className={time == e ? styles.chosen : ''}
                onClick={() => settime(e)}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
        <div className="flex p-2 pt-4 h-64">
          <div className="flex flex-column gap-2">
            {emotions.map((e) => (
              <div>{e.icon}</div>
            ))}
          </div>
          <Bar
            datasetIdKey="id"
            height={'250px'}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              backgroundColor: '#6BCB77',
              barThickness: 20,
              borderRadius: 0,
              layout: {
                padding: {
                  left: 0,
                  right: 30,
                  top: 5,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                yAxis: {
                  ticks: {
                    display: false,
                    beginAtZero: true,
                    steps: 2,
                    stepSize: 1,
                    min: 1,
                    max: 10,
                  },
                  grid: {
                    display: false,
                    borderColor: '#fff',
                  },
                },
                xAxis: {
                  grid: {
                    display: false,
                    borderColor: 'rgba(0, 0, 0, 0)',
                  },
                },
              },
            }}
            data={{
              labels: mood.x,
              datasets: [
                {
                  id: 1,
                  label: '',
                  data: mood.y,
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MoodGraph;
