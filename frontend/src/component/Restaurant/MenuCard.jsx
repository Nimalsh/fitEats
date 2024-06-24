import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const demo = [
  {
    category: "Nuts & seeds",
    ingredients: ["Cashews"]
  },
  {
    category: "Protein",
    ingredients: ["Ground beef", "Bacon strips", "Chicken breast", "Turkey patty"]
  },
  {
    category: "Dairy",
    ingredients: ["Cheddar cheese", "Swiss cheese", "Blue cheese", "Mozzarella"]
  },
  {
    category: "Vegetables",
    ingredients: ["Lettuce", "Tomato", "Onion", "Pickles", "Avocado", "Mushrooms"]
  },
  {
    category: "Condiments",
    ingredients: ["Ketchup", "Mustard", "Mayonnaise", "BBQ sauce", "Ranch dressing"]
  },
  
];


const MenuCard = () => {

const handleCheckBoxChange=(value)=>{
console.log(value)
}

  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className='lg:flex items-center justify-between'>
            <div className='lg:flex items-center lg:gap-5'>
              <img className='w-[7rem] h-[7rem] object-cover' src='https://cdn.pixabay.com/photo/2022/08/29/17/44/burger-7419419_1280.jpg' alt=''/>
            </div>

            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl lg:ml-5'>
              <p className='font-semibold text-xl'>Burger</p>
              <p>LKR 499</p>
              <p className='text-gray-400'>A burger is a sandwich with a ground meat patty, typically beef, placed in a bun with toppings like lettuce, tomato, and cheese. It's a popular fast food item often served with fries.</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className='flex gap-5 flex-wrap'>
              {
                demo.map((item)=>
                  <div>
                    <p>{item.category}</p>
                  <FormGroup>
                  {item.ingredients.map((item)=> <FormControlLabel 
                  control={<Checkbox onChange={()=>handleCheckBoxChange(item)} />} label={item} />)}
                  
                  </FormGroup>
                  </div>
                 )
              }

            </div>

            <div className='pt-5'>
              <Button variant='contained' disabled={false} type="submit">{true?"Add to Cart":"Out Of Stock"}</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
  )
}

export default MenuCard