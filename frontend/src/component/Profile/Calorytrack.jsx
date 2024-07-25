import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, IconButton, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, TextField,
    List, ListItem, ListItemText, LinearProgress,Checkbox,DialogActions
  } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PoolIcon from '@mui/icons-material/Pool';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RowingIcon from '@mui/icons-material/Rowing';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import JumpRopeIcon from '@mui/icons-material/Sports';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import Avatar from '@mui/material/Avatar';
import SaveIcon from '@mui/icons-material/Save';

const foodItems = [
    { name: 'Rice', normalConsumption: '100g', nutrition: { calories: 130, protein: 2.7, fat: 0.3, carbohydrate: 28, fiber: 0.4, sugars: 0.1, sodium: 1 } },
    { name: 'Roti', normalConsumption: '1 piece', nutrition: { calories: 90, protein: 3, fat: 1, carbohydrate: 15, fiber: 1, sugars: 1, sodium: 90 } },
    { name: 'Radish', normalConsumption: '100g', nutrition: { calories: 16, protein: 0.7, fat: 0.1, carbohydrate: 3.4, fiber: 1.6, sugars: 1.9, sodium: 39 } },
    { name: 'Raspberry', normalConsumption: '100g', nutrition: { calories: 52, protein: 1.2, fat: 0.7, carbohydrate: 12, fiber: 6.5, sugars: 4.4, sodium: 1 } },
    { name: 'Raisins', normalConsumption: '50g', nutrition: { calories: 149, protein: 1.5, fat: 0.2, carbohydrate: 39, fiber: 1.6, sugars: 29, sodium: 11 } },
    { name: 'Romaine Lettuce', normalConsumption: '1 cup', nutrition: { calories: 8, protein: 0.6, fat: 0.1, carbohydrate: 1.5, fiber: 1, sugars: 0.6, sodium: 4 } }
  ];
  const activities = {
    calories: ['Running', 'Cycling', 'Swimming'],
    fat: ['Brisk Walking', 'Aerobics', 'Rowing'],
    carbohydrate: ['Jogging', 'Dance', 'Cycling'],
    sugars: ['HIIT', 'Jump Rope', 'Kickboxing'],
  };
  const activityIcons = {
    Running: <DirectionsRunIcon />,
    Cycling: <DirectionsBikeIcon />,
    Swimming: <PoolIcon />,
    'Brisk Walking': <DirectionsWalkIcon />,
    Aerobics: <FitnessCenterIcon />,
    Rowing: <RowingIcon />,
    Jogging: <DirectionsRunIcon />,
    Dance: <MusicNoteIcon />,
    HIIT: <FitnessCenterIcon />,
    'Jump Rope': <JumpRopeIcon />,
    Kickboxing: <SportsMmaIcon />
  };
  
  
  const caloriesPerMinute = {
    Running: 10, // Approximate
    Cycling: 8,  // Approximate
    Swimming: 12, // Approximate
    'Brisk Walking': 5, // Approximate
    Aerobics: 6, // Approximate
    Rowing: 10, // Approximate
    Jogging: 8, // Approximate
    Dance: 10, // Approximate
    HIIT: 13, // Approximate
    'Jump Rope': 12, // Approximate
    Kickboxing: 10 // Approximate
  };
  

const Calorytrack = () => {
 
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealType, setMealType] = useState('');
  const [editableStates, setEditableStates] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);


  const handleClickOpen = meal => {
    setMealType(meal);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchTerm('');
    setFilteredFoods([]);
  };

  const handleDone = () => {
    setOpen(false);
    setSearchTerm('');
    setFilteredFoods([]);
  };

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = foodItems.filter(food =>
        food.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]);
    }
  };

  const handleFoodClick = food => {
    setSelectedFoods(prevSelectedFoods => [
      ...prevSelectedFoods,
      { ...food, quantity: '', mealType }
    ]);
    setEditableStates(prevStates => [...prevStates, false]);
    setSearchTerm('');
    setFilteredFoods([]);
  };

  const handleQuantityChange = (index, value) => {
    const updatedFoods = [...selectedFoods];
    updatedFoods[index].quantity = value;
    setSelectedFoods(updatedFoods);
  };

  const handleEditToggle = index => {
    setEditableStates(prevStates =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };

  const handleRemoveFood = index => {
    const updatedFoods = selectedFoods.filter((_, idx) => idx !== index);
    const updatedEditableStates = editableStates.filter(
      (_, idx) => idx !== index
    );
    setSelectedFoods(updatedFoods);
    setEditableStates(updatedEditableStates);
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  const getProgressColor = (consumed, recommended) => {
    return consumed > recommended ? 'error' : 'primary';
  };
  const getActivityDuration = (key, excessAmount) => {
    const caloriesPerGram = {
      calories: 1,
      fat: 9,
      carbohydrate: 4,
      sugars: 4,
    };
    const caloriesNeeded = excessAmount * caloriesPerGram[key];
  
    if (!activities[key]) {
      console.log(`No activities found for key: ${key}`);
      return [];
    }
  
    return activities[key].map(activity => {
      const caloriesPerMin = caloriesPerMinute[activity];
      if (!caloriesPerMin) {
        console.log(`No calorie per minute data for activity: ${activity}`);
        return { activity, duration: 'N/A' };
      }
  
      const durationMinutes = Math.ceil(caloriesNeeded / caloriesPerMin);
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return {
        activity,
        duration: hours > 0 
          ? `${hours}h ${minutes}m` 
          : `${minutes}m`
      };
    });
  };
  
  
  

  const [dailySummary, setDailySummary] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    fiber: 0,
    sugars: 0,
    sodium: 0,
  });
  const recommendedIntake = {
    calories: 2000,
    protein: 50,
    fat: 78,
    carbohydrate: 275,
    fiber: 28,
    sugars: 50,
    sodium: 2400,
  };

  useEffect(() => {
    const summary = selectedFoods.reduce((acc, food) => {
      const quantity = parseFloat(food.quantity) || 0;
      const multiplier = quantity / parseFloat(food.normalConsumption.replace(/\D/g, ''));
      return {
        calories: acc.calories + food.nutrition.calories * multiplier,
        protein: acc.protein + food.nutrition.protein * multiplier,
        fat: acc.fat + food.nutrition.fat * multiplier,
        carbohydrate: acc.carbohydrate + food.nutrition.carbohydrate * multiplier,
        fiber: acc.fiber + food.nutrition.fiber * multiplier,
        sugars: acc.sugars + food.nutrition.sugars * multiplier,
        sodium: acc.sodium + food.nutrition.sodium * multiplier,
      };
    }, {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrate: 0,
      fiber: 0,
      sugars: 0,
      sodium: 0,
    });

    setDailySummary(summary);
  }, [selectedFoods]);

  const getProgress = (consumed, recommended) => (consumed / recommended) * 100;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [savedMeals, setSavedMeals] = useState({});
  
  const [dateColors, setDateColors] = useState({});
  const [selectedActivities, setSelectedActivities] = useState({});

  const handleActivityChange = (dateKey, nutrient, activity) => {
    setSelectedActivities(prev => {
      const newActivities = { ...prev };
      if (!newActivities[dateKey]) {
        newActivities[dateKey] = {};
      }
      if (!newActivities[dateKey][nutrient]) {
        newActivities[dateKey][nutrient] = {};
      }
      newActivities[dateKey][nutrient][activity] = !newActivities[dateKey][nutrient][activity];

      // Adjust consumed amount if activity is selected
      if (newActivities[dateKey][nutrient][activity]) {
        dailySummary[nutrient] = recommendedIntake[nutrient];
      } else {
        // Recalculate consumed amount if activity is deselected
        dailySummary[nutrient] = selectedFoods.reduce((acc, food) => {
          const quantity = parseFloat(food.quantity) || 0;
          const multiplier = quantity / parseFloat(food.normalConsumption.replace(/\D/g, ''));
          return acc + food.nutrition[nutrient] * multiplier;
        }, 0);
      }

      return newActivities;
    });
  };

  const handleDateChange = date => {
    const dateKey = date.toISOString().split('T')[0];
    setSelectedDate(date);
    setSelectedFoods(savedMeals[dateKey] || []);
    setSelectedActivities(prev => prev[dateKey] || {});
  };

  const getActivityChecked = (dateKey, nutrient, activity) => {
    return selectedActivities[dateKey]?.[nutrient]?.[activity] || false;
  };

  
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
  const saveMealsAndActivities = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setSavedMeals(prev => ({
      ...prev,
      [dateKey]: selectedFoods
    }));
  
    const hasExcess = Object.keys(dailySummary).some(key => {
      const excessAmount = dailySummary[key] - recommendedIntake[key];
      return excessAmount > 0;
    });
  
    const newDateColors = {
      ...dateColors,
      [dateKey]: hasExcess ? 'red' : 'green'
    };
  
    setDateColors(newDateColors);
  
    // Check if all date circles are green
    const allGreen = Object.values(newDateColors).length === 7 &&
                      Object.values(newDateColors).every(color => color === 'green');
  
    if (allGreen) {
      setAchievementDialogOpen(true);
    }
  };
  useEffect(() => {
    const initialDateColors = {};
    for (let i = 1; i <= 7; i++) {
      const dateKey = `2024-07-${i < 10 ? `0${i}` : i}`;
      initialDateColors[dateKey] = 'transparent'; // Default color
    }
    setDateColors(initialDateColors);
  }, []);
  
  


  return (
    <Box sx={{ padding: '20px' }}>
      {/* Upper Part */}
      <Box sx={{ padding: '20px' }}>
  {/* Upper Part */}
  <Box sx={{ padding: '20px' }}>
  {/* Upper Part */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px'
    }}
  >
    <Typography variant="h4">Daily Food Log</Typography>
    <Typography variant="body1">Plan or log what you eat.</Typography>

    <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginTop: '30px',
    justifyContent: 'center',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    padding: '10px 0',
    height: '80px',
    border: '1px solid #88891D',
    borderRadius: '8px'
  }}
>
  {[1, 2, 3, 4, 5, 6, 7].map((number) => {
    const dateKey = `2024-07-${number < 10 ? `0${number}` : number}`;
    return (
      <Button
        key={number}
        variant="contained"
        sx={{
          minWidth: '50px',
          minHeight: '50px',
          borderRadius: '50%',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: dateColors[dateKey] || 'transparent',
          color: dateColors[dateKey] ? 'white' : 'white', 
          border: dateColors[dateKey] ? '2px solid #88891D' : '2px solid #88891D'
        }}
        onClick={() => handleDateChange(new Date(dateKey))}
      >
        {number}
      </Button>
    );
  })}
</Box>

  </Box>
</Box>
</Box>
      {/* Lower Part */}
      <Grid container spacing={1}>
  {/* Left Hand Side Tile */}
  <Grid item xs={12} md={6}>
  <Card sx={{ width: '100%' }}>
    <CardContent>
      <Typography variant="h6">{selectedDate.toDateString()}</Typography> {/* Display selected date */}
      {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => (
        <Card key={meal} sx={{ marginTop: '20px', backgroundColor: '#545453', width: '100%' }}>
          <CardContent>
            <Typography variant="h6">{meal}</Typography>
            <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => handleClickOpen(meal)}>Add Food</Button>
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
              <Grid item xs={12}>
                <List>
                  {selectedFoods
                    .filter(food => food.mealType === meal)
                    .map((food, index) => (
                      <ListItem key={index} disableGutters>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Typography variant="body1" sx={{ marginLeft: '20px' }}>{food.name}</Typography>
                              <Box display="flex" alignItems="center" sx={{ marginLeft: 'auto', marginRight: '10px' }}>
                                <Typography variant="body1" sx={{ marginRight: '10px' }}>{food.normalConsumption}</Typography>
                                <TextField
                                  type="number"
                                  variant="outlined"
                                  size="small"
                                  value={food.quantity}
                                  sx={{ width: '60px' }}
                                  onChange={e => handleQuantityChange(index, e.target.value)}
                                />
                                <Button
                                  variant="contained"
                                  sx={{ marginLeft: '10px' }}
                                  onClick={() => handleEditToggle(index)}
                                >
                                  {editableStates[index] ? 'Save' : 'Update'}
                                </Button>
                                <IconButton
                                  aria-label="close"
                                  sx={{
                                    marginLeft: '10px',
                                    color: theme => theme.palette.grey[500]
                                  }}
                                  onClick={() => handleRemoveFood(index)}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </ListItem>
                    ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
      <Button
  variant="contained"
  color="primary"
  sx={{ marginLeft: '500px', marginTop: '8px' }}
  onClick={() => {
    saveMealsAndActivities();
  }}
>
  save
</Button>


    
      </Box>
    </CardContent>
  </Card>
</Grid>

  {/* Right Hand Side Tile */}
  <Grid item xs={12} md={5}>
          <Box sx={{ width: '100%', padding: '20px', borderRadius: '8px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant="h6">Nutritional Summary</Typography>
            {Object.keys(dailySummary).map(key => {
              const excessAmount = Math.max(dailySummary[key] - recommendedIntake[key], 0);
              const activityDurations = getActivityDuration(key, excessAmount);
              const dateKey = selectedDate.toISOString().split('T')[0];

              return (
                <Box key={key} sx={{ marginBottom: '10px' }}>
                  <Typography variant="body2">{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                    <Typography variant="body2">{Math.round(dailySummary[key])} {key === 'calories' ? 'kcal' : 'g'}</Typography>
                    <Typography variant="body2">{recommendedIntake[key]} {key === 'calories' ? 'kcal' : 'g'}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getProgress(dailySummary[key], recommendedIntake[key])}
                    color={getProgressColor(dailySummary[key], recommendedIntake[key])}
                  />
                  {excessAmount > 0 && (
                    <>
                      <Typography variant="body2" color="error" marginTop={"5px"}>Warning: Exceeded recommended {key}</Typography>
                      {activityDurations.length > 0 && (
                        <Box sx={{ marginTop: '10px' }}>
                          <Typography variant="body2" marginBottom={"5px"}>Suggested Activities:</Typography>
                          {activityDurations.map((activity, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                              <Checkbox
                                checked={getActivityChecked(dateKey, key, activity.activity)}
                                onChange={() => handleActivityChange(dateKey, key, activity.activity)}
                              />
                              <Avatar sx={{ marginRight: '10px' }}>
                                {activityIcons[activity.activity]}
                              </Avatar>
                              <Typography variant="body2">{activity.activity}: {activity.duration}</Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              );
            })}
          </Box>
        </Grid>
    



</Grid>

<Dialog
  open={achievementDialogOpen}
  onClose={() => setAchievementDialogOpen(false)}
  maxWidth="sm"
  fullWidth
>
<DialogTitle
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          borderBottom: '2px solid #969817', // Bottom border color
          padding: '16px 24px', // Padding around the title
         
        }}
      >
        Achievement Unlocked!
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 24px', // Padding around the content
         // Font color
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '16px' // Margin for spacing
          }}
        >
          Congratulations! You have achieved a healthy BMI.
        </Typography>
        <img src="https://cdn.pixabay.com/photo/2017/01/28/11/43/cup-2015198_1280.png" alt="Achievement" style={{ width: '200px', marginBottom: '16px' }} /> {/* Add your image here */}
      </DialogContent>
      <DialogActions
        sx={{
          padding: '16px 24px',
          justifyContent: 'center', 
        }}
      >
        <Button
          onClick={() => setAchievementDialogOpen(false)}
          color="success"
          variant="contained" // Primary button style
          sx={{
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
            backgroundColor: '#969817' // Button background color
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>


      {/* Dialog for Adding Food */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">Add Food</Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
  
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search foods you want to add"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ marginTop: '10px' }}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: '20px' }}>
            <List>
              {filteredFoods.map((food, index) => (
                <ListItem button key={index} onClick={() => handleFoodClick(food)}>
                  <ListItemText primary={food.name} />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" onClick={handleDone} sx={{ marginBottom: '10px' }}>
              Done
            </Button>
            <Typography variant="h6" sx={{ marginTop: '20px' }}>Selected Foods</Typography>
            {selectedFoods.map((food, index) => (
              <SelectedFoodCard
                key={index}
                food={food}
                index={index}
                handleQuantityChange={handleQuantityChange}
                handleRemoveFood={handleRemoveFood}
              />
            ))}
            <Typography variant="body2" sx={{ marginTop: '10px' }}>
              Can't find a food? <Button variant="text" onClick={() => { }}>Enter a custom food</Button> into the database.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
  
};

const SelectedFoodCard = ({ food, index, handleQuantityChange, handleRemoveFood }) => (
  <Card sx={{ marginTop: '10px' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">{food.name}</Typography>
        <Box display="flex" alignItems="center" sx={{ marginLeft: 'auto', marginRight: '10px' }}>
          <Typography variant="body1">{food.normalConsumption}</Typography>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            value={food.quantity}
            sx={{ width: '60px', marginLeft: '10px' }}
            onChange={e => handleQuantityChange(index, e.target.value)}
          />
          <IconButton
            aria-label="edit"
            onClick={() => handleRemoveFood(index)}
            sx={{ marginLeft: '10px', color: theme => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default Calorytrack;