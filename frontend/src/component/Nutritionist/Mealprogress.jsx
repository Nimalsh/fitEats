import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, IconButton,DialogTitle,Dialog,DialogContent,DialogContentText,DialogActions,TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { getPlanData, getMealStatus,updateMealStatus, countCompletedMeals  } from '../State/Plan/Action';
import { getRequestByPlanId } from '../State/Requests/Action'; // Import the action
import { ContactMailOutlined } from '@mui/icons-material';
import { completeRequestByPlanId ,updateAchievedWeight,putcomments} from '../State/Requests/Action';

const Mealprogress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { planId, duration } = useParams(); // Assuming `planId` and `duration` are in the URL
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0); 
  const [openDialog, setOpenDialog] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('');
  const [weightloss, setWeightloss] = useState('');
  const [pastWeight, setPastWeight] = useState(''); 
 const [selectedDay, setSelectedDay] = useState(1);
  const [checkedMeals, setCheckedMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const durationValue = parseInt(duration, 10); // Convert the duration to a number
  const token = localStorage.getItem('jwt'); // Replace with your actual token
  const [comments, setComments] = useState('');
  const [requestId, setRequestId] = useState('');
  
  const planData = useSelector(state => state.plan.planData[selectedDay]) || {}; // Select the data for the selected day
  const mealStatus = useSelector(state => state.plan.mealStatus[selectedDay]) || {}; // Select meal status for the selected day
  const requestData = useSelector(state => state.request.requestByPlanId);


  const fetchRequestData = async () => {
    try {
      const requestData = await dispatch(getRequestByPlanId(planId, token));
      console.log(requestData);  // Now you can use the fetched data
      if (requestData) {
        setPastWeight(requestData.currentWeight); // Store the currentWeight in pastWeight
        setWeightloss(requestData.weightGoal); // Store the weightGoal in weightloss
        setComments(requestData.comments);
        setRequestId(requestData.requestId);
      }
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };
  

  useEffect(() => {
    if (planId && token) {
      dispatch(countCompletedMeals(planId, token))
        .then(result => {
          
          setCompletedCount(result);
           // Update the completedCount state
        })
        .catch(error => {
          console.error("Error counting completed meals:", error); // Log any errors
        });

      if (selectedDay) {
        dispatch(getPlanData(planId, selectedDay, token));
        dispatch(getMealStatus(planId, selectedDay, token));
      }
      fetchRequestData();
    }
  }, [planId, selectedDay, token, dispatch]);
  
  const calculateWeightLossProgress = () => {
    if (pastWeight && weightloss && currentWeight) {
      const targetWeight = parseFloat(pastWeight) - parseFloat(weightloss);
      const progressPercentage = ((parseFloat(pastWeight) - parseFloat(currentWeight)) / weightloss) * 100;
      return Math.min(100, Math.max(0, progressPercentage)); // Ensure value is between 0 and 100
    }
    return 0;
  };
  

  useEffect(() => {
    // Update checkedMeals state based on mealStatus
    setCheckedMeals({
      breakfast: mealStatus.breakfast === 'completed',
      lunch: mealStatus.lunch === 'completed',
      dinner: mealStatus.dinner === 'completed',
    });
  }, [mealStatus]);

  useEffect(() => {
    // Update checkedMeals state based on mealStatus
    setCheckedMeals({
      breakfast: mealStatus.breakfast,
      lunch: mealStatus.lunch,
      dinner: mealStatus.dinner,
    });
  }, [mealStatus]);

  useEffect(() => {
    if (requestData?.achivedweight) {
      setCurrentWeight(requestData.achivedweight);
    }
  }, [requestData]);

  useEffect(() => {
    setProgress((completedCount / (3 * duration)) * 100); 
    console.log("progress",progress)
  }, [completedCount, duration]);

 
  const handleDialogSubmit = () => {
    // Dispatch the action to update the achieved weight
    dispatch(updateAchievedWeight(planId, currentWeight, token))
      .then(() => {
        // After successfully updating the weight, complete the request
        return dispatch(completeRequestByPlanId(planId, token));
      })
      .then(() => {
        // Fetch the updated request data
        return dispatch(getRequestByPlanId(planId, token));
      })
      .then(() => {
        // Update currentWeight with the latest achievedWeight
        if (requestData?.achivedweight) {
          setCurrentWeight(requestData.achivedweight);
        }
      })
      .catch(error => console.error("Error during the flow:", error));
    
    setOpenDialog(false);
  };

  
  
 
  const handleCompleteClick = () => {
    const completedMeals = Object.keys(checkedMeals).filter(mealType => checkedMeals[mealType]);
  
    // First, update the meal status and count completed meals
    dispatch(updateMealStatus(planId, selectedDay, completedMeals, token, navigate))
      .then(() => {
        return dispatch(countCompletedMeals(planId, token));
      })
      .then(result => {
        setCompletedCount(result);
  
        // Check if it's the final day
        if (selectedDay === durationValue) {
          setOpenDialog(true); // Open the dialog for the last day
        }
      })
      .catch(error => console.error("Error processing meals:", error));
  };
  
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setCheckedMeals({
      breakfast: false,
      lunch: false,
      dinner: false,
    }); // Reset checkboxes when changing the day
  };

  const handleCheckboxClick = (mealType) => {
    setCheckedMeals(prevState => {
      const newState = {
        ...prevState,
        [mealType]: !prevState[mealType],
      };
      console.log('Updated checkedMeals:', newState); // Add this line to check the state
      return newState;
    });
  };

  const handleSaveComments = async () => {
    try {
      // Dispatch the action to update comments
      await dispatch(putcomments(requestId, comments, token));
  
      // Fetch the updated request data
      const updatedRequestData = await dispatch(getRequestByPlanId(planId, token)).unwrap();
  
      if (updatedRequestData) {
        setComments(updatedRequestData.comments); // Update the comments in the state
      }
  
      console.log("Comments updated successfully!");
    } catch (error) {
      console.error("Error updating comments:", error);
    }
  };
  
  const renderMealCard = (mealType, mealData) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4d4d4d',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '8px'
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ color: '#ffffff' }}>{mealType}</Typography>
        <Typography sx={{ color: '#cccccc' }}>{mealData || 'No data'}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{ color: '#c2c2c2' }}>
          <ShoppingCartIcon />
        </IconButton>
        <IconButton
          sx={{ color: '#c2c2c2' }}
          onClick={() => handleCheckboxClick(mealType.toLowerCase())}
        >
          {checkedMeals[mealType.toLowerCase()] ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
  
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Left Hand Side Tile */}
        <Grid item xs={12} md={7}>
  <Card sx={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
    {renderMealCard('Breakfast', planData.breakfast)}
    {renderMealCard('Lunch', planData.lunch)}
    {renderMealCard('Dinner', planData.dinner)}
    <Button
      variant="contained"
      sx={{
        backgroundColor: requestData?.status === 'Completed' ? '#B0B0B0' : '#A09E0E',
        color: '#fff',
        width: '100%',
        borderRadius: '8px',
        marginTop: '20px',
      }}
      disabled={requestData?.status === 'Finished'}
      onClick={handleCompleteClick}
    >
      COMPLETED
    </Button>
  </Card>

  {/* New Card for Adding Comments */}
  <Card sx={{ backgroundColor: '#444', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
    <TextField
      fullWidth
      multiline
      rows={4}
      label="Add Comments"
      placeholder="Write your comments here..."
      value={comments}
      onChange={(e) => setComments(e.target.value)}
    />
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#A09E0E',
      
        width: '100%',
        borderRadius: '8px',
        marginTop: '10px',
      }}
    onClick={handleSaveComments}
    >
      SAVE
    </Button>
  </Card>
</Grid>

        {/* Right Hand Side Tile */}
        <Grid item xs={12} md={4}>
          <Card sx={{ width: '100%', height: '100%', backgroundColor: '#222', padding: '20px', borderRadius: '8px' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}
              >
                <Grid container spacing={2} justifyContent="center">
                  {Array.from({ length: durationValue }, (_, index) => index + 1).map(day => (
                    <Grid item key={day}>
                      <Button
                        variant="contained"
                        onClick={() => handleDayClick(day)}
                        sx={{
                          borderRadius: '50%',
                          backgroundColor: selectedDay === day ? '#A09E0E' : '#444',
                          color: selectedDay === day ? '#fff' : '#ccc',
                          width: '40px',
                          height: '40px',
                          marginBottom: '10px',
                          '&:hover': {
                            backgroundColor: selectedDay === day ? '#A09E0E' : '#555',
                          },
                        }}
                      >
                        {day}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {requestData?.status === 'Finished' && (
                <>
               {/* Progress Chart */}
               <Typography variant="h6">Plan Adherence</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginTop: '30px' }}>
                <div style={{ width: 200, height: 200 }}>
                  <CircularProgressbar
                    value={progress}
                    text={`${Math.round(progress)}%`}
                    styles={buildStyles({
                      pathColor: '#40F3AA',
                      textColor: '#40F3AA',
                      trailColor: '#d6d6d6'
                    })}
                  />
                </div>
              </Box>
              </>
              )}
              {requestData?.status === 'Finished' && (
                <>
              <Typography variant="h6" sx={{ marginTop: '50px' }}>Weight Loss Progress</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginTop: '30px' }}>
                <div style={{ width: 200, height: 200 }}>
                  <CircularProgressbar
                    value={calculateWeightLossProgress()}
                    text={`${Math.round(calculateWeightLossProgress())}%`}
                    styles={buildStyles({
                      pathColor: '#40F3AA',
                      textColor: '#40F3AA',
                      trailColor: '#d6d6d6'
                    })}
                  />
                </div>
              </Box>
              </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
     
    </Box>
  );
  
};

export default Mealprogress;
