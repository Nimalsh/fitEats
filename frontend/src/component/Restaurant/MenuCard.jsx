import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Initialize as an array
  const [totalCeleryValue, setTotalCeleryValue] = useState(50); // Example starting celery value
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleAddItemToCart=(e)=>{
    e.preventDefault()
    const reqData = {
      token:localStorage.getItem("jwt"),
      cartItem:{
        foodId:item.id,
        quantity:1,
        ingredients:selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    navigate("/cart")
    console.log(reqData)
  };

  const handleCheckBoxChange = (itemName) => {
    console.log("value",itemName)
    if(selectedIngredients.includes(itemName)){
      setSelectedIngredients(
selectedIngredients.filter((item)=>item!==itemName)
      );
    }else{
      setSelectedIngredients([...selectedIngredients,itemName]);
    }

  }


  // const handleCheckBoxChange = (ingredient) => {
  //   setSelectedIngredients((prevCounts) => {
  //     const isSelected = prevCounts[ingredient.name];
  //     const newCounts = {
  //       ...prevCounts,
  //       [ingredient.name]: !isSelected,
  //     };
  //     const celeryChange = isSelected ? -ingredient.celeryValue : ingredient.celeryValue;
  //     setTotalCeleryValue((prevValue) => prevValue + celeryChange);
  //     return newCounts;
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected ingredients:", selectedIngredients);
    console.log("Total celery value:", totalCeleryValue);
    navigate('/cart');
  };

  const handleNutritionContentClick = () => {
    const encodedFoodName = encodeURIComponent(item.name);
    localStorage.setItem('Item', JSON.stringify({ name: item.name, images: item.images }));
    const quantity = 1; 
    navigate(`/nutrition-content/${quantity} ${encodedFoodName}`);
  };

  const categorizedIngredients = categorizeIngredients(item.ingredients);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between'>
          <div className='lg:flex items-center lg:gap-5'>
            <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} alt={item.name} />
          </div>
          <div className='space-y-1 lg:space-y-5 lg:max-w-2xl lg:ml-5'>
            <p className='font-semibold text-xl'>{item.name}</p>
            <p>{item.price}</p>
            <p className='text-gray-400'>{item.description}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className='flex gap-5 flex-wrap'>
            {Object.keys(categorizedIngredients).map((category) => (
              <div key={category}>
                <p className='font-bold mb-2'>{category}</p>
                <FormGroup>
                  {categorizedIngredients[category].map((ingredient) => (
                    <FormControlLabel
                      key={ingredient.id}
                      control={<Checkbox onChange={() => handleCheckBoxChange(ingredient.name)} />}
                      label={`${ingredient.name}`}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className='pt-5 flex items-center justify-end gap-4'>
          <Button 
              variant='contained'
              type="button"
              onClick={handleAddItemToCart} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md uppercase font-semibold text-sm"
            >
              Add to Cart
            </Button>
            <Button
          variant="contained"
          type="button"
          onClick={handleNutritionContentClick}
          style={{ backgroundColor: '#3e6606', color: '#fff' }}
        >
          NUTRITION CONTENT
        </Button>


            
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;

export const categorizeIngredients = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {
    const categoryName = ingredient.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(ingredient);
    return acc;
  }, {});
};
