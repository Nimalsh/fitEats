import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemText, Button
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const foodItems = [
  { name: 'Rice', normalConsumption: '100g', calories: 130, protein: 2.7, fat: 0.3, carbohydrate: 28.7, fiber: 0.4, sugars: 0.1, sodium: 1 },
  { name: 'Roti', normalConsumption: '1 piece', calories: 70, protein: 2.6, fat: 0.8, carbohydrate: 13.6, fiber: 0.9, sugars: 0.1, sodium: 75 },
  { name: 'Radish', normalConsumption: '100g', calories: 16, protein: 0.6, fat: 0.1, carbohydrate: 3.4, fiber: 1.6, sugars: 1.9, sodium: 39 },
  { name: 'Raspberry', normalConsumption: '100g', calories: 52, protein: 1.2, fat: 0.7, carbohydrate: 11.9, fiber: 6.5, sugars: 4.4, sodium: 1 },
  { name: 'Raisins', normalConsumption: '50g', calories: 130, protein: 1.3, fat: 0.2, carbohydrate: 34, fiber: 1.6, sugars: 29, sodium: 2 },
  { name: 'Romaine Lettuce', normalConsumption: '1 cup', calories: 8, protein: 0.6, fat: 0.1, carbohydrate: 1.4, fiber: 1, sugars: 0.4, sodium: 2 }
];

const Dashboard = () => {
  const [startDay, setStartDay] = useState(1);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealType, setMealType] = useState('');
  const [editableStates, setEditableStates] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleNextDay = () => {
    setStartDay(prevStartDay => prevStartDay + 1);
  };

  const handlePrevDay = () => {
    setStartDay(prevStartDay => Math.max(prevStartDay - 1, 1));
  };

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

  const getProgress = (consumed, recommended) =>
    (consumed / recommended) * 100;

  const calculateConsumedNutrients = () => {
    let consumedCalories = 0;
    let consumedProtein = 0;
    let consumedFat = 0;
    let consumedCarbohydrate = 0;
    let consumedFiber = 0;
    let consumedSugars = 0;
    let consumedSodium = 0;

    selectedFoods.forEach(food => {
      const quantity = parseFloat(food.quantity) || 0;
      consumedCalories += (food.calories * quantity) / 100; // Assuming calories are per 100g
      consumedProtein += (food.protein * quantity) / 100;
      consumedFat += (food.fat * quantity) / 100;
      consumedCarbohydrate += (food.carbohydrate * quantity) / 100;
      consumedFiber += (food.fiber * quantity) / 100;
      consumedSugars += (food.sugars * quantity) / 100;
      consumedSodium += (food.sodium * quantity) / 100;
    });

    return {
      calories: consumedCalories,
      protein: consumedProtein,
      fat: consumedFat,
      carbohydrate: consumedCarbohydrate,
      fiber: consumedFiber,
      sugars: consumedSugars,
      sodium: consumedSodium
      // Add more nutrients as needed
    };
  };

  // Calculate consumed nutrients dynamically
  const consumedNutrients = calculateConsumedNutrients();

  const dailySummary = {
    calories: { consumed: consumedNutrients.calories, recommended: 2000 },
    protein: { consumed: consumedNutrients.protein, recommended: 50 },
    fat: { consumed: consumedNutrients.fat, recommended: 78 },
    carbohydrate: { consumed: consumedNutrients.carbohydrate, recommended: 275 },
    fiber: { consumed: consumedNutrients.fiber, recommended: 28 },
    sugars: { consumed: consumedNutrients.sugars, recommended: 50 },
    sodium: { consumed: consumedNutrients.sodium, recommended: 2400 }
    // Add more nutritional details as needed
  };

  // Prepare data for pie chart
  const pieChartData = Object.keys(dailySummary).map(key => ({
    name: key,
    value: dailySummary[key].consumed
  }));

  const COLORS = ['#61f4de', '#577590', '#90be6d', '#68b6ef', '#6aa1f4', '#43AA8B', '#6e78ff'];

  return (
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
            gap: '20px',
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
          <IconButton onClick={handlePrevDay}>
            <Typography variant="h6">{"<"}</Typography>
          </IconButton>
          {[...Array(7)].map((_, index) => (
            <Button
              key={index}
              variant={index === 0 ? 'contained' : 'outlined'}
              sx={{
                borderRadius: '50%',
                minWidth: '50px',
                height: '50px',
                margin: '0 10px',
                width: '100%'
              }}
            >
              {startDay + index}
            </Button>
          ))}
          <IconButton onClick={handleNextDay}>
            <Typography variant="h6">{">"}</Typography>
          </IconButton>
          <IconButton sx={{ ml: 5 }}>
            <CalendarTodayIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Lower Part */}
      <Grid container spacing={2}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h6">Thursday, July 4</Typography>
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
            </CardContent>
          </Card>
        </Grid>

        {/* Right Hand Side Tile */}
        <Grid item xs={12} md={4}>
  <Card sx={{ width: '100%' }}>
    <CardContent>
      <Typography variant="h6">Nutritional Summary</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <PieChart width={400} height={400} >
        <Pie
  dataKey="value"
  isAnimationActive={false}
  data={pieChartData}
  cx="50%"
  cy="50%"
  outerRadius={120}
  fill="#8884d8"
  label={false}
>
  {pieChartData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
      stroke="black"  // Add stroke property for black margins
      strokeWidth={0.5} // Adjust strokeWidth as needed
    />
  ))}
</Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </CardContent>
  </Card>
</Grid>

      </Grid>

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

export default Dashboard;
