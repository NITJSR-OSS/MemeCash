import React, { useState } from "react";
import "../CSS/Counter.css";

import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";

function Counter({
  memeContract,
  owned,
  memeHash,
  downvoteCount,
  upvoteCount,
  upvoted,
  downvoted,
  toggleUpvote,
  toggleDownvote,
  doanteEther,
}) {
  const [values, setValue] = useState(10);
  const [desabled, setDesabled] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\+0|-/gi, "");
    console.log(value);
    if (value <= 0) {
      setDesabled(true);
    } else {
      setDesabled(false);
    }
    setValue(value);
  };

  return (
    <div className="counter">
      <div className="btn-vote">
        <div className="upvote" style={{ color: upvoted && "green" }}>
          <TiArrowUpOutline className="inlineBlock" onClick={toggleUpvote} />
          <li className="upvoteCount inlineBlock">{upvoteCount}</li>
        </div>
        <div className="downvote" style={{ color: downvoted && "red" }}>
          <TiArrowDownOutline
            className="inlineBlock"
            onClick={toggleDownvote}
          />
          <li className="downvoteCount inlineBlock">{downvoteCount}</li>
        </div>
      </div>

      {!owned ? (
        <div className="donation">
          <input
            style={{ minWidth: "3em", maxWidth: "4em" }}
            type="number"
            className="inlineBlock amount-box"
            value={values}
            onChange={handleChange}
          />
          <button
            className="btn inlineBlock"
            onClick={(e) => doanteEther(values)}
            disabled={desabled}
          >
            DONATE
          </button>
        </div>
      ) : (
        <li className=" btn owned inlineBlock">OWNED</li>
      )}
    </div>
  );
}

export default Counter;
