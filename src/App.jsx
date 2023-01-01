import React, { useEffect, useState } from 'react';

const baseTime = 300;

function App() {
  //   const [seconds, setSeconds] = useState(baseTime);
  //   const [isRunning, setIsRunning] = useState(false);
  //   const [timeInput, setTimeInput] = useState(baseTime)

  //   useEffect(() => {
  //     let interval = null;
  //     if (isRunning) {
  //       interval = setInterval(() => {
  //         setSeconds((seconds) => seconds - 1);
  //       }, 1000);
  //     }
  //     if (seconds === 0) {
  //       clearInterval(interval)
  //     } else if (!isRunning && seconds !== 0) {
  //       clearInterval(interval);
  //     }
  //     return () => clearInterval(interval);
  //   }, [isRunning, seconds]);

  //   const handleStartPress = () => {
  //     setIsRunning(true);
  //   };

  //   return (
  //     <>
  //       <div>
  //         <form action="">
  //           <input type="time" name="timeInput" id="timeInput" />
  //         </form>
  //       </div>
  //       <div>
  //         <button onClick={handleStartPress}>Start Timer</button>
  //         <p>{seconds} seconds left</p>
  //       </div>
  //     </>
  //   );
  // }

  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    const totalSeconds = minutes * 60;
    setHours(Math.floor(totalSeconds / 3600));
    setMinutes(Math.floor((totalSeconds % 3600) / 60));
    setSeconds(totalSeconds % 60);
    setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0 && minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (minutes === 0 && hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
      }
    }, 1000);
  };

  return (
    <div>
      <label>
        Minutes:
        <input
          type="number"
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
        />
      </label>
      <button onClick={startTimer}>Start Timer</button>
      <p>
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
}


export default App
