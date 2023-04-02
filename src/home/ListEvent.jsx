import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./ListEvent.css"
import download from "../img/download.png"
import remove from "../img/trash.png"
import { useNavigate } from 'react-router-dom'
import uploadfile from "../img/upload-file.png"

const ListEvent = () => {
   
  const [data, setData] = useState([])
  const [toggleFile, setToggleFile] = useState(false)
  const [videoFile,setVideoFile]=useState(null)
  const inputRef = useRef();
  const token =JSON.parse(localStorage.getItem('token'))
  const [upload, setUpload] = useState(0) 
  const navigation = useNavigate()
  const localUserData =JSON.parse(localStorage.getItem('user'))
  const [loadApiCall, setLoadApiCall]=useState(false)
  

 
 
  const loadData = async () => {
    try {
      await axios.post("http://localhost:8000/api/event/list", {},{ headers: {"Authorization" : `Bearer ${token}`} }).then((res) => {
        setData(res.data.list)
      }).catch((error) => {
       console.log(error)
     })
   } catch (error) {
    }
  }
  

  useEffect(() => {  
    loadData()
  },[toggleFile,loadApiCall])
 
  const downloadFile = (e) => {
    const url = e.url;
    console.log(url)
    window.location.href = url
  }

  useEffect(() => {
    if (videoFile)
    {
      handleUpload()
    }
    
  }, videoFile)
  
  const setFileData = (event) => {
    setVideoFile(event.target.files[0])
  }
  
  // send files to the server 
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", videoFile);
    
    setToggleFile(true) 
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
        setToggleFile(false) 
        navigation("/list")
      console.log(res)
    })
      .catch((error) => {
        setToggleFile(false) 
      console.log("error", error);
    });
  };

  const deleteData = async (e) => {
    let data = {
      id:e
    }
    try {
      await axios.post("http://localhost:8000/api/event/remove", data, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setLoadApiCall(!loadApiCall) 
      }).catch((error) => {
     })
   } catch (error) {
    }
  }
  

  return (
    <div className='list_Main'>
      <div className='uploadSection'>
        
        <p>
          Hi {localUserData?.name} welcome to Krayo.io
        </p>
        {
          toggleFile ? <>
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
          </> : <>
          <div>
      <input 
            type="file"
            multiple
            onChange={(event) => setFileData(event)}
            hidden
            ref={inputRef}
        />
        <div className='downloadIcon' onClick={() => inputRef.current.click()}> 
              <img src={uploadfile} alt="" />
              <span className="tooltiptext">Select Files</span> 
        </div>
       </div>
         </> 
        }
      </div>
 
      <div className='list_event_filter_main'>
             
            <div className='event_list_Main'>
            {
              data.map((e) => {
                return <div className='CardDiv'>
                  <div className='deleteDiv' onClick={()=>deleteData(e._id)}>
                      <img src={remove} alt="" srcset="" className='deleteIcon' />
                  </div> 
                  <div className='generalFlex'>
                 
                    <p>{e.fileName}</p>
                    <a href={e.url} download="file">  
                      <div className='downloadIcon' onClick={(e)=>downloadFile(e)}>   
                        <img src={download} alt="" srcset="" />
                          <span class="tooltiptext">Download</span> 
                      </div>
                    </a>
                  </div>
                  {/* <p>video</p> */}
                </div>
              })
          }
            </div>
      </div>

     
    </div>
  )
}

export default ListEvent