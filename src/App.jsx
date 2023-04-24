import React, { useEffect, useState } from 'react';
import finalBell from './assets/finalBell1.mp3';
import intervalBell from './assets/intervalBell1.mp3'
import "./app.css"
import "tailwindcss/tailwind.css";


const baseTime = 0;

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(baseTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isInterval, setIsInterval] = useState(false);
  const [timeInput, setTimeInput] = useState(baseTime)
  const [intervalInput, setIntervalInput] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState(0);

  const totalSeconds = timeInput * 60;
  const intervalSeconds = intervalInput * 60;

  const endingBell = new Audio(finalBell);
  const middleBell = new Audio(intervalBell);

  let meditationTimer = null;
  useEffect(() => {
    if (isRunning) {
      meditationTimer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes(minutes - 1);
          }
          if (minutes === 0 && hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
          }
          setSeconds(59);
        }
      }, 1000);
    }
    if (seconds === 0 && minutes === 0 && hours === 0 && isRunning === true) {
      console.log("finalBells");
      clearInterval(meditationTimer)
      endingBell.play();
      setIsRunning(false);
    }
    return () => {
      clearInterval(meditationTimer);
    }
  }, [isRunning, seconds, isInterval]);

  let intervalBellTimer = null;
  useEffect(() => {
    if (isInterval) {
      intervalBellTimer = setInterval(() => {
        console.log(`Bell on: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        middleBell.play();
      }, intervalSeconds * 1000);
    }
    if (seconds === 0 && minutes === 0 && hours === 0) {
      clearInterval(intervalBellTimer)
      setIsInterval(false);
    }
    return () => {
      clearInterval(intervalBellTimer);
    }
  }, [isInterval])

  useEffect(() => {
    clearIntervals();
  }, []);

  function clearIntervals() {
    clearInterval(meditationTimer);
    clearInterval(intervalBellTimer);
  }

  const handleStartPress = () => {
    if (intervalInput !== 0) {
      setIntervalTimer(intervalSeconds);
      setIsInterval(true)
    }
    setHours(Math.floor(totalSeconds / 3600));
    setMinutes(Math.floor((totalSeconds % 3600) / 60));
    setSeconds(totalSeconds % 60);
    setIsRunning(true);
  };

  return (
    <div className='bg-black h-screen flex flex-col items-center'>

      <div id='options' className="bg-gray-800 py-4 flex flex-wrap justify-center w-screen">
        <div className='flex w-18 mx-4 '>
          <label className="mb-2 text-white">
            Session duration:
            <input
              className="border border-gray-300 text-black w-14 rounded-md px-2 py-1 ml-2"
              type="number"
              value={timeInput}
              onChange={(event) => setTimeInput(event.target.value)}
            />
            &nbsp; minutes
          </label>
        </div>

        <div className='flex w-18 mx-4'>
          <label className="mb-2 text-white">
            Ring a Bell every:
            <input
              className="border border-gray-300 text-black w-14 rounded-md px-2 py-1 ml-2"
              type="number"
              value={intervalInput}
              onChange={(event) => setIntervalInput(event.target.value)}
            />
            &nbsp; minutes
          </label>
        </div>
      </div>

      <div id='timer' className='flex flex-col items-center justify-center h-full'>
        <p className="text-5xl text-white font-bold m-4">
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </p>
        <button
          className="bg-blue-500 text-xl text-white font-bold py-3 px-5 rounded"
          onClick={handleStartPress}
        >
          Start Timer
        </button>
      </div>

    </div>
  );

}

export default App
