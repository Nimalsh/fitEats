import React from 'react';
import "./Home.css"
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import RegistrationCard from './RegistrationCard';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';


const Restaurant=[1]
const Home = () => {
  
  return (
    <div>
      <section className='banner flex flex-col justify-center items-center'>
        <div className='cover'></div>
        
        <div className='text-container'>
          <p className='text-title'>FitEats</p>
          <p className='text-subtitle'>Savor the Convenience: Fast, Nutritious Meals Delivered with Fitness in Mind</p>
        </div>

        <div className='cover absolute top-0 left-0 right-0'>

        </div>

        <div className='fadout'>
          
        </div>
      </section>


      <section className='p-10 lg:py-10 lg:px-20'>
        <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>
          Top Meels
        </p>
        <MultiItemCarousel/>
      </section>

      <section className='p-10 lg:py-10 lg:px-20'>
        <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>
          About US
        </p>
        <AboutUs/>
      </section>


      <section className='px-5 lg:px-20'>
        <h1 className='text-2xl font-semibold text-gray-400 py-3'>
        Join with Our Platform
        </h1>
        <div className='flex flex-wrap item-center justify-around grap-5'>
          {
            Restaurant.map((item)=><RegistrationCard/>)
          }
        </div>
      </section>

      <section className='p-10 lg:py-10 lg:px-20'>
        
        <ContactUs/>
      </section>

    </div>
  );
}

export default Home;
