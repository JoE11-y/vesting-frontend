import React from "react";
import "../css/timer.css";
import { Button } from "react-bootstrap";
import { useCountdown } from "../hooks/useCountdown";

const Timer = () => {
  const { days, hours, minutes, seconds } = useCountdown(1698831215);
  return (
    <div className="col-6 timerBox">
      <div className=" timer bor1">
        <div className="flex-col-c-m wsize2 m-b-20">
          <span className="l1-txt2 p-b-4 days">{days}</span>
          <span className="m2-txt2">Days</span>
        </div>

        <span className="l1-txt2 p-b-22">:</span>

        <div className="flex-col-c-m wsize2 m-b-20">
          <span className="l1-txt2 p-b-4 hours">{hours}</span>
          <span className="m2-txt2">Hours</span>
        </div>

        <span className="l1-txt2 p-b-22 respon2">:</span>

        <div className="flex-col-c-m wsize2 m-b-20">
          <span className="l1-txt2 p-b-4 minutes">{minutes}</span>
          <span className="m2-txt2">Minutes</span>
        </div>

        <span className="l1-txt2 p-b-22">:</span>

        <div className="flex-col-c-m wsize2 m-b-20">
          <span className="l1-txt2 p-b-4 seconds">{seconds}</span>
          <span className="m2-txt2">Seconds</span>
        </div>
      </div>

      <Button variant="outline-dark">Send Tokens</Button>
    </div>
  );
};

export default Timer;
