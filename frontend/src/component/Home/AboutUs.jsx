import React from 'react';
import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import aboutUsImage1 from '../../assets/images/smiling-nutritionist-advises-young-patient-woman-proper-nutrition-dieting.jpg';
import aboutUsImage2 from '../../assets/images/plate.png';
import aboutUsImage3 from '../../assets/images/delivery-man-giving-groceries-order-customer.jpg';

const AboutUsCard = ({ imgSrc, altText, content, reverse }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
      className="w-full mb-10"
    >
      <Card className="w-full shadow-md">
        <CardContent className={`flex flex-col lg:flex-row justify-between items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className="lg:w-1/2 p-4">
            <img src={imgSrc} alt={altText} className="w-140 h-80 rounded-lg" />
          </div>
          <div className="lg:w-1/2 p-4">
            {content}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <section className=''>
      <AboutUsCard
        imgSrc={aboutUsImage1}
        altText="About Us"
        content={
          <>
            <p className='text-lg text-gray-600 mb-4'>
              FitEats is committed to delivering fast, nutritious meals that cater to your fitness goals. Our team of culinary experts and nutritionists work together to create balanced and delicious meals that not only taste great but also fuel your body.
            </p>
            <p className='text-lg text-gray-600 mb-4'>
              We believe in the importance of convenience without compromising on quality. Whether you're looking to maintain a healthy lifestyle, achieve fitness milestones, or simply enjoy a wholesome meal, FitEats is here to support your journey.
            </p>
          </>
        }
      />

      <AboutUsCard
        imgSrc={aboutUsImage2}
        altText="Our Story"
        content={
          <>
            <p className='text-lg text-gray-600 mb-4'>
              Our story began with a passion for health and a love for food. We noticed the challenges people face in balancing their busy lives with their desire to eat well. FitEats was born out of the need to bridge this gap, providing a seamless solution for nutritious meal delivery.
            </p>
            <p className='text-lg text-gray-600 mb-4'>
              From carefully sourced ingredients to meticulously crafted recipes, every step of our process is designed with your health and satisfaction in mind. Join us on this delicious journey and discover the convenience of eating well with FitEats.
            </p>
          </>
        }
        reverse={true}
      />

      <AboutUsCard
        imgSrc={aboutUsImage3}
        altText="Our Team"
        content={
          <>
            <p className='text-lg text-gray-600 mb-4'>
              Our dedicated team is the heart of FitEats. From chefs and nutritionists to delivery drivers and customer service, each member plays a vital role in ensuring you receive the best experience possible.
            </p>
            <p className='text-lg text-gray-600 mb-4'>
              We are constantly innovating and improving our services to meet your needs. Your health and satisfaction are our top priorities, and we are excited to be a part of your wellness journey.
            </p>
          </>
        }
      />
    </section>
  );
}

export default AboutUs;
