import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Paper, Typography, Box, Avatar, Button, Card, CardContent,Dialog,DialogActions,DialogContent,DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestById, updateRequestDescriptionAndComplete } from '../State/Requests/Action';
import { createPlan } from '../State/Plan/Action';


const Othergoal = () => {
  const { requestId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');
  const [UserName, setUserName] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [userId, setUserId] = useState('');
  const [nutritionistId, setNutritionistId] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // State to open/close dialog
  const [durationInput, setDurationInput] = useState(''); // Input value for duration

  // Assume we have the user's name
  const userName = 'John Doe';

  // Mock data for previously achieved goals

  

  const request = useSelector(state => state.request.requestById);

  useEffect(() => {
    if (requestId) {
      console.log('Dispatching getRequestById with requestId:', requestId, 'and token:', token);
      dispatch(getRequestById(requestId, token));
    }
  }, [requestId, dispatch, token]);

  useEffect(() => {
    if (request) {
      setUserId(request.userId || '');
      setNutritionistId(request.nutritionistId || '');
      setUserName(request.name || '');
      setCurrentWeight(request.currentWeight || '');


      setAge(request.age || '');
      setGender(request.gender || '');
      setHeight(request.height || '');
      setActivityLevel(request.activityLevel || '');
      setDietaryPreferences(request.dietaryPreferences || '');
      setDietaryRestrictions(request.dietaryRestrictions || '');
      setMealsPerDay(request.mealsPerDay || '');
      setGoal(request.description || '');
      setDescription(request.reply || '');
    }
  }, [request]);

  const handleSaveClick = () => {
    // Ensure the description is updated before dispatching
    if (description.trim()) {
      // Dispatch the action to save the description
      dispatch(updateRequestDescriptionAndComplete(requestId, description, token));
    } else {
      // Optionally handle empty description (e.g., show a message)
      console.log('Description cannot be empty');
    }
  };

  const handleProceedClick = () => {
    setOpenDialog(true); // Open dialog box
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog without saving
  };


  const handleDialogSubmit = () => {
    if (durationInput.trim()) {
      setDuration(durationInput); // Set duration from input
      dispatch(createPlan(durationInput, userId, nutritionistId, requestId, token, navigate)); // Dispatch createPlan with new duration
      setOpenDialog(false); // Close the dialog
    } else {
      console.log('Duration cannot be empty');
    }
  };



  return (


    <Container>
      <Grid container spacing={2}>
        {/* Left Tile */}
        <Grid item xs={12} sm={7}>
  <Box mt={5} ml={-5} width={'100%'} maxWidth={'600px'} marginLeft={'5px'}>
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Current Goal
      </Typography>
      <Box display="flex" alignItems="center">
        {/* User Avatar Section */}
        <Box display="flex" flexDirection="column" alignItems="center" mr={5} mt={5}>
          <Avatar
            alt="User Image"
            src="path_to_user_image.jpg"
            sx={{ width: 60, height: 60 }}
          />
          <Typography variant="subtitle1" mt={1}>
            {userName}
          </Typography>
        </Box>
        {/* Input Field Section */}
        <Box flex={1}>
          <form noValidate autoComplete="off">
            <TextField
              label="Goal"
              fullWidth
              multiline
              rows={6}
              margin="normal"
              type="text"
              name="goal"
              value={goal}
              disabled
              sx={{ width: '100%' }}
            />
          </form>
        </Box>
      </Box>
    </Paper>
  </Box>

  <Box mt={2} ml={-5} width={'600px'} minHeight={'500px'} marginLeft={'5px'}>
    <Paper style={{ padding: 20, minHeight: '250px' }}>
      <Box>
        <TextField
          label="Enter your comments"
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          margin="normal"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={request?.status === "Completed"}
        />
      </Box>
      {/* Buttons Section */}
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3} // Adjust margin-top to ensure proper spacing from the text field
      >
        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          disabled={request?.status === "Completed"}
          style={{ marginRight: '10px' }} // Add spacing between buttons
        >
          Save
        </Button>
        {/* Create a Plan Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedClick}
         // Your create plan handler
        >
          Create a Plan
        </Button>
      </Box>
    </Paper>
  </Box>
</Grid>

        {/* Right Tile */}
        <Grid item xs={12} sm={4}>
          <Box mt={5} ml={-1} width={'400px'}>
            <Paper style={{ padding: 20, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid>
                {/* Age, Gender, Height */}
                <form noValidate autoComplete="off">
                  <TextField
                    label="Age"
                    fullWidth
                    margin="normal"
                    type="number"
                    name="Age"
                    value={age}
                    disabled // Make the field disabled
                  />
                  <TextField
                    label="Height"
                    fullWidth
                    margin="normal"
                    type="number"
                    name="Height"
                    value={height}
                    disabled // Make the field disabled
                  />
                  <TextField
                    label="Gender"
                    fullWidth
                    margin="normal"
                    type="text"
                    name="Gender"
                    value={gender}
                    disabled // Make the field disabled
                  />
                  <TextField
                    label="Activity Level"
                    fullWidth
                    margin="normal"
                    type="text"
                    name="activitylevel"
                    value={activityLevel}
                    disabled // Make the field disabled
                  />
                  <TextField
                    label="Dietary Preferences"
                    fullWidth
                    margin="normal"
                    type="text"
                    name="dietaryPreferences"
                    value={dietaryPreferences}
                    disabled // Make the field disabled
                  />
                  <TextField
                    label="Dietary Restrictions"
                    fullWidth
                    margin="normal"
                    type="text"
                    name="dietaryRestrictions"
                    value={dietaryRestrictions}
                    disabled // Make the field disabled
                  />
                  <TextField
                    label="Meals per day"
                    fullWidth
                    margin="normal"
                    type="number"
                    name="mealsPerDay"
                    value={mealsPerDay}
                    disabled // Make the field disabled
                  />
                </form>
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: '250px',
                    marginTop: '30px',
                  }} onClick={handleProceedClick}
                >
                  Proceed
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose} sx={{ '& .MuiDialog-paper': { width: '400px', maxWidth: '600px' } }}>
        <DialogTitle>Enter Duration</DialogTitle>
        <DialogContent>
          <TextField
            label="Duration (in days)"
            fullWidth
            variant="outlined"
            margin="normal"
            value={durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
            type="number"
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Othergoal;
