import { useState } from "react";
import { ACTIONS } from "../App";

const Modal = ({ dispatch }) => {
  const [isRand, setIsRand] = useState(false);
  const [phrase, setPhrase] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (isRand) {
          dispatch({ type: ACTIONS.RANDOM_WORD, payload: { phrase } });
        } else {
          dispatch({ type: ACTIONS.PROCESS_INPUT_WORD, payload: { phrase } });
        }
      }}
    >
      <div className="backdrop">
        <div className="modal">
          {!isRand ? (
            <>
              <div>
                <p>Welcome to Hangman!</p>
                <input
                  className="textInput"
                  type="text"
                  placeholder="Type Phrase You Want Opponent To Guess Here"
                  id="word"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                />
                <input className="submit" type="submit" value="Submit Word" />
              </div>
              <button onClick={() => setIsRand(true)}>
                Or Pick a Random Word To Guess Yourself!
              </button>
            </>
          ) : (
            <div className="randContainer">
              <button onClick={() => setPhrase("Random U.S. State")}>
                Random U.S. State
              </button>
              <button onClick={() => setPhrase("Random Food")}>
                Food Related
              </button>
              <button onClick={() => setPhrase("Random U.S. President")}>
                Random U.S. President
              </button>
              <button onClick={() => setPhrase("Random Movie")}>
                Random Movie
              </button>
              <button onClick={() => setPhrase("Random Activity")}>
                Random Activity
              </button>
              <button onClick={() => setIsRand(false)}>Go Back</button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Modal;
