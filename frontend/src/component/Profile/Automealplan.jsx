import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, IconButton, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { updateMealPlanWeight, getPlanData, getTotalMealStatusCount, updateMealStatus, getMealplanById, completeMealplan, updateMealForPlanDayAndType } from '../State/Autoplans/Action';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Mealprogress = () => {
    const [progress, setProgress] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentWeight, setCurrentWeight] = useState('');
    const [weightloss, setWeightloss] = useState('');
    const [pastWeight, setPastWeight] = useState('');
    const [target, setTarget] = useState('');
    const [selectedDay, setSelectedDay] = useState(1);
    const [checkedMeals, setCheckedMeals] = useState({
        breakfast: false,
        lunch: false,
        dinner: false,
    });
    const [weightProgress, setWeightProgress] = useState(0);
    const [planStatus, setPlanStatus] = useState(''); // Add a state for plan status


    const token = localStorage.getItem('jwt');
    const { planId } = useParams(); // Get planId from the URL
    const { duration } = useParams();
    const dispatch = useDispatch();
    const planData = useSelector((state) => state.autoplans.planData || {});
    const [totalMealCount, setTotalMealCount] = useState(0);



    useEffect(() => {
        if (planId && token) {

            if (selectedDay) {
                dispatch(getPlanData(planId, selectedDay, token));
                dispatch(getTotalMealStatusCount(planId, token));


            }

        }
    }, [planId, selectedDay, token, dispatch]);

    useEffect(() => {
        console.log("Current planData:", planData);
    }, [planData]);

    useEffect(() => {
        if (planId && token) {
            dispatch(getMealplanById(planId, token))
                .then((data) => {
                    if (data) {
                        setPastWeight(data.weight);
                        setTarget(data.target);
                        setPlanStatus(data.status); // Set plan status here
                        setCurrentWeight(data.afterweight);
                        console.log("current", currentWeight);
                    }
                })
                .catch((error) => {
                    console.error("Error setting past weight and target:", error);
                });
        }
    }, [planId, token, dispatch]);

    useEffect(() => {
        if (planId && token) {
            console.log("Dispatching getTotalMealStatusCount with planId:", planId);

            dispatch(getTotalMealStatusCount(planId, token))
                .then((result) => {
                    if (result) {
                        setTotalMealCount(result);
                        setProgress((result / (duration * 3)) * 100); // Calculate percentage progress

                        // Check if currentWeight is not null before calculating weight progress
                        if (currentWeight !== null) {
                            // Adjust the calculation based on weight loss or gain target
                            const weightGoalDiff = target > pastWeight ? target - pastWeight : pastWeight - target;
                            const achievedWeightDiff = target > pastWeight
                                ? currentWeight - pastWeight
                                : pastWeight - currentWeight;

                            const weightProgressPercentage = (achievedWeightDiff / weightGoalDiff) * 100;
                            setWeightProgress(weightProgressPercentage);
                        }
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch total meal status count:", error);
                });
        }
    }, [planId, token, dispatch, duration, currentWeight, pastWeight, target]);

    useEffect(() => {
        if (planData[selectedDay]) {
            setCheckedMeals({
                breakfast: planData[selectedDay].breakfaststatus || false,
                lunch: planData[selectedDay].lunchstatus || false,
                dinner: planData[selectedDay].dinnerstatus || false,
            });
        }
    }, [planData, selectedDay]);

    const handleDialogSubmit = () => {
        // Calculate weight progress, handling both weight loss and gain
        const weightGoalDiff = target > pastWeight ? target - pastWeight : pastWeight - target;
        const achievedWeightDiff = target > pastWeight
            ? currentWeight - pastWeight
            : pastWeight - currentWeight;

        const weightProgressPercentage = (achievedWeightDiff / weightGoalDiff) * 100;
        setWeightProgress(60);

        // First, update the meal plan weight and get the updated weight
        dispatch(updateMealPlanWeight(planId, currentWeight, token))
            .then((updatedMealplan) => {
                const afterweight = updatedMealplan.afterweight;
                console.log("Afterweight received:", afterweight);

                // Set currentWeight to the updated afterweight from the response
                setCurrentWeight(afterweight);

                // After updating the weight, mark the meal plan as completed
                dispatch(completeMealplan(planId, token))
                    .then(() => {
                        console.log("Meal plan marked as 'Completed'");

                        // Optional: Refetch plan details to get the updated status
                        dispatch(getMealplanById(planId, token))
                            .then((data) => {
                                if (data) {
                                    setPlanStatus(data.status);
                                }
                            })
                            .catch((error) => {
                                console.error("Error refetching plan details:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Failed to complete meal plan:", error);
                    });
            })
            .catch((error) => {
                console.error("Error updating meal plan weight:", error);
            });

        setOpenDialog(false); // Close the dialog
    };

    const handleCompleteButtonClick = () => {
        if (selectedDay === parseInt(duration)) {
            // If it's the last day, open the dialog to enter the current weight
            setOpenDialog(true);
        } else {
            // If it's not the last day, proceed with marking meals as complete
            const selectedMeals = Object.keys(checkedMeals).filter((meal) => checkedMeals[meal]);
            dispatch(updateMealStatus(planId, selectedDay, selectedMeals, token)).then(() => {
                dispatch(getTotalMealStatusCount(planId, token))
                    .then((result) => {
                        if (result) {
                            setTotalMealCount(result);
                            setProgress((result / (duration * 3)) * 100);
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to fetch updated total meal status count:", error);
                    });
            });
        }
    };

    const handleShuffleClick = (mealType) => {
        dispatch(updateMealForPlanDayAndType(planId, selectedDay, mealType, token))
            .then(() => {
                dispatch(getPlanData(planId, selectedDay, token)); // Refresh meal data for the selected day
            })
            .catch((error) => {
                console.error("Error during meal shuffle:", error);
            });
    };



    const handleDayClick = (day) => {
        setSelectedDay(day);
        dispatch(getPlanData(planId, day, token)); // Fetch data when a day is clicked
    };

    const handleCheckboxClick = (mealType) => {
        setCheckedMeals((prevState) => ({
            ...prevState,
            [mealType]: !prevState[mealType],
        }));
    };
    const renderMealCard = (mealType, mealData, mealIngre) => {
        const ingredientsList = mealIngre ? mealIngre.split(',').map((ingredient) => ingredient.trim()) : [];

        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#4d4d4d',
                    padding: '16px',
                    marginBottom: '16px',
                    borderRadius: '8px',
                    position: 'relative', // To position the Shuffle button absolutely
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>{mealType}</Typography>
                    <Typography sx={{ color: '#cccccc' }}>{mealData || 'No data'}</Typography>
                    <Typography sx={{ color: '#cccccc' }}>Ingredients:</Typography>
                    <Box sx={{ paddingLeft: '16px' }}>
                        {ingredientsList.length > 0 ? (
                            ingredientsList.map((ingredient, index) => (
                                <Typography key={index} sx={{ color: '#cccccc' }}>
                                    - {ingredient}
                                </Typography>
                            ))
                        ) : (
                            <Typography sx={{ color: '#cccccc' }}>No data</Typography>
                        )}
                    </Box>
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

                {/* Shuffle Button */}
                <IconButton
                    sx={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        backgroundColor: '#FF8C00', // Customize color
                        color: '#ffffff', // Button icon color
                        '&:hover': {
                            backgroundColor: '#FF6600', // Hover effect color
                        },
                    }}
                    onClick={() => handleShuffleClick(mealType.toLowerCase())} // Replace with actual shuffle logic
                >
                    <ShuffleIcon />
                </IconButton>
            </Box>
        );
    };


    return (
        <Box sx={{ padding: '20px' }}>
            <Grid container spacing={4}>
                {/* Left Hand Side Tile */}
                <Grid item xs={12} md={7}>
                    <Card sx={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
                        {renderMealCard('Breakfast', planData[selectedDay]?.breakfast, planData[selectedDay]?.breakfastIngredients, planData[selectedDay]?.breakfaststatus)}
                        {renderMealCard('Lunch', planData[selectedDay]?.lunch, planData[selectedDay]?.lunchIngredients, planData[selectedDay]?.lunchstatus)}
                        {renderMealCard('Dinner', planData[selectedDay]?.dinner, planData[selectedDay]?.dinnerIngredients, planData[selectedDay]?.dinnerstatus)}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#A09E0E',
                                color: '#fff',
                                width: '100%',
                                borderRadius: '8px',
                                marginTop: '20px',
                            }}
                            onClick={handleCompleteButtonClick}
                            disabled={planStatus === 'Completed'}
                        >
                            COMPLETED
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
                                    marginBottom: '20px',
                                }}
                            >
                                <Grid container spacing={2} justifyContent="center">
                                    {Array.from({ length: duration }, (_, index) => index + 1).map((day) => (
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
                            {/* Progress Chart */}
                            <Typography variant="h6">Your Progress</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginTop: '30px' }}>
                                <div style={{ width: 200, height: 200 }}>
                                    <CircularProgressbar
                                        value={progress}
                                        text={`${Math.round(progress)}%`}
                                        styles={buildStyles({
                                            pathColor: '#40F3AA',
                                            textColor: '#40F3AA',
                                            trailColor: '#d6d6d6',
                                        })}
                                    />
                                </div>
                            </Box>
                            {planStatus === 'Completed' && (
                                <>
                                    <Typography variant="h6" sx={{ marginTop: '50px' }}>Weight Loss Progress</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginTop: '30px' }}>
                                        <div style={{ width: 200, height: 200 }}>
                                            <CircularProgressbar value={60} text={`${Math.round(60)}%`} styles={buildStyles({ pathColor: '#40F3AA', textColor: '#40F3AA', trailColor: '#d6d6d6' })} />
                                        </div>
                                    </Box>
                                </>
                            )}

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Enter Your Current Weight</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter your current weight to complete the plan.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Current Weight"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleDialogSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Mealprogress;
