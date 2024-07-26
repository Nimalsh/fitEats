import { Card, Chip, IconButton } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, addToFavorites } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../config/logic';
import { store } from '../State/store';

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store)
  const handleCardClick = () => {
    navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`); // Adjust the path to your restaurant details page
  };

  const jwt=localStorage.getItem("jwt")
  const handleAddToFavorite=()=>{
    dispatch(addToFavorites({restaurantId:item.id,jwt}))
  }

  return (
    <Card className="mb-4 w-[18rem]" >
      <div className={`relative ${item.open ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[2]}
          alt=""
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? 'success' : 'error'}
          label={item.open ? 'open' : 'closed'}
        />
      </div>

      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p onClick={handleCardClick} className="font-semibold text-lg cursor-pointer" >{item.name}</p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>

        <div>
          <IconButton onClick={handleAddToFavorite}>
            {isPresentInFavorites(auth.favorites,item) ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;


/*import { Card, Chip, IconButton } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const RestaurantCard = () => {
  const isOpen = true; // Replace with your logic to determine if the restaurant is open
  const isFavorite = true; // Replace with your logic to determine if the restaurant is a favorite

  return (
    <Card className='w-[18rem]'>
      <div className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
        <img 
          className='w-full h-[10rem] rounded-t-md object-cover' 
          src="https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg" 
          alt='Restaurant'
        />
        <Chip 
          size='small' 
          className='absolute top-2 left-2'
          color={isOpen ? 'success' : 'error'}
          label={isOpen ? 'open' : 'closed'}
        />
      </div>

      <div className='p-4 textPart lg:flex w-full justify-between'>
        <div className='space-y-1'>
          <p className='font-semibold text-lg'>Indian Fast food</p>
          <p className='text-gray-500 text-sm'>
            Craving it all? Dive into our goal fla...
          </p>
        </div>

        <div>
          <IconButton>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
*/