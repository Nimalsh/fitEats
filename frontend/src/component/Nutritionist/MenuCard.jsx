import React from 'react';
import { Card, CardMedia, CardContent, Typography, Table, TableBody, TableCell, TableRow, Grid, Chip } from '@mui/material';

const MenuCard = ({ name, image, ingredients, nutrition, benefits }) => {
  return (
    <Card style={{ display: 'flex', flexDirection: 'row', width: '600px', height: '600px', marginRight: '10px' }}>
      <CardMedia
        component="img"
        style={{ width: '200px', objectFit: 'cover' }}
        image={image}
        alt="menu image"
      />
      <CardContent style={{ flex: '1 1 auto', padding: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">{name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Ingredients</Typography>
            <Table size="small">
              <TableBody>
                {ingredients.map((ingredient, index) => (
                  <TableRow key={index}>
                    <TableCell>{ingredient.name}</TableCell>
                    <TableCell>{ingredient.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '16px' }}>
            <Typography variant="h6">Nutritional Components</Typography>
            <Table size="small">
              <TableBody>
                {nutrition.map((nutrient, index) => (
                  <TableRow key={index}>
                    <TableCell>{nutrient.name}</TableCell>
                    <TableCell>{nutrient.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '16px' }}>
            <div>
              {benefits.map((benefit, index) => (
                <Chip key={index} size="small" label={benefit} style={{ marginRight: '4px', marginBottom: '4px' }} />
              ))}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
