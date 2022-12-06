import { useEffect, useState } from "react";
import "../Styles/Counter.scss";

const Counter = () => {
  const [seconds, setSeconds] = useState(0);
  const increment = () => {
    setSeconds(seconds + 1);
  };
  const count = () => {
    setInterval(() => increment(), 1000);
  };
  useEffect(() => {
    count();
  });
  return (
    <div className="counter-message">
      <div>
        <h5> \Loading...</h5>
        <h5>Your request is being processed! Time passed: {seconds}</h5>
      </div>
    </div>
  );
};
export default Counter;
