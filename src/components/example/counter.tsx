"use client";

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleDecrease = () => {
    setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Counter</h2>
      <p data-testid="count-value">{count}</p>
      <button type="button" onClick={handleDecrease} data-testid="decrease">
        -
      </button>
      <button type="button" onClick={handleIncrease} data-testid="increase">
        +
      </button>
    </div>
  );
};

export default Counter;
