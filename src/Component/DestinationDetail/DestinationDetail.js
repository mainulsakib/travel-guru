import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fakeData from '../../FakeData';


const DestinationDetail = () => {

    const {destinationId}=useParams()
    let idValue=parseInt(destinationId)
    let result=fakeData.map(value=>{
        if (value.id===idValue){
              return value;
              
        }
        return null ;
    })
  const{name,description}=result[destinationId-1]
    
    return (
        <div style={{color: 'white'}}>
           <div style={{width:"40%",float: 'left',padding:'20px'}}>
         
    <h3>{name}</h3>
    <p>{description}</p>
           </div>
           <div style={{width:"50%",float: 'right'}}>
           <Form style={{border:"1px solid black",backgroundColor:"white",margin:'20px',padding:'20px',color:"black",borderRadius:"4px"}}>
  <Form.Group controlId="formBasicOrigin">
    <Form.Label>Origin</Form.Label>
    <Form.Control type="text" placeholder="Enter origin" />
  </Form.Group>
 <Form.Group controlId="formBasicDestination">
    <Form.Label>Destination</Form.Label>
    <Form.Control type="text" placeholder="Destination" >
        
    </Form.Control>
  </Form.Group>
  
  <label for="from">From: </label>
  <input type="date" name="From" id=""/>

  <label for="to">to:</label>
  
     <input type="date" name="to" id=""/>
      <br></br>
  <Button style={{backgroundColor: "#F9A51A",
borderRadius: "5px",margin:" 10px 0", color: "white",width:'100%'}}S>
   <Link style={{textDecoration: "none",color: "white"}} to='/roominfo'>Booking  </Link>
  </Button>
</Form>

           </div>
        </div>
    );
};

export default DestinationDetail;