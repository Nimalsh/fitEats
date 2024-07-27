import { Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ButtonBase, Avatar, Checkbox, styled } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const orders = [
  { id: 1, user: 'User1', qualifications: 'BSc Nutrition', specialization: 'Weight Loss', description: 'A program for losing weight', userImage: 'https://media.istockphoto.com/id/180866257/photo/design-is-his-passion.jpg?s=2048x2048&w=is&k=20&c=4Jmxxt1oo1bQdOooPl5anov8ZCcyLK1bDoz-FJaLxZ4=' },
  { id: 2, user: 'User2', qualifications: 'MSc Nutrition', specialization: 'Weight Gain', description: 'Nutrition plan for gaining muscle mass', userImage: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
  { id: 3, user: 'User3', qualifications: 'PhD Nutrition', specialization: 'Customized Diets', description: 'Customized dietary requirements', userImage: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg' },
  { id: 4, user: 'User4', qualifications: 'Certified Nutritionist', specialization: 'Weight Gain', description: 'Weight gain strategy', userImage: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg' },
  { id: 5, user: 'User5', qualifications: 'Sports Nutritionist', specialization: 'Muscle Gain', description: 'Building muscle mass plan', userImage: 'https://t4.ftcdn.net/jpg/03/03/11/75/360_F_303117590_NNmo6BS2fOBEmDp8uKs2maYmt03t8fSL.jpg' },
  { id: 6, user: 'User6', qualifications: 'Registered Dietitian', specialization: 'General Nutrition', description: 'General nutrition advice', userImage: 'https://via.placeholder.com/150/6' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const Nutritionistselection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [clickedUser, setClickedUser] = useState(null);

 

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUserClick = (user) => {
    setClickedUser(user);
    console.log(`Clicked on user: ${user}`);
    // Implement any other logic for user click, e.g., navigation or modal popup
  };

  const handleSubmit = () => {
    // Implement submit logic here
    console.log('Selected users:', selected);
  };

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
         
          sx={{ pt: 2, alignItems: "center", bgcolor: 'background.paper' }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  
                </StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Qualifications</StyledTableCell>
                <StyledTableCell>Specialization</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onChange={() => handleSelect(row.id)}
                    />
                  </StyledTableCell>
                 
                  <StyledTableCell>
                    <ButtonBase onClick={() => handleUserClick(row.user)}>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <Avatar src={row.userImage} alt={row.user} sx={{ width: 32, height: 32 }} />
                        <Typography
                          variant="body2"
                          sx={{ marginLeft: 1, textDecoration: clickedUser === row.user ? 'underline' : 'none' }}
                        >
                          {row.user}
                        </Typography>
                      </Box>
                    </ButtonBase>
                  </StyledTableCell>
                  
                  <StyledTableCell>
                    {row.qualifications}
                  </StyledTableCell>
                  
                  <StyledTableCell>
                    {row.specialization}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Box mt={2} mr={10} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
         Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Nutritionistselection;
