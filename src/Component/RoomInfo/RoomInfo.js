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
           <div>
            { 
                    hotel.map(res=><div>
                        <h1>{res.name}</h1>
                    <p>{res.guest}</p>
                    <p>{res.facility}</p>
                    <p>{res.cancel}</p>
                    <p>{res.rating}</p>
                    <p>{res.price}</p>
                    </div>  )
            }
           </div>
           <div>
         <Map></Map>
           </div>
        </div>
    );
};

export default RoomInfo;