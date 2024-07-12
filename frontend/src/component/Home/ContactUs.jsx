import React from 'react';
import { motion } from 'framer-motion';
import contactimg from '../../assets/images/contact-us-communication-support-service-assistance-concept.jpg';


const ContactUs = () => {
  return (
    <div className='contact-us px-5 lg:px-20 py-10'>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
        Contact Us
      </h2>
      <p className='text-lg text-gray-600 mb-6'>
        We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to give feedback, feel free to reach out.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col lg:flex-row items-center justify-between mb-10'
      >
        <div className='lg:w-1/2 p-4'>
          <img src={contactimg} alt='Contact Us' className='w-full h-auto rounded-lg shadow-md' />
        </div>
        <div className='lg:w-1/2 p-4'>
          <h3 className='text-xl font-semibold text-gray-800 mb-3'>Get in Touch</h3>
          <p className='text-lg text-gray-600 mb-4'>
            Have questions or feedback? Send us a message, and we'll get back to you as soon as possible.
          </p>
          <form className='flex flex-col space-y-4'>
            <input type='text' placeholder='Your Name' className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500' />
            <input type='email' placeholder='Your Email' className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500' />
            <textarea placeholder='Your Message' rows={5} className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500'></textarea>
            <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300'>
              Send Message
            </button>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col lg:flex-row items-center justify-between'
      >
        <div className='lg:w-1/2 p-4 order-last lg:order-first'>
          <h3 className='text-xl font-semibold text-gray-800 mb-3'>Visit Us</h3>
          <p className='text-lg text-gray-600 mb-4'>
            Drop by our office during business hours. We'd love to meet you in person!
          </p>
          <p className='text-lg text-gray-600 mb-4'>
            Address: 123 Main Street, City, Country
          </p>
          <p className='text-lg text-gray-600'>
            Phone: +123 456 789
          </p>
        </div>
        <div className='lg:w-1/2 p-4'>
          <img src='/path/to/your/map-image.jpg' alt='Map' className='w-full h-auto rounded-lg shadow-md' />
        </div>
      </motion.div>
    </div>
  );
}

export default ContactUs;
