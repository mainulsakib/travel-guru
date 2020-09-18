import React from 'react';
import hotel from '../../Hotel';
import Map from '../Map/Map';

const RoomInfo = () => {
    let hotelRes= hotel.map(res=>{return res})
        console.log(hotelRes.name)
    return (
        <div style={{color: 'white'}}>
           <h1> Your living Place</h1> 
           <div style={{width:"40%",height:"100%", float: 'left',backgroundColor:'white',color: 'black'}}>
            { 
                    hotel.map(res=><div style={{border: '1px solid',height:"100%",margin: '2px 0px'}}>
                      <img style={{width:"40%",height:'100%',float: 'left'}} src={res.image} alt=""/>
                      <div style={{color: 'black',fontSize:'small',padding:'0px',margin:'0px'}}>
                      <h6  style={{margin:'0px',padding:'0px'}}>Name:{res.name}</h6>
                    <p style={{margin:'0px',padding:'0px'}}>Description:{res.guest}</p>
                    <p style={{margin:'0px',padding:'0px'}}>facility: {res.facility}</p>
                    <p style={{margin:'0px',padding:'0px'}}>cancel: {res.cancel}</p>
                    <p>Rating: {res.rating}</p>
                    <p>Price:$ {res.price}</p>
                      </div>
                    </div>  )
            }
           </div>
           <div style={{width: '50%',height: '50%',float: 'right',borderRadius:"9px"}}>
         <Map></Map>
           </div>
        </div>
    );
};

export default RoomInfo;