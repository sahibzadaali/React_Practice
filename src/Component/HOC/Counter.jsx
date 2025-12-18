import React from "react";
import withCounter from "./WithCounter";

const Counter = (props) => {
  return (
    <button onClick={props.incrementCount} {...props}>
      Click on Counter
    </button>
  );
};

export default withCounter(Counter);
