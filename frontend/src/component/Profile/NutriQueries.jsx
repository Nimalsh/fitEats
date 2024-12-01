import { Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, FormLabel, TableContainer, TableHead, TableRow, ButtonBase, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Tabs, Tab } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { InputBase,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {getUserQueries,createQuery } from '../State/Queries/Action';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clickedUser, setClickedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('jwt');
  const [description, setDescription] = useState("");
  const [openQueryDialog, setOpenQueryDialog] = useState(false);

 

  const { queries, loading, error } = useSelector((state) => state.queries);

  
  useEffect(() => {
    dispatch(getUserQueries(token)); // Replace with actual JWT token
  }, [dispatch]);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = queries
    ? queries.filter((query) => {
        const matchesSearch =
          query.query.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab =
          tabValue === 0 ||
          (tabValue === 1 && query.status === "Replied") ||
          (tabValue === 2 && query.status === "Pending");

        return matchesSearch && matchesTab;
      })
    : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async () => {
    if (description.trim()) {
      try {
        // Dispatch the createQuery action
        await dispatch(createQuery(token, description));
        // Fetch updated user queries
        dispatch(getUserQueries(token));
        setDescription("");
        setOpenQueryDialog(false);
      } catch (error) {
        console.error("Error creating query:", error);
      }
    } else {
      alert("Description cannot be empty!");
    }
  };

  
  

  const RepliedDialog = ({ order }) => (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{order.title}</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={order.userImage} alt={order.user} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">{order.username}</Typography>
            <FormLabel component="legend">Query</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={order.query}
          disabled
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Typography variant="body2" color="textSecondary">{order.postDate}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Avatar src={order.userImage} alt={order.user} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">{order.nutritionistName}</Typography>
            <FormLabel component="legend">Answer</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={order.reply}
          disabled
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Typography variant="body2" color="textSecondary">{order.repliedDate}</Typography>
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
    const [answer, setAnswer] = useState(order.query || '');
  
    const handleAnswerChange = (value) => {
      setAnswer(value);
    };
  
    return (
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{order.title}</DialogTitle>
        <DialogContent sx={{ height: '300px' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={order.userImage} alt={order.username} sx={{ width: 36, height: 36, mr: 1 }} />
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
          <Typography variant="body2" color="textSecondary">{order.postDate}</Typography>
          <Button onClick={handleCloseDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

   
  return (
    <Box position="relative" minHeight="400px" pb={8}>
  <Card className='mt-1'>
    <CardHeader  sx={{ pt: 2, alignItems: "center" }} />
    <Box display="flex" alignItems="center" px={2} mt={2}>
      <Box display="flex" alignItems="center" flexGrow={1}>
      <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="All" />
          <Tab label="Replied" />
          <Tab label="Not Replied" />
        </Tabs>
      </Box>
      <Box display="flex" alignItems="center" ml={1}>
      <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ border: '1px solid #ccc', borderRadius: '4px', pl: 2, pr: 2, py: 1 }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
    </Box>


        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="Left">Description</TableCell>
                <TableCell align="center">Post Date</TableCell>
                <TableCell align="center">Replied By</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left" sx={{ maxWidth: 100 }}>
                    <Typography noWrap title={row.description}>
                      {row.query.length > 30
                        ? `${row.query.substring(0, 30)}...`
                        : row.query}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: 100 }}>
                    <Typography >
                        {row.postDate}
                    </Typography>
                  </TableCell>
                 
                  <TableCell align="center">
                    {row.status === "Replied" && (
                      <ButtonBase onClick={() => handleUserClick(row.user)}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <Avatar src={row.userImage} alt={row.user} sx={{ width: 32, height: 32 }} />
                          <Typography variant="body2" sx={{ marginLeft: 1 }}>
                            {row.nutritionistName}
                          </Typography>
                        </Box>
                      </ButtonBase>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        backgroundColor: getStatusColor(row.status),
                        color: "#fff",
                        borderRadius: "4px",
                        padding: "0.25em 0.5em",
                        display: "inline-block",
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
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
      
      <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: -10, right: 16 }} onClick={() => setOpenQueryDialog(true)}>
        <AddIcon />
      </Fab>
      <Dialog 
  open={openQueryDialog} 
  onClose={() => setOpenQueryDialog(false)} 
  maxWidth="sm" 
  fullWidth
>
  <DialogTitle>New Query</DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      label="Description"
      multiline
      rows={6}
      value={description}
      onChange={(e) => setDescription(e.target.value)} 
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenQueryDialog(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSubmit} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}

export default NutriQueries;
