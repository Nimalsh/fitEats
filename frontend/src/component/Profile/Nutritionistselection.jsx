
import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Grid,
  Typography,
  Avatar,
  Modal,
  Backdrop,
  Fade,
  Container,
} from '@mui/material';

const nutritionists = [
  
  {
    name: 'Dr. Alice Johnson',
    title: 'Dietitian & Nutritionist',
    description: 'Specializes in weight management and personalized diet plans.',
    image: 'https://img.freepik.com/premium-photo/portrait-young-girl_93675-32518.jpg?w=360',
  },
  {
    name: 'Dr. Jane Smith',
    title: 'Clinical Nutritionist',
    description: 'Expert in clinical nutrition and dietary therapy.',
    image: 'https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?t=st=1721378464~exp=1721382064~hmac=904c81b37e6b5889b23db6e35e46763b84c7be19fcf5ab9f4e7b52a8c79107f8&w=740',
  },
  {
    name: 'Dr. John Doe',
    title: 'Sports Nutritionist',
    description: 'Focuses on nutrition for athletic performance and recovery.',
    image: 'https://img.freepik.com/free-photo/office-happy-man-work_144627-6324.jpg?t=st=1721378495~exp=1721382095~hmac=3c2fbc25c73af5a6164a1fd86f5d6c070d67b8c4a729f72ce1dd4d349fdfd5f7&w=360',
  },
  {
    name: 'Dr. Emily Davis',
    title: 'Pediatric Nutritionist',
    description: 'Specializes in child nutrition and dietary needs.',
    image: 'https://img.freepik.com/free-photo/portrait-business-woman-office_1398-6.jpg?t=st=1721378515~exp=1721382115~hmac=f19c68a1500e9662e8550753e7799d3ed469daa3f7fbc7ded9b1aa33ca04a92f&w=360',
  },
  {
    name: 'Dr. Rachel Green',
    title: 'Holistic Nutritionist',
    description: 'Integrates holistic approaches with modern nutrition science.',
    image: 'https://img.freepik.com/free-photo/elegant-business-woman_23-2147626296.jpg?t=st=1721378546~exp=1721382146~hmac=be0bc3bf8ad21595e024c0ac90eb67d272387dcbf2d119292cad79d08813e778&w=360',
  },
  // Your nutritionists data here
];

const NutritionistSelection = () => {
  const [selectedNutritionist, setSelectedNutritionist] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (nutritionist) => {
    setSelectedNutritionist(nutritionist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNutritionist(null);
  };

  return (
    <Box sx={{ marginTop: '32px' }}>
      <Typography variant="h5" gutterBottom align="center">
        Nutritionist Profiles
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {nutritionists.map((nutritionist, index) => (
          <Grid item xs={12} key={index}>
            <Paper sx={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{ marginRight: '16px', width: 56, height: 56 }}
                src={nutritionist.image}
                alt={nutritionist.name}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{nutritionist.name}</Typography>
                <Typography variant="body2">{nutritionist.title}</Typography>
                <Typography variant="body2">{nutritionist.description}</Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={() => handleOpen(nutritionist)}>
                View Profile
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Centering modal
      >
        <Fade in={open}>
          <Container maxWidth="sm" sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1 }}>
            {selectedNutritionist && (
              <>
                <Typography variant="h4" gutterBottom>
                  {selectedNutritionist.name}
                </Typography>
                <Avatar
                  sx={{ width: 120, height: 120, mb: 2 }}
                  src={selectedNutritionist.image}
                  alt={selectedNutritionist.name}
                />
                <Typography variant="h6">{selectedNutritionist.title}</Typography>
                <Typography variant="body1">{selectedNutritionist.description}</Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" color="primary">
                    Contact
                  </Button>
                </Box>
              </>
            )}
          </Container>
        </Fade>
      </Modal>
    </Box>
  );
};

export default NutritionistSelection;
