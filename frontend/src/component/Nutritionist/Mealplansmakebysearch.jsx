import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';

const foodItems = [
  { name: 'Rice', normalConsumption: '100g' },
  { name: 'Roti', normalConsumption: '1 piece' },
  { name: 'Radish', normalConsumption: '100g' },
  { name: 'Raspberry', normalConsumption: '100g' },
  { name: 'Raisins', normalConsumption: '50g' },
  { name: 'Romaine Lettuce', normalConsumption: '1 cup' }
];

const SelectedFoodCard = ({ food, index, handleQuantityChange, handleRemoveFood }) => (
  <Card key={index} sx={{ marginTop: '10px' }}>
    <CardContent>
      <Typography variant="body1">{food.name}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <Typography variant="body2">{food.normalConsumption}</Typography>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          value={food.quantity}
          sx={{ marginLeft: '10px', width: '100px' }}
          onChange={(e) => handleQuantityChange(index, e.target.value)}
        />
        <IconButton
          aria-label="close"
          sx={{
            marginLeft: '10px',
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => handleRemoveFood(index)}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </CardContent>
  </Card>
);

const  Mealplanmakebysearch = () => {
  const [startDay, setStartDay] = useState(1);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealType, setMealType] = useState('');
  const [editableStates, setEditableStates] = useState([]); // Manage editable states

  const handleNextDay = () => {
    setStartDay((prevStartDay) => prevStartDay + 1);
  };

  const handlePrevDay = () => {
    setStartDay((prevStartDay) => Math.max(prevStartDay - 1, 1));
  };

  const handleClickOpen = (meal) => {
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

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = foodItems.filter((food) => food.name.toLowerCase().startsWith(value.toLowerCase()));
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]);
    }
  };

  const handleFoodClick = (food) => {
    setSelectedFoods((prevSelectedFoods) => [...prevSelectedFoods, { ...food, quantity: '', mealType }]);
    setEditableStates((prevStates) => [...prevStates, false]); // Initialize editable state to false
    setSearchTerm('');
    setFilteredFoods([]);
  };

  const handleQuantityChange = (index, value) => {
    const updatedFoods = [...selectedFoods];
    updatedFoods[index].quantity = value;
    setSelectedFoods(updatedFoods);
  };

  const handleEditToggle = (index) => {
    setEditableStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };

  const handleRemoveFood = (index) => {
    const updatedFoods = selectedFoods.filter((_, idx) => idx !== index);
    const updatedEditableStates = editableStates.filter((_, idx) => idx !== index);
    setSelectedFoods(updatedFoods);
    setEditableStates(updatedEditableStates);
  };

  // Dummy data for the daily summary
  const dailySummary = {
    calories: { consumed: 205, recommended: 2000 },
    protein: { consumed: 4.3, recommended: 50 },
    fat: { consumed: 0.44, recommended: 78 },
    carbohydrate: { consumed: 44.5, recommended: 275 },
    fiber: { consumed: 0.63, recommended: 28 },
    sugars: { consumed: 0.08, recommended: 50 },
    sodium: { consumed: 1.6, recommended: 2400 },
  };

  const getProgress = (consumed, recommended) => (consumed / recommended) * 100;

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Upper Part */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">Daily Food Log</Typography>
        <Typography variant="body1">Plan or log what you eat.</Typography>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginTop: '30px',
          justifyContent: 'center',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          padding: '10px 0',
          height: '80px',
          border: '1px solid #88891D',  // Add border here
          borderRadius: '8px',
        }}>
          <IconButton onClick={handlePrevDay}><Typography variant="h6">{"<"}</Typography></IconButton>
          {[...Array(7)].map((_, index) => (
            <Button
              key={index}
              variant={index === 0 ? 'contained' : 'outlined'}
              sx={{
                borderRadius: '50%',
                minWidth: '50px',  // Adjust the button size as needed
                height: '50px',  // Adjust the button size as needed
                margin: '0 10px',
                width: '100%',
              }}
            >
              {startDay + index}
            </Button>
          ))}
          <IconButton onClick={handleNextDay}><Typography variant="h6">{">"}</Typography></IconButton>
          <IconButton sx={{ ml: 5 }}><CalendarTodayIcon /></IconButton>
        </Box>
      </Box> 

      {/* Lower Part */}
      <Grid container spacing={3}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '700px' }}>
            <CardContent>
              <Typography variant="h6">Thursday, July 4</Typography>
              {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
                <Card key={meal} sx={{ marginTop: '20px', backgroundColor: '#545453', width: '600px' }}>
                  <CardContent>
                    <Typography variant="h6">{meal}</Typography>
                    <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => handleClickOpen(meal)}>Add Food</Button>
                    <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                      <Grid item xs={12}>
                        <List>
                          {selectedFoods
                            .filter((food) => food.mealType === meal)  // Filter foods by meal type
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
                                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                                          disabled={!editableStates[index]} // Control the disabled state
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
                                            color: (theme) => theme.palette.grey[500],
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
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Daily Nutrition Summary</Typography>
              <Box sx={{ marginTop: '20px' }}>
                {Object.keys(dailySummary).map((key) => (
                  <Box key={key} sx={{ marginBottom: '10px' }}>
                    <Typography variant="body1" sx={{ marginBottom: '5px' }}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${dailySummary[key].consumed} / ${dailySummary[key].recommended}`}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getProgress(dailySummary[key].consumed, dailySummary[key].recommended)}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog for adding foods */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Add Food for ${mealType}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Food"
            type="text"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List>
            {filteredFoods.map((food, index) => (
              <ListItem button key={index} onClick={() => handleFoodClick(food)}>
                <ListItemText primary={food.name} secondary={food.normalConsumption} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button onClick={handleClose} sx={{ marginRight: '10px' }}>Cancel</Button>
            <Button onClick={handleDone} variant="contained">Done</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Mealplanmakebysearch;
