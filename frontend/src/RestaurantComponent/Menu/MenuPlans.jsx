import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import BackgroundImage from '../../assets/images/Background_image.png';

// Example meal plan data mapped by ID
const mealPlans = {
  1: {
    Monday: {
      Breakfast: "3 scrambled eggs, 1 wheat toast, 1 nonfat Greek Yogurt, 1/4 cup blueberries",
      Lunch: "4 ounces chicken breast, 2 chopped lettuce, 1/4 cup strawberries, 1 cup nonfat milk",
      Dinner: "4 ounces chicken breast, 1 small baked potato, 1 cup steamed mixed vegetables, 1 medium apple",
    },
    Tuesday: {
      Breakfast: "1/3 cup dry oats, 4 scrambled egg whites, 1 ounce slivered almonds, 1 medium apple",
      Lunch: "4 ounces boiled tuna , 1 tablespoon olive oil, 16 thin wheat crackers, 1 scoop whey",
      Dinner: "6 chicken breast, 1 cup steamed broccoli,1 tablespoon olive oil, 1 medium apple"
    },
    Wednesday: {
      Breakfast: "6 cottage cheese, 1/4 cup pineapple chunks, 1-ounce cashew pieces, 1/2 cup guacamole, 1 red bell pepper ",
      Lunch: "6 ounces roasted turkey deli meat, 1 slice provolone cheese, 1 (6-7 inch) flour tortilla or wrap, 1 cup sliced carrots",
      Dinner: "6 ounces 97% lean ground beef burger, 1 slider-size hamburger bun, 2 slices tomato, 2 lettuce leaves, 1 tablespoon ketchup",
    },
    Thursday: {
      Breakfast: "1 serving Oatmeal Cottage Cheese Waffles, 1/2 cup raspberries, 2 large hard-boiled eggs, 1 part-skim mozzarella string cheese, 1 cup grapes",
      Lunch: "6 ounces grilled chicken breast, 2 cups romaine lettuce, 1/4 cup corn kernels, 1/4 avocado, 1 tablespoon lime juice",
      Dinner: "6 ounces 99% fat-free ground turkey breast, sautéed in 1 teaspoon olive oil, 2 cups steamed zucchini noodles",
    },
    Friday: {
      Breakfast: "1 scoop whey protein powder, 1 small frozen banana, 1 tablespoon peanut butter, 1 cup nonfat milk",
      Lunch: "4 ounces deli roast beef, 1 slice provolone cheese, 1 slice rye bread, 2 slices red onion, 2 slices tomato",
      Dinner: "4 chicken breast, 1/2 cup cooked brown rice, 1 tablespoon butter, 1 cup steamed mixed vegetables",
    },
    Saturday: {
      Breakfast: "1/3 cup dry oatmeal, 2 nonfat Greek yogurt, 1 scoop protein powder, dash salt, 1/4 cup nonfat milk",
      // Add lunch and dinner for Saturday if needed
    },
    // Add other days if needed
  },
  // Add other meal plans if needed
};

const mealSections = ["Breakfast", "Lunch", "Dinner"];

const MealPlanTile = ({ meal }) => {
  const mealsArray = meal
    ? meal.split(', ').map((item, index) => (
      <Typography key={index} variant="body1" sx={{ color: 'white' }}>
        {item}
      </Typography>
    ))
    : <Typography variant="body1" sx={{ color: 'white' }}>No meal data available</Typography>;

  return (
    <Box
      sx={{
        width: 300,
        height: 'auto',
        margin: 1,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }}
    >
      {mealsArray}
    </Box>
  );
};

const DayLabelTile = ({ day }) => {
  return (
    <Box
      sx={{
        width: 200,
        height: 100,
        margin: 1,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
        {day}
      </Typography>
    </Box>
  );
};

export const MenuPlans = () => {
  const { id } = useParams(); // Access the id parameter from the URL
  const mealPlan = mealPlans[id] || {};

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 2,
        width: '100%',
      }}
    >
      <Typography variant="h3" sx={{ textAlign: 'center', color: 'white', marginBottom: 4 }}>
        Menu Plans (ID: {id})
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {Object.entries(mealPlan).map(([day, meals], dayIndex) => (
          <Box key={dayIndex} sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}>
            <DayLabelTile day={day} />
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {mealSections.map((mealSection, mealIndex) => (
                <MealPlanTile key={`${day}-${mealSection}`} meal={meals[mealSection]} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
