import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const demo = [
  {
    category: "Nuts & seeds",
    ingredients: [
      { name: "Cashews", celeryValue: 5 }
    ]
  },
  {
    category: "Protein",
    ingredients: [
      { name: "Ground beef", celeryValue: 20 },
      { name: "Bacon strips", celeryValue: 15 },
      { name: "Chicken breast", celeryValue: 25 },
      { name: "Turkey patty", celeryValue: 18 }
    ]
  },
  {
    category: "Dairy",
    ingredients: [
      { name: "Cheddar cheese", celeryValue: 10 },
      { name: "Swiss cheese", celeryValue: 12 },
      { name: "Blue cheese", celeryValue: 8 },
      { name: "Mozzarella", celeryValue: 10 }
    ]
  },
  {
    category: "Vegetables",
    ingredients: [
      { name: "Lettuce", celeryValue: 2 },
      { name: "Tomato", celeryValue: 3 },
      { name: "Onion", celeryValue: 1 },
      { name: "Pickles", celeryValue: 2 },
      { name: "Avocado", celeryValue: 5 }
    ]
  },
  {
    category: "Condiments",
    ingredients: [
      { name: "Ketchup", celeryValue: 1 },
      { name: "Mustard", celeryValue: 1 },
      { name: "Mayonnaise", celeryValue: 2 },
      { name: "BBQ sauce", celeryValue: 3 }
    ],
    
  },
];

const MenuCard = () => {
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
    // Navigate to the nutrition content component
    navigate('/nutrition-content');
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
            <img className='w-[7rem] h-[7rem] object-cover' src='https://cdn.pixabay.com/photo/2022/08/29/17/44/burger-7419419_1280.jpg' alt='' />
          </div>
          <div className='space-y-1 lg:space-y-5 lg:max-w-2xl lg:ml-5'>
            <p className='font-semibold text-xl'>Burger</p>
            <p>LKR 499</p>
            <p className='text-gray-400'>A burger is a sandwich with a ground meat patty, typically beef, placed in a bun with toppings like lettuce, tomato, and cheese. It's a popular fast food item often served with fries.</p>
           
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-5 flex-wrap'>
            {demo.map((category) => (
              <div key={category.category}>
                <p>{category.category}</p>
                <FormGroup>
                  {category.ingredients.map((ingredient) => (
                    <FormControlLabel
                      key={ingredient.name}
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
              type="submit"
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
}

export default MenuCard;
