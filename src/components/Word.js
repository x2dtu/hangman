import { useRef } from "react";

const Word = ({ blanks, startWord }) => {
  let nextIndex = blanks.length + 1;
  for (let i = startWord + 1; i < blanks.length; i++) {
    if (blanks[i] === " ") {
      nextIndex = i;
      break;
    }
  }
  if (startWord === 0) {
    startWord--;
  }
  const array = blanks.slice(startWord + 1, nextIndex);

  const propKey = useRef(0);

  return (
    <div className="word">
      {array.map((char) =>
        char.match(/[.',:0-9-!?]/) ? (
          <div
            key={propKey.current++}
            className={
              "blankContainer specialChar" +
              (char.match(/[0-9]/) ? " specialNum" : "")
            }
          >
            <div className="blankText">{char}</div>
          </div>
        ) : (
          <div key={propKey.current++} className="blankContainer">
            <div className="blankText">{char}</div>
            <div className="blank"></div>
          </div>
        )
      )}
    </div>
  );
};

export default Word;
