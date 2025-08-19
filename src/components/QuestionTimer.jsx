import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
   const timer= setTimeout(onTimeout, timeout);
   return () => {
      clearTimeout(timer);
   }
  }, [ timeout, onTimeout]);



  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          return 0;
        }
        return prevTime - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} className={mode} />;
}
