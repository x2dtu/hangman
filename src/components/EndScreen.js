import { ACTIONS } from "../App";

const EndScreen = ({ state, dispatch }) => {
  return state.hasWon ? (
    <div className="backdrop">
      <div className="modal">
        <p>You Win!</p>
        <p>Great Job!</p>
        <button onClick={() => dispatch({ type: ACTIONS.RESTART })}>
          Play Again
        </button>
      </div>
    </div>
  ) : (
    <div className="backdrop">
      <div className="modal">
        <p>You Lost!</p>
        <p className="smallWords">The phrase was: {state.word}</p>
        <p className="smallWords">Better Luck Next Time!</p>
        <button onClick={() => dispatch({ type: ACTIONS.RESTART })}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
