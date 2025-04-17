import React, {useState, useRef} from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [stopped, setStopped] = useState(false);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!isStopwatchRunning) {
      setStopped(false);
      setIsStopwatchRunning(true);
      startTimeRef.current = new Date().getTime() - time;
      intervalRef.current = setInterval(() => {
        setTime(new Date().getTime() - startTimeRef.current);
      }, 100);
    }
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
    setStopped(true);
    setIsStopwatchRunning(false);
    set;
  };

  const resetStopwatch = () => {
    setTime(0);
  };

  return (
    <div>
      <h2>{time}</h2>
      <div className="btnsControl">
        <button onClick={startStopwatch}>{stopped ? "Resume" : "Start"}</button>
        <button onClick={stopStopwatch}>Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
}
