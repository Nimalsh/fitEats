import { Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, FormLabel, TableContainer, TableHead, TableRow, ButtonBase, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const orders = [
  { id: 1, user: 'User1', requestDate: '2024-07-15', title: 'Weight Loss', status: 'Not Replied', description: 'A program for losing weight', answer: 'Answer for weight loss', userImage: 'https://media.istockphoto.com/id/180866257/photo/design-is-his-passion.jpg?s=2048x2048&w=is&k=20&c=4Jmxxt1oo1bQdOooPl5anov8ZCcyLK1bDoz-FJaLxZ4=' },
  { id: 2, user: 'User2', requestDate: '2024-07-14', title: 'Weight Gain', status: 'Replied', description: 'Nutrition plan for gaining muscle mass', answer: 'Answer for weight gain', userImage: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
  { id: 3, user: 'User3', requestDate: '2024-07-13', title: 'Other', status: 'Replied', description: 'Customized dietary requirements', answer: 'Answer for other requirements', userImage: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg' },
  { id: 4, user: 'User4', requestDate: '2024-07-12', title: 'Weight Gain', status: 'Not Replied', description: 'Weight gain strategy', answer: 'Answer for weight gain strategy', userImage: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg' },
  { id: 5, user: 'User5', requestDate: '2024-07-11', title: 'Muscle gain', status: 'Replied', description: 'Building muscle mass plan', answer: 'Answer for muscle gain', userImage: 'https://t4.ftcdn.net/jpg/03/03/11/75/360_F_303117590_NNmo6BS2fOBEmDp8uKs2maYmt03t8fSL.jpg' },
  { id: 6, user: 'User6', requestDate: '2024-07-10', title: 'Others', status: 'Not Replied', description: 'General nutrition advice', answer: 'Answer for general advice', userImage: 'https://via.placeholder.com/150/6' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Not Replied':
      return '#f44336'; // Red
    case 'Replied':
      return '#4caf50'; // Green
    default:
      return '#9e9e9e'; // Grey
  }
};

function NutriQueries() {
  const [clickedUser, setClickedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const handleUserClick = (user) => {
    setClickedUser(user);
    console.log(`Clicked on user: ${user}`);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const RepliedDialog = ({ order }) => (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{order.title}</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={order.userImage} alt={order.user} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">{order.user}</Typography>
            <FormLabel component="legend">Question</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={order.description}
          disabled
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Typography variant="body2" color="textSecondary">{order.requestDate}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Avatar src={order.userImage} alt={order.user} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">{order.user}</Typography>
            <FormLabel component="legend">Answer</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={order.answer}
          disabled
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Typography variant="body2" color="textSecondary">{order.requestDate}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  const NotRepliedDialog = ({ order }) => {
    const [answer, setAnswer] = useState(order.answer || '');
  
    const handleAnswerChange = (value) => {
      setAnswer(value);
    };
  
    return (
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{order.title}</DialogTitle>
        <DialogContent sx={{ height: '300px' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={order.userImage} alt={order.user} sx={{ width: 36, height: 36, mr: 1 }} />
            <Box>
              <Typography variant="subtitle2">You</Typography>
            </Box>
          </Box>
          <ReactQuill
            value={answer}
            onChange={handleAnswerChange}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link']
              ],
            }}
            formats={[
              'bold', 'italic', 'underline',
              'list', 'bullet',
              'link'
            ]}
            style={{ height: '150px', marginBottom: '20px' }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
          <Typography variant="body2" color="textSecondary">{order.requestDate}</Typography>
          <Button onClick={handleCloseDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const NewQueryDialog = () => (
    <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>New Query</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Title"
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Description"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenNewDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => setOpenNewDialog(false)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  
  return (
    <Box position="relative" minHeight="400px" pb={8}>
    <Card className='mt-1'>
      <CardHeader
        title={"Queries"}
        sx={{ pt: 2, alignItems: "center" }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Post Date</TableCell>
              <TableCell align="center">Replied By</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 100 }}>
                  <Typography noWrap title={row.description}>
                    {row.description.length > 10 ? `${row.description.substring(0, 10)}...` : row.description}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {row.requestDate}
                </TableCell>
                <TableCell align="center">
                  {row.status === 'Replied' && (
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
                  )}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      backgroundColor: getStatusColor(row.status),
                      color: '#fff',
                      borderRadius: '4px',
                      padding: '0.25em 0.5em',
                      display: 'inline-block',
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ marginRight: 10 }}>
                  <Button variant="contained" color="primary" onClick={() => handleViewClick(row)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  
    {selectedOrder && (
          selectedOrder.status === 'Replied' ? (
            <RepliedDialog order={selectedOrder} />
          ) : (
            <NotRepliedDialog order={selectedOrder} />
          )
        )}
        {openNewDialog && <NewQueryDialog />}
  
        <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: -10, right: 16 }} onClick={() => setOpenNewDialog(true)}>
  <AddIcon />
</Fab>

  </Box>
  
    );
}

export default NutriQueries;
