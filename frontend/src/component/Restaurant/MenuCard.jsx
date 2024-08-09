import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Demo data, this should ideally be passed in as props or fetched from a server


const MenuCard = ({ item }) => {
  const {auth,restaurant,menu}=useSelector(store=>store);
  const [initialCeleryValue] = useState(50); // Assume the initial celery value of the food
  const [ingredientCounts, setIngredientCounts] = useState({});
  const [totalCeleryValue, setTotalCeleryValue] = useState(initialCeleryValue);
  const navigate = useNavigate(); 

  const handleCheckBoxChange = (ingredient) => {
    setIngredientCounts((prevCounts) => {
      const isSelected = prevCounts[ingredient.name];
      const newCounts = {
        ...prevCounts,
        [ingredient.name]: !isSelected,
      };
      const celeryChange = isSelected ? -ingredient.celeryValue : ingredient.celeryValue;
      setTotalCeleryValue((prevValue) => prevValue + celeryChange);
      return newCounts;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected ingredients:", ingredientCounts);
    console.log("Total celery value:", totalCeleryValue);
    navigate('/cart');
  };


  const handleNutritionContentClick = () => {
    const encodedFoodName = encodeURIComponent(item.name);
    localStorage.setItem('Item', JSON.stringify({ name: item.name, images: item.images }));
    const quantity = 1; // Default weight/quantity
    navigate(`/nutrition-content/${quantity} ${encodedFoodName}`);
  };
  
  

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between'>
          <div className='lg:flex items-center lg:gap-5'>
            <img className='w-[7rem] h-[7rem] object-cover' src={item.images} alt='' />
          </div>
          <div className='space-y-1 lg:space-y-5 lg:max-w-2xl lg:ml-5'>
            <p className='font-semibold text-xl'>{item.name}</p>
            <p>{item.price}</p>
            <p className='text-gray-400'>{item.description}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-5 flex-wrap'>
            {Object.keys(categorizeIngredients(item.ingredients)).map((category) => (
              <div key={category}>
                <p>{category}</p>
                <FormGroup>
                  {categorizeIngredients(item.ingredients)[category].map((ingredient) => (
                    <FormControlLabel
                      key={`${category}-${ingredient.name}`}
                      control={<Checkbox onChange={() => handleCheckBoxChange(ingredient)} />}
                      label={`${ingredient.name} (+${ingredient.celeryValue})`}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className='pt-5 flex items-center justify-end gap-4'>
            <Button variant='contained' type="submit">Add to Cart</Button>
            <Button
              variant='contained'
              type="button"
              onClick={handleNutritionContentClick} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md uppercase font-semibold text-sm"
            >
              NUTRITION CONTENT
            </Button>
            <div className='bg-red-900 text-white px-4 py-2 rounded-md shadow-md'>
              <h3 className='font-semibold'>Total Celery Value: {totalCeleryValue}</h3>
            </div>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;

// Helper function to categorize ingredients
export const categorizeIngredients = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {
    const { category } = ingredient;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {});
};
