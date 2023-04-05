/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./ListEvent.css"
import download from "../img/download.png"
import remove from "../img/trash.png"
import uploadfile from "../img/upload-file.png"
// import { createHash, timingSafeEqual } from 'crypto';
import { AES, enc} from 'crypto-js';


const ListEvent = () => {
   
  const [data, setData] = useState([])
  const [toggleFile, setToggleFile] = useState(false)
  const [videoFile,setVideoFile]=useState(null)
  const inputRef = useRef();
  const token =JSON.parse(localStorage.getItem('token'))
  const [upload, setUpload] = useState(0) 
  const localUserData =JSON.parse(localStorage.getItem('user'))
  

 
 
  const loadData = async () => {
    try {
      await axios.get("http://localhost:8000/api/event/list",{ headers: {"Authorization" : `Bearer ${token}`} }).then((res) => {
        setData(res.data.list)
      }).catch((error) => {
       console.log(error)
     })
   } catch (error) {
    }
  }
  

  useEffect(() => {  
    loadData()
  }, [])
  


 
  const downloadFile = async(id) => {
    await axios.get(`http://localhost:8000/api/event/downloads/${id}`,{ headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        console.log(response)
        //  const { encrypted,iv,downloadToken,fileName } = response.data;
         const { file,fileName } = response.data;
        //  Create a temporary link to initiate the download
        // const blob = new Blob([encrypted], { type: 'application/octet-stream' });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = fileName;
        // link.click();
        // // Cleanup the temporary link and URL object
        // link.remove();
        // URL.revokeObjectURL(url); 
        // Assuming AES encryption with a 256-bit key
        const key = 'ab23f57c7b1ec14e487e7c269ebdb9d3c3a45eeb10a8b184ec6d76d10c98a4e4';

         
        var bytes = AES.decrypt(file, key);
        var decryptedData = JSON.parse(bytes.toString(enc.Utf8));
        const blob = new Blob([decryptedData], { type: 'application/octet-stream' });
        console.log("decryptedData",decryptedData)
        // Create a temporary link to initiate the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        console.log("url",url)
        link.href = url;
        link.download = fileName;
        link.click();

        // Cleanup the temporary link and URL object
        link.remove();
        URL.revokeObjectURL(url);

        
        
      })
      .catch(error => {
        console.log(error);
      });
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
        setVideoFile(null)
        setData(res.data.data)
    })
      .catch((error) => {
        setToggleFile(false)
        setVideoFile(null)
      console.log("error", error);
    });
  };

  const deleteData = async (e) => {
    let data = {
      id: e
    };
    try {
      await axios.delete("http://localhost:8000/api/event/remove", {
        data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setData(res.data.data)
      }).catch((error) => {
        console.log("error", error);
      })
      
    } catch (error) {
      console.error(error);
    }
  };

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
                     
                      <div className='downloadIcon' onClick={(data)=>downloadFile(e._id)}>   
                        <img src={download} alt="" srcset="" />
                      <span class="tooltiptext">Download</span> 
                    </div>
                      
                  </div>
                </div>
              })
          }
            </div>
      </div>

     
    </div>
  )
}

export default ListEvent