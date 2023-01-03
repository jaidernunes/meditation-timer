import React, { useEffect, useState } from 'react';
import finalBell from './assets/finalBell1.mp3';
import intervalBell from './assets/intervalBell1.mp3'

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


  useEffect(() => {
    let meditationTimer = null;
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

  useEffect(() => {
    let intervalBellTimer = null;
    if (isInterval) {
      intervalBellTimer = setInterval(() => {
        console.log("single bell")
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
    <>
      <div>
        <label>
          Session duration:
          <input
            type="number"
            value={timeInput}
            onChange={(event) => setTimeInput(event.target.value)}
          />
          &nbsp; minutes
        </label>
        <br />

        Interval Bell every:
        <label>
          <input
            type="number"
            value={intervalInput}
            onChange={(event) => setIntervalInput(event.target.value)}
          />
          &nbsp; minutes
        </label>
      </div>

      <div>
        <button onClick={handleStartPress}>Start Timer</button>
        <p>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
      </div>
    </>
  );
}

export default App
