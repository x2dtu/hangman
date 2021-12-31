import "./App.css";
import { useState, useReducer, useEffect, useRef } from "react";
import Letter from "./components/Letter";
import Modal from "./components/Modal";
import Word from "./components/Word";
import EndScreen from "./components/EndScreen";

import {
  US_STATES,
  FOODS,
  US_PRESIDENTS,
  MOVIES,
  ACTIVITIES,
} from "./resources/RandomWords";

export const ACTIONS = {
  PROCESS_INPUT_WORD: "process-input-word",
  RANDOM_WORD: "random-word",
  GUESS_LETTER: "guess-letter",
  RESTART: "restart",
  SLEEP: "sleep",
};

const INIT = {
  word: "",
  blanks: [],
  incorrect_guesses: 0,
  punctuation: 0,
  words: 1,
  hasWon: false,
  hasLost: false,
  guessedLetters: new Set(),
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.PROCESS_INPUT_WORD:
      return input_word(state, payload);
    case ACTIONS.RANDOM_WORD:
      let index;
      switch (payload.phrase) {
        case "Random U.S. State":
          index = Math.trunc(Math.random() * US_STATES.length);
          return input_word(state, { phrase: US_STATES[index] });
        case "Random Food":
          index = Math.trunc(Math.random() * FOODS.length);
          return input_word(state, { phrase: FOODS[index] });
        case "Random U.S. President":
          index = Math.trunc(Math.random() * US_PRESIDENTS.length);
          return input_word(state, { phrase: US_PRESIDENTS[index] });
        case "Random Movie":
          index = Math.trunc(Math.random() * MOVIES.length);
          return input_word(state, { phrase: MOVIES[index] });
        case "Random Activity":
          index = Math.trunc(Math.random() * ACTIVITIES.length);
          return input_word(state, { phrase: ACTIVITIES[index] });
        default:
          return state;
      }
    case ACTIONS.GUESS_LETTER:
      if (state.guessedLetters.has(payload.letter.toUpperCase())) {
        return state;
      }
      state.guessedLetters.add(payload.letter.toUpperCase());
      if (state.word.toLowerCase().includes(payload.letter.toLowerCase())) {
        for (let i = 0; i < state.word.length; i++) {
          if (state.word.toLowerCase()[i] === payload.letter.toLowerCase()) {
            state.blanks[i] = state.word[i];
          }
        }
        if (!state.blanks.includes("")) {
          // then we have guessed all the blanks and have won
          state.hasWon = true;
        }
        return {
          ...state,
        };
      }
      state.incorrect_guesses++;
      if (state.incorrect_guesses >= 6) {
        // then the full man is drawn and we have lost
        state.hasLost = true;
      }
      return {
        ...state,
      };
    case ACTIONS.RESTART:
      return {
        ...INIT,
        word: "",
        blanks: [],
        guessedLetters: new Set(),
      };
    default:
      return state;
  }
}

function input_word(state, payload) {
  if (!payload.phrase.match(/[a-zA-Z]/)) {
    return state;
  }
  state.word = payload.phrase.replace(/[^a-zA-Z. ',:0-9-!?]/g, "");
  for (let i = 0; i < state.word.length; i++) {
    if (state.word[i].match(/[.',:0-9-!?]/)) {
      state.blanks.push(state.word[i]);
      state.punctuation++;
    } else if (state.word[i] === " ") {
      state.blanks.push(" ");
      state.words++;
    } else {
      state.blanks.push("");
    }
  }
  return {
    ...state,
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, INIT);
  const [slept, setSlept] = useState(0); // for sleeping right after game end

  const propKey = useRef(0);

  useEffect(() => {
    let onKeyStroke = function () {};
    if (state.word) {
      onKeyStroke = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
        if (event.key.match(/[a-zA-Z]/) && event.key.length === 1) {
          dispatch({
            type: ACTIONS.GUESS_LETTER,
            payload: { letter: event.key.toLowerCase() },
          });
        }
      };
    }
    window.addEventListener("keydown", onKeyStroke);
    return () => {
      window.removeEventListener("keydown", onKeyStroke);
    };
  }, [state.word]);

  if ((state.hasWon || state.hasLost) && !slept) {
    setSlept(slept + 1);
  } else if (!state.hasWon && !state.hasLost && slept) {
    setSlept(slept - slept);
  }

  useEffect(() => {
    if (slept === 1) {
      function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
      sleep(1000);
      setSlept(slept + 1);
    }
  }, [slept]);

  return (
    <>
      {!state.word ? (
        <Modal dispatch={dispatch} />
      ) : (state.hasWon || state.hasLost) && slept > 1 ? (
        <EndScreen state={state} dispatch={dispatch} />
      ) : (
        <div className="gridContainer">
          <div className="postContainer">
            <div className="post"></div>
            <div className="pole"></div>
            <div className="horizontalBeam"></div>
            <div className="support"></div>
            <div className="rope"></div>
            {state.incorrect_guesses > 0 ? <div className="face"></div> : null}
            {state.incorrect_guesses > 1 ? <div className="body"></div> : null}
            {state.incorrect_guesses > 2 ? (
              <div className="leftArm"></div>
            ) : null}
            {state.incorrect_guesses > 3 ? (
              <div className="rightArm"></div>
            ) : null}
            {state.incorrect_guesses > 4 ? (
              <div className="leftLeg"></div>
            ) : null}
            {state.incorrect_guesses > 5 ? (
              <div className="rightLeg"></div>
            ) : null}
          </div>
          <div className="blanks">
            {state.blanks.map((blank, i) =>
              blank === " " || i === 0 ? (
                <Word
                  key={propKey.current++}
                  blanks={state.blanks}
                  startWord={i}
                />
              ) : null
            )}
          </div>
          <div className="lettersLeft">
            {[
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
              "Z",
            ].map((letter) => (
              <Letter
                key={propKey.current++}
                letter={letter}
                dispatch={dispatch}
                type={ACTIONS.GUESS_LETTER}
                disabled={state.guessedLetters.has(letter)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
