import React from "react";
import withCounter from "./WithCounter";

const OnHover = (props) => {
  return <button onMouseOver={props.incrementCount}>OnHover</button>;
};

export default withCounter(OnHover);
