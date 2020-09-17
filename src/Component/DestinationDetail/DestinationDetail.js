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
           <div style={{width:"40%",float: 'right'}}>
           <h1>This is Destination Detail:{destinationId}</h1>
    <h3>{name}</h3>
    <p>{description}</p>
           </div>
           <div style={{width:"30%"}}>
           <Form>
  <Form.Group controlId="formBasicOrigin">
    <Form.Label>Origin</Form.Label>
    <Form.Control type="text" placeholder="Enter origin" />
  </Form.Group>
 <Form.Group controlId="formBasicDestination">
    <Form.Label>Destination</Form.Label>
    <Form.Control type="text" placeholder="Destination" >
        
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <label for="from">From</label><br/>
  <input type="date" name="From" id=""/>
  <br/>
  <label for="to">to</label><br/>
  
     <input type="date" name="to" id=""/>
      <br></br>
  <Button style={{backgroundColor: "#F9A51A",
borderRadius: "5px",margin:" 10px 0", color: "white"}}S>
   <Link to='/roominfo'>Booking  </Link>
  </Button>
</Form>

           </div>
        </div>
    );
};

export default DestinationDetail;