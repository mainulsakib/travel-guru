import React from 'react';
import { Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';


const SlidingSection = (props) => { 
    const {name,image,id}=props.fakeData
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
    return (
      <Swiper style={{float: 'left',width:'30%'}}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide >
        
        <img style={{height:'80vh',float: 'left'}} src={image} alt=""/>
      </SwiperSlide>
  
    </Swiper>
    



//         <div style={{color: 'white'}}>
//             <Card style={{ width: '18rem' ,float: 'left' ,margin: '60px', height: '100px',opacity:"10"}}>
//         <Card.Img variant="top" src={image} />
//         <Card.Body>
//           <Card.Title>{name}</Card.Title>
//           <Button style={{backgroundColor: "#F9A51A",
// borderRadius: "5px", color: "white"}}><Link style={{textDecoration: "none",color: "white"}} to={`/destination/${id}`}> Booking </Link></Button>
//         </Card.Body>
//       </Card>
  // </div>
    );
};

export default SlidingSection;