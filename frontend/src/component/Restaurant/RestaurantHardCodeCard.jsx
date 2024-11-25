import React from 'react';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../config/logic';

const RestaurantHardCodeCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleCardClick = () => {
    navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`); // Adjust the path to your restaurant details page
  };

  const jwt = localStorage.getItem("jwt");
  const handleAddToFavorite = () => {
    dispatch(addToFavorites({ restaurantId: item.id, jwt }));
  };

  return (
    <Card className="mb-4 w-[18rem]">
      <div className={`relative ${item.open ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[0]}
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
          <p onClick={handleCardClick} className="font-semibold text-lg cursor-pointer">{item.name}</p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>

        <div>
          <IconButton onClick={handleAddToFavorite}>
         <FavoriteIcon /> 
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantHardCodeCard;
