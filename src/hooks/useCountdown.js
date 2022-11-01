import { useEffect, useState } from "react";

const useCountdown = (targetSeconds) => {
  const [days, setDay] = useState(0);
  const [hours, setHour] = useState(0);
  const [minutes, setMinute] = useState(0);
  const [seconds, setSecond] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const endTime = new Date(targetSeconds * 1000).getTime();
      const now = new Date().getTime();
      const gap = endTime - now;
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      if (gap < 0) {
        setHour(0);
        setMinute(0);
        setSecond(0);
        setDay(0);
      } else {
        setDay(() => Math.floor(gap / day));
        setHour(() => Math.floor((gap % day) / hour));
        setMinute(() => Math.floor((gap % hour) / minute));
        setSecond(() => Math.floor((gap % minute) / second));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetSeconds]);

  return { days, hours, minutes, seconds };
};

export { useCountdown };
