import { Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, FormLabel, TableContainer, TableHead, TableRow, ButtonBase, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Tabs, Tab } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { InputBase,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getUserQueries,addReply,getQueries } from '../State/Queries/Action';

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

function Query() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clickedUser, setClickedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('jwt');
  const [reply, setReply] = useState("");
  const [openQueryDialog, setOpenQueryDialog] = useState(false);
  const { queries, loading, error } = useSelector((state) => state.queries);
  
const [openRepliedDialog, setOpenRepliedDialog] = useState(false);
const [openNotRepliedDialog, setOpenNotRepliedDialog] = useState(false);

 
   useEffect(() => {
    dispatch(getQueries(token)); // Replace with actual JWT token
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
  const handleReplyChange = (e) => {
    setReply(e.target.value); // Update the reply state on change
  };

 
  const handleSave = async (queryId) => {
    if (reply.trim()) {
      try {
        // Dispatch the addReply action with queryId
        await dispatch(addReply(token, queryId, reply));
        // Fetch updated queries
        dispatch(getQueries(token)); // or dispatch(getUserQueries(token)) if that's intended
        setReply("");
        setOpenNotRepliedDialog(false);
        
      } catch (error) {
        console.error("Error in replying:", error);
      }
    } else {
      alert("Reply cannot be empty!");
    }
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    if (order.status === "Replied") {
      setOpenRepliedDialog(true);
      setOpenNotRepliedDialog(false);
    } else if (order.status === "Pending") {
      setOpenNotRepliedDialog(true);
      setOpenRepliedDialog(false);
    }
  };
  

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
  {row.query.length > 30 ? `${row.query.substring(0, 30)}...` : row.query}
</Typography>

                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: 100 }}>
                    <Typography >
                        {row.postDate}
                    </Typography>
                  </TableCell>
                 
                  <TableCell align="center">
                    {row.status === "Replied" && (
                      <ButtonBase >
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
  <>
    {/* Dialog for replied query */}
    <Dialog open={openRepliedDialog} onClose={() => setOpenRepliedDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{selectedOrder.title}</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={selectedOrder.userImage} alt={selectedOrder.user} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">{selectedOrder.username}</Typography>
            <FormLabel component="legend">Query</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={selectedOrder.query}
          disabled
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Typography variant="body2" color="textSecondary">{selectedOrder.postDate}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Avatar src={selectedOrder.userImage} alt={selectedOrder.user} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">{selectedOrder.nutritionistName}</Typography>
            <FormLabel component="legend">Reply</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={selectedOrder.reply}
          disabled
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Typography variant="body2" color="textSecondary">{selectedOrder.repliedDate}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenRepliedDialog(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>

    {/* Dialog for not replied query */}
    <Dialog open={openNotRepliedDialog} onClose={() => setOpenNotRepliedDialog(false)} maxWidth="sm" fullWidth>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={selectedOrder.userImage} alt={selectedOrder.user} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">{selectedOrder.username}</Typography>
            <FormLabel component="legend">Query</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={selectedOrder.query}
          disabled
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Typography variant="body2" color="textSecondary">{selectedOrder.postDate}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Avatar src={selectedOrder.userImage} sx={{ width: 36, height: 36, mr: 1 }} />
          <Box>
            <FormLabel component="legend">Reply</FormLabel>
          </Box>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={reply}
          onChange={handleReplyChange}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Typography variant="body2" color="textSecondary">{selectedOrder.postDate}</Typography>
        <Button onClick={() => handleSave(selectedOrder.queryId)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </>
)}

      
    </Box>
  );
}

export default Query;   