import React, { useRef, useState } from "react";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const stopWatchRef = useRef(0);
  const intervalRef = useRef(null);

  const handleStart = () => {
    stopWatchRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - stopWatchRef.current);
    }, 10);
  };
  const handleStop = () => {
    clearInterval(intervalRef.current);
  };
  const handleRestart = () => {
    clearInterval(intervalRef.current);
    setTime(0);
  };

  function getTime() {
    const hours = Math.floor(time / (1000 * 3600))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div>
      <h3>StopWatch</h3>
      <hr />
      {getTime()}
      <hr />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default StopWatch;
