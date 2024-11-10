import React from 'react';
import { Button, Card } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className='flex gap-5 w-64 h-64 p-5'>
      <HomeIcon />
      <div className='space-y-3 text-gray-500'>
        <h1 className='font-semibold text-lg text-white'>Home</h1>
        <p>{`${item?.streetAddress || 'Street'}, ${item?.city || 'City'}, ${item?.state || 'State'}, ${item?.postalCode || 'Postal Code'}, ${item?.country || 'Country'}`}</p>
        {showButton && (
          <Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};
