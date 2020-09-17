import React from 'react';
import fakeData from '../../FakeData';


import SlidingSection from '../SlidingSection/SlidingSection';

const Home = () => {
    return (
        <div>
              {
                fakeData
                .map(fake=><SlidingSection fakeData={fake}></SlidingSection> )
            }
            
        </div>
    );
};

export default Home;