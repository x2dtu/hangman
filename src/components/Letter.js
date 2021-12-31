import React from "react";
import { useState } from "react";

const Letter = ({ letter, dispatch, type, disabled }) => {
  const [isDisabled, setDisabled] = useState(false);
  return (
    <button
      disabled={isDisabled || disabled}
      onClick={() => {
        dispatch({ type: type, payload: { letter } });
        setDisabled(true);
      }}
      className="letter"
    >
      {letter}
    </button>
  );
};

export default Letter;
