import React from 'react';
import { Card, Button } from '@mui/material';
import nutritionistImg from '../../assets/images/nutritionist.jpg';
import userImg from '../../assets/images/user.avif';
import restaurantImg from '../../assets/images/resowner.avif';
import adminImg from '../../assets/images/nutritionist.jpg';
import deliveryDriverImg from '../../assets/images/delivery.avif';

const cardData = [
  { img: userImg, title: 'User', description: 'Join our community and enjoy personalized services.', role: 'User' },
  { img: nutritionistImg, title: 'Nutritionist', description: 'Expert advice on your diet and health.', role: 'Nutritionist' },
  { img: restaurantImg, title: 'Restaurant', description: 'Partner with us to reach more customers.', role: 'Restaurant Owner' },
  { img: deliveryDriverImg, title: 'Delivery Driver', description: 'Deliver orders swiftly and earn rewards.', role: 'Delivery Driver' },

];

const RegistrationCard = ({ img, title, description, role }) => (
  <Card className='mb-4 w-[15rem] h-[28rem] mr-16 mt-10 transition-transform duration-300 ease-in-out transform hover:scale-105'>
    <div className='cursor-pointer relative'>
      <img className='w-full h-[17rem] rounded-t-md object-cover' src={img} alt={title} />
    </div>

    <div className='p-4 textPart lg:flex w-full flex-col justify-between'>
      <div className='space-y-1 mb-auto'>
        <p className='font-semibold text-lg'>{title}</p>
        <p className='text-gray-500 text-sm'>{description}</p>
      </div>

      <div className='mt-4'>
        <Button variant="contained" color="primary">
          Register as {role}
        </Button>
      </div>
    </div>
  </Card>
);

const CardList = () => (
  <div className='flex flex-wrap justify-around'>
    {cardData.map((card, index) => (
      <RegistrationCard key={index} img={card.img} title={card.title} description={card.description} role={card.role} />
    ))}
  </div>
);

export default CardList;
