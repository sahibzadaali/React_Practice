import { useState } from "react";

const withCounter = (OriginalComponent) => {
  const NewComponent = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => {
      setCount(count + 1);
    };
    return (
      <>
        {count}
        <OriginalComponent incrementCount={incrementCount} />
      </>
    );
  };
  return NewComponent;
};

export default withCounter;
