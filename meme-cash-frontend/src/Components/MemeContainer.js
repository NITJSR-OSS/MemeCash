import React, { useContext, useEffect, useState } from "react";
import Cards from "../Containers/Card";
import { Web3Context } from "../context/web3context";

export default function MemeContainer() {
  const { account, deployedMemes, memeABI, web3, myMemes } = useContext(
    Web3Context
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(account, deployedMemes);

    if (account && deployedMemes && memeABI && web3 && myMemes) {
      setLoading(false);
    }
  }, [account, deployedMemes, memeABI, web3, myMemes]);

  return (
    <>
      {!loading &&
        deployedMemes.map((meme) => {
          return <Cards key={meme} memeAddress={meme} />;
        })}
    </>
  );
}
