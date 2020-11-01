import React, { useState, useCallback, useContext, useEffect } from "react";
import { Web3Context } from "../context/web3context";
import { BiLoaderCircle } from "react-icons/bi";
//import {ipfs} from '../services/ipfs'
const ipfsClint = require("ipfs-http-client");
const ipfs = new ipfsClint({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

function Upload({ closeModal }) {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [desableUpload, setDesableUpload] = useState(true);
  const [buffer, setBuffer] = useState(null);
  const [file, setFile] = useState(null);

  const { account, memeFactoryContract } = useContext(Web3Context);

  const captureFile = async (e) => {
    setLoading(true);
    // e.preventDefalult();
    try {
      setDesableUpload(true);
      const file = e.target.files[0];
      setFile(URL.createObjectURL(e.target.files[0]));
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = (e2) => {
        setBuffer(reader.result);
        console.log(reader.result);
      };

      // here we will check wether choosen image is meme or not

      setDesableUpload(false);
    } catch (err) {
      console.log(err);
      document.getElementById("error-in-meme").innerHTML = "Not a meme.";
    }
    setLoading(false);

    // then enable submit button
  };
  const d = async (e) => {
    e.preventDefault();
    setUploading(true);
    console.log("hola");
    try {
      const responce = await ipfs.add(buffer);
      console.log(responce.path);
      await memeFactoryContract.methods
        .createMeme(responce.path, responce.path)
        .send({ from: account });
      closeModal();
      window.location.reload();
    } catch (e) {
      console.log(e);
      const p = document.getElementById("error-in-uploading");
      if (p) {
        p.innerHTML =
          "Not able to upload.<br /> <small>May be due to rejection of transection or, trying to upload a previously uploaded meme<small>";
      }
      setUploading(false);
      return;
    }
  };

  // const handelSubmit = (e) => {
  //   //  e.preventDefault();
  //   //  e.stopPropagation();
  //   //   e.nativeEvent.stopImmediatePropagation();

  //   ipfs.add(buffer, (error, result) => {
  //     console.log(result);
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //   });
  // };

  useEffect(() => {
    if (account != null && memeFactoryContract != null) {
      setLoading(false);
    }
    console.log(account, memeFactoryContract);
  }, [account, memeFactoryContract]);

  return (
    <div>
      <div className="image-box">
        {loading && (
          <div className="loading-screen">
            <BiLoaderCircle className="loader" />
          </div>
        )}
        <img
          src={
            file ??
            "https://via.placeholder.com/150/000000/FFFFFF/?text=meme cash"
          }
          alt="jks"
          id="uploaded-img"
        />
      </div>
      <p id="error-in-meme"></p>
      <form>
        <div className=" ">
          <label className="new-button" htmlFor="upload">
            Chose Meme
          </label>

          <input type="file" id="upload" onChange={captureFile} />
          <button className="new-button" disabled={desableUpload} onClick={d}>
            {uploading && <BiLoaderCircle className="loader2" />}
            UPLOAD
          </button>
          {/* <input  type='submit'   /> */}
        </div>
      </form>
      <p id="error-in-uploading"></p>
    </div>
  );
}
export default Upload;
