import React from "react";
import "../CSS/Counter.css";

import { TiArrowDownOutline,TiArrowUpOutline} from "react-icons/ti";



function Counter ({memeContract,
  memeHash,
  downvoteCount,
  upvoteCount,
  upvoted,
  downvoted,
  toggleUpvote,
  toggleDownvote,
  doanteEther
}) 
  

  {

  
  

  
    return (
      <div className="counter">
        <div className="btn-vote">
          <div className="upvote"  style={{color: upvoted &&'green'}}>
            
              <TiArrowUpOutline  className='inlineBlock' onClick={toggleUpvote}  />
              <li className="upvoteCount inlineBlock">{upvoteCount}</li>
           
          </div>
          <div className="downvote" style={{color: downvoted &&'red'}}>
             
              <TiArrowDownOutline   className='inlineBlock' onClick={toggleDownvote} />
              <li className="downvoteCount inlineBlock">{downvoteCount}</li>
              
          </div>
          
        </div>
        {/* <div>
          <p>{this.state.count}</p>{" "}
        </div> */}
        <div className="donation">
         
          <button className='btn inlineBlock' onClick={doanteEther}>
           DONATE
          </button>
        </div>
         
      </div>
    )
  
}

export default Counter;
