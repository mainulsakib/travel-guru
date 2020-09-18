import React from 'react';
import hotel from '../../Hotel';
import GoogleMapReact from 'google-map-react';
import Map from '../Map/Map';
 

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const RoomInfo = () => {
    let hotelRes= hotel.map(res=>{return res})
        console.log(hotelRes.name)
    return (
        <div style={{color: 'white'}}>
           <h1> Stay in Cox's Bazar</h1> 
           <div style={{width:"40%",height:"80%", float: 'left'}}>
            { 
                    hotel.map(res=><div style={{border: '1px solid'}}>
                     
                          <img style={{width:"100px",height:'220px',float :"left"}} src={res.image} alt=""/>
                     
                      <div style={{width:"100px",height:"100px"}}>
                      <p>{res.name}</p>
                    <p>{res.guest}</p>
                    <p>{res.facility}</p>
                    <p>{res.cancel}</p>
                    <p>{res.rating}</p>
                    <p>{res.price}</p>
                      </div>
                    </div>  )
            }
           </div>
           <div style={{width: '50%',float: 'right'}}>
         <Map></Map>
           </div>
        </div>
    );
};

export default RoomInfo;