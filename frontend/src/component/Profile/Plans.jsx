import React from 'react';
import { Typography, CardActions, IconButton, Card, CardMedia, CardContent,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const plansData = [
    {
        id: 1,
        name: 'Vegan Diet Plan',
        status: 'Active',
        duration: '4 weeks',
        image: 'https://cdn.pixabay.com/photo/2020/02/01/06/13/vegan-4809593_640.jpg'
    },
    {
        id: 2,
        name: 'Keto Diet Plan',
        status: 'Completed',
        duration: '6 weeks',
        image: 'https://cdn.pixabay.com/photo/2024/05/23/00/44/almonds-8781985_1280.png'
    },
    {
        id: 3,
        name: 'Paleo Diet Plan',
        status: 'In Progress',
        duration: '8 weeks',
        image: 'https://cdn.pixabay.com/photo/2024/05/27/08/18/ai-generated-8790363_1280.jpg'
    },
    {
        id: 4,
        name: 'Mediterranean Diet Plan',
        status: 'Not Started',
        duration: '12 weeks',
        image: 'https://cdn.pixabay.com/photo/2024/05/23/00/44/almonds-8781985_1280.png'
    }
];

export const Plans = () => {
    const navigate = useNavigate();
    return (
        <div className="mt-5 px-5 flex flex-wrap gap-5">
            {plansData.map((plan) => (
                <Card key={plan.id} sx={{ width: 345 }}>
                    <CardMedia
                        sx={{ height: 345 }}
                        image={plan.image}
                        title={plan.name}
                    />
                    <CardContent>
                        <Typography variant='h5'>{plan.name}</Typography>
                        <Typography variant='body2'>{plan.status}</Typography>
                        <Typography variant='body2'>{plan.duration}</Typography>
                    </CardContent>
                    <CardActions>
                    <Button
                  variant="contained"
                  sx={{
                   backgroundColor: '#8E9015',
                  
                  }}
                  onClick={() => navigate('/my-profile/personalized-plan/view')}
                >
                 view
                </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};
