import React, { useState, useCallback, useEffect } from "react";
import "../css/timer.css";
import { Button, Spinner } from "react-bootstrap";
import { useCountdown } from "../hooks/useCountdown";
import { useWeb3Context } from "../context/web3Context";
import { getVestingData, sendTokens } from "../api/vesting";
import { ToWords } from "to-words";

const Timer = () => {
  const {
    state: { account, provider },
  } = useWeb3Context();

  const [timeLeft, setTimeLeft] = useState(0);
  const [schedule, setSchedule] = useState(0);
  const [amountToRelease, setAmounToRelease] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAddress = useCallback(async () => {
    const vestingData = await getVestingData();
    setTimeLeft(vestingData.lastReleaseTime + vestingData.tokenReleaseInterval);
    setSchedule(vestingData.tokenReleaseInterval);
    setAmounToRelease(vestingData.amountToRelease);
  }, []);

  const toWords = new ToWords({ localeCode: "en-GB" });

  const startSendAction = async () => {
    if (account && provider) {
      setLoading(true);
      try {
        await sendTokens(provider);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const { days, hours, minutes, seconds } = useCountdown(timeLeft);

  return (
    <div className="col-6 timerBox">
      <p className="m2-txt1">Schedule: Every {schedule / 60} Minutes</p>
      <p className="m2-txt1">
        Tokens Per Release:{" "}
        {toWords.convert(amountToRelease, {
          ignoreDecimal: true,
        })}{" "}
        XYZ
      </p>

      <div className=" timer bor1">
        <span className="m2-txt">Next Release</span>
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

      <Button
        variant="outline-dark"
        onClick={() => startSendAction()}
        disabled={!(account && provider)}
      >
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Send Tokens"
        )}
      </Button>
    </div>
  );
};

export default Timer;
