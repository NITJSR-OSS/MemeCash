import React, { useState, useCallback, useContext, useEffect } from "react";
import { Web3Context } from "../context/web3context";
//import {ipfs} from '../services/ipfs'
const ipfsClint = require("ipfs-http-client");
const ipfs = new ipfsClint({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

function Upload({ closeModal }) {
  const [loading, setLoading] = useState(true);
  const [desableUpload, setDesableUpload] = useState(true);
  const [buffer, setBuffer] = useState(null);
  const [file, setFile] = useState(null);

  const { account, memeFactoryContract } = useContext(Web3Context);

  const captureFile = useCallback((e) => {
    // e.preventDefalult();
    const file = e.target.files[0];
    setFile(URL.createObjectURL(e.target.files[0]));
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = (e2) => {
      setBuffer(reader.result);
      console.log(reader.result);
    };

    // here we will check wether choosen image is meme or not
    // then enable submit button
    setDesableUpload(false);
  });
  const d = async (e) => {
    e.preventDefault();
    console.log("hola");
    const responce = await ipfs.add(buffer);
    console.log(responce.path);
    await memeFactoryContract.methods
      .createMeme(responce.path, responce.path)
      .send({ from: account });
    closeModal();
  };

  const handelSubmit = (e) => {
    //  e.preventDefault();
    //  e.stopPropagation();
    //   e.nativeEvent.stopImmediatePropagation();
    ipfs.add(buffer, (error, result) => {
      console.log(result);
      if (error) {
        console.log(error);
        return;
      }
    });
  };

  useEffect(() => {
    if (account != null && memeFactoryContract != null) {
      setLoading(false);
    }
    console.log(account, memeFactoryContract);
  }, [account, memeFactoryContract]);

  return (
    <div>
      <img
        src={
          file ??
          "https://via.placeholder.com/150/000000/FFFFFF/?text=meme cash"
        }
        alt="jks"
        id="uploaded-img"
      />
      <form onSubmit={handelSubmit}>
        <div className=" ">
          <label className="new-button" htmlFor="upload">
            Chose Meme
          </label>

          <input type="file" id="upload" onChange={captureFile} />
          <button className="new-button" disabled={desableUpload} onClick={d}>
            Upload
          </button>
          {/* <input  type='submit'   /> */}
        </div>
      </form>
    </div>
  );
}
export default Upload;
