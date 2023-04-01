import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./ListEvent.css"
import download from "../img/download.png"
import AddEvent from './AddEvent'
const ListEvent = () => {
   
  const [data, setData] = useState([])
 
   
  
  const localUserData =JSON.parse(localStorage.getItem('user'))
  const token =JSON.parse(localStorage.getItem('token'))
  

 
 
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
  },[])
 
  const downloadFile = (e) => {
    const url = e.url;
    console.log(url)
    window.location.href = url

  }

  return (
    <div className='list_Main'>
      <div className='uploadSection'>
        
        <p>
          Hi {localUserData?.name} welcome to Krayo.io
        </p>
        <AddEvent/>
      </div>
 
      <div className='list_event_filter_main'>
        
            <div className='event_list_Main'>
            {
              data.map((e) => {
                return <div className='CardDiv'>
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