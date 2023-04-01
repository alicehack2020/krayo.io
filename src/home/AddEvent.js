import { useState, useRef, useEffect } from "react";
import React from 'react'
import axios from "axios";
import "./DrageDrop.css"
import uploadfile from "../img/upload-file.png"
import { useNavigate } from "react-router-dom";
const AddEvent = () => {
  const [files, setFiles] = useState(null);
  const [videoFile,setVideoFile]=useState(null)
  const inputRef = useRef();
  const token =JSON.parse(localStorage.getItem('token'))
  const [upload, setUpload] = useState(0) 
  const navigation = useNavigate()
  const setData = (event) => {
    console.log("event.target",event.target)
    setFiles(URL.createObjectURL(event.target.files[0]))
    setVideoFile(event.target.files[0])

  }
     
  useEffect(() => {
    if (videoFile)
    {
      handleUpload()
    }
    
  },videoFile)
  
  // send files to the server 
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", videoFile);
    
  
    await axios.post(
      "http://localhost:8000/api/event/add",
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        onUploadProgress: (data) => {
          setUpload(Math.floor((data.loaded / data.total) * 100));
        },
      }
    )
      .then((res) => {
        setFiles(null)
        navigation("/list")
      console.log(res)
    })
    .catch((error) => {
      console.log("error", error);
    });
  };
  
  
  if (files) return (
    <div className="main">
      <div className="demo-css">
          <div className="progress">
          <div className="progress-wrapper" >
            <div className="progress-inner" style={{ width: `${upload}%` }} ></div>
          </div>
          <div className="progress-info" >{upload}%</div>
        </div>
      </div> 
     </div>  
    
  )

  return (
    <>
       
      <div>
      <input 
            type="file"
            multiple
            onChange={(event) => setData(event)}
            hidden
            ref={inputRef}
        />
        <div className='downloadIcon' onClick={() => inputRef.current.click()}> 
              <img src={uploadfile} alt="" />
              <span class="tooltiptext">Select Files</span> 
        </div>
       </div>
    </>
  );
};

export default AddEvent;

 