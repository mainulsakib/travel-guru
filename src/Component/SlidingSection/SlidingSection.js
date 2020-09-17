import React from 'react';
import { Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';



const SlidingSection = (props) => {
    const {name,image,description,id}=props.fakeData

    return (
        <div>
            <Card style={{ width: '18rem' ,float: 'left' ,margin: '60px', height: '100px',opacity:"10"}}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button style={{backgroundColor: "#F9A51A",
borderRadius: "5px", color: "white"}}><Link to={`/destination/${id}`}> Booking </Link></Button>
        </Card.Body>
      </Card>
  </div>
    );
};

export default SlidingSection;