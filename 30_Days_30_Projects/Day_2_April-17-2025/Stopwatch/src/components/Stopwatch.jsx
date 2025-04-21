import React, {useState, useRef, useEffect} from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [stopped, setStopped] = useState(false);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [time]);

  const handleBlur = () => {
    stopStopwatch();
  };

  const handleFocus = () => {
    startStopwatch();
  };

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
  };

  const resetStopwatch = () => {
    setTime(0);
    clearInterval(intervalRef.current);
    setIsStopwatchRunning(false);
  };

  const formatTime = () => {
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor(time / 3600000)
      .toString()
      .padStart(2, "0");
    const finalTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    return finalTime;
  };

  return (
    <div>
      <h2>{formatTime()}</h2>
      <div className="btnsControl">
        <button disabled={isStopwatchRunning} onClick={startStopwatch}>
          {stopped ? "Resume" : "Start"}
        </button>
        <button onClick={stopStopwatch}>Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
}
