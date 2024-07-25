import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, ButtonBase, Tabs, Tab } from '@mui/material';
import diet from './diet.png';
import { useNavigate } from 'react-router-dom';
import { Plans } from './Plans';

const Goalselect = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
                <Tab label="New Plan" />
                <Tab label="My Plans" />
            </Tabs>
            {tabValue === 0 && (
                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box sx={{ width: '30%', padding: 2, marginLeft: '50px', marginTop: '30px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ButtonBase
                                    sx={{ width: '100%' }}
                                    onClick={() => navigate('/my-profile/personalized-plan/weightloss')}
                                >
                                    <Card sx={{ width: 400, height: 70 }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                                                Weight Loss Goal
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonBase
                                    sx={{ width: '100%' }}
                                    onClick={() => navigate('/my-profile/personalized-plan/weightgain')}
                                >
                                    <Card sx={{ width: 400, height: 70 }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                                                Weight Gain Goal
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonBase
                                    sx={{ width: '100%' }}
                                    onClick={() => navigate('/my-profile/personalized-plan/other')}
                                >
                                    <Card sx={{ width: 400, height: 70 }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                                                Other Goal
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                        <img
                            src={diet}
                            alt="Placeholder"
                            style={{ width: '500px', height: '500px' }}
                        />
                    </Box>
                </Box>
            )}
            {tabValue === 1 && (
                <Plans />
            )}
        </Box>
    );
};

export default Goalselect;
