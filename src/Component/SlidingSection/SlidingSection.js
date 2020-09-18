import React from 'react';
import { Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';



const SlidingSection = (props) => {
    const {name,image,id}=props.fakeData

    return (
        <div style={{color: 'white'}}>
            <Card style={{ width: '18rem' ,float: 'left' ,margin: '60px', height: '100px',opacity:"10"}}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button style={{backgroundColor: "#F9A51A",
borderRadius: "5px", color: "white"}}><Link style={{textDecoration: "none",color: "white"}} to={`/destination/${id}`}> Booking </Link></Button>
        </Card.Body>
      </Card>
  </div>
    );
};

export default SlidingSection;