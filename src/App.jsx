import { useState } from 'react'
import {useRef} from 'react'
import { drawMesh } from "./utilities.js";
import reactLogo from './assets/react.svg'
import './App.css'
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh" 
import Webcam from "react-webcam";
function App() {
  const webcamRef=useRef(null);
  const canvasRef=useRef(null);
  
  const runFacemesh=async()=>{
    const net=await facemesh.load(
      {input:video}
    );
    setInterval(() => {
      detect(net);
    }, 10);
  }
  const detect=async (net)=>{
    if(
      typeof webcamRef.current!=="undefined" &&
      webcamRef.current!==null &&
      webcamRef.current.video.readyState===4
    ){
      const video=webcamRef.current.video;
      const videoWidth=webcamRef.current.video.videoWidth;
      const videoHeight=webcamRef.current.video.videoHeight;

      webcamRef.current.video.width=videoWidth;
      webcamRef.current.video.height=videoHeight;

      canvasRef.current.width=videoWidth;
      canvasRef.current.height=videoHeight;

      const face = await net.estimateFaces({input:video});
      console.log(face);

 
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
    
  };
  useEffect(()=>{runFacemesh()}, []);
  return (
    <div className="App">
      <header>
      <Webcam 
      ref={webcamRef}
      style={{
        position:"relative",
        marginLeft:"auto",
        marginRight:"auto",
        left:0,
        right:0,
        textAlign:'center',
        zIndex:9,
        width:1000,
        height:480,
      }}/>
      <canvas 
      ref={canvasRef}
      style={{ position:"relative",
      marginLeft:"auto",
      marginRight:"auto",
      left:0,
      right:0,
      textAlign:'center',
      zIndex:9,
      width:1000,
      height:480.
        
      }}/>
    </header>
    </div>
  );
    }

export default App
