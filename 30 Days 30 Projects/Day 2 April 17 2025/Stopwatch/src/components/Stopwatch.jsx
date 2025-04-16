import React, {useState} from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  let timeAtTheStart = new Date().getTime();
  let currentTime = null;
  let setIntervalRef = null;

  const startStopwatch = () => {
    if (!isStopwatchRunning) {
      console.log("Started");
      setIsStopwatchRunning(true);
      setIntervalRef = setInterval(() => {
        setTime(new Date().getTime() - timeAtTheStart);
      }, 100);
    }
  };

  const stopStopwatch = () => {
    setIsStopwatchRunning(false);
    console.log("Stopped");
  };

  const resetStopwatch = () => {
    console.log("Reset");
  };

  return (
    <div>
      <h2>{time}</h2>
      <div className="btnsControl">
        <button onClick={startStopwatch}>Start</button>
        <button onClick={stopStopwatch}>Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
}
