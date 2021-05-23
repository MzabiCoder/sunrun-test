 import './App.css';
 import React,{useState,useEffect} from 'react'
 import axios from 'axios'
 import Moment from 'react-moment';


const  App=()=> {

  const [items,setItems]=useState([])
  useEffect(()=>{
    const fetch_data= async ()=>{
const {data:{data}}=await axios('https://api-v3.mbta.com/schedules?filter%5Bmin_time%5D=14%3A00&filter%5Bmax_time%5D=14%3A30&filter%5Bstop%5D=place-north')
     setItems(data.filter(item=>item.id.includes('CR-')));
}
    fetch_data()
    },[])

  return (
    <div className="App">
     <section className="label">
      <p>Destination</p>
      <p>Arrival</p>
      </section>
      {items.map(item=>{
     return (
        <div className="output">
        <p>{String(item.relationships.route.data.id).replace(/CR-/gi,'')}</p>
         <p>{String(String(item.attributes.arrival_time).match(/T\w+:\w+/gi)).replace(/T/,'')==='null' ? 'NOT AVAILABLE':  String(String(item.attributes.arrival_time).match(/T\w+:\w+/gi)).replace(/T/,'')}{' '}<span>{!Number(String(String(item.attributes.arrival_time).match(/T\w+:\w+/gi)).replace(/T/,'').slice(0,2)) ? null :Number(String(String(item.attributes.arrival_time).match(/T\w+:\w+/gi)).replace(/T/,'').slice(0,2)) > 13 ? 'PM':'AM'}</span></p>
         </div>)
       
      })}
     
    </div>
  );
}

export default App;
