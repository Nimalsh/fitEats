import React, {useEffect} from 'react';
import {ThemeProvider, Box, Typography, Tab, Tabs, TextField} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 

// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';

import theme from '../../../assets/theme/theme'; //to use theme provider,need to import this
import '../../../assets/css/Dashboard-admin.css';

// import { width } from '@mui/system';
// import { useParams } from 'react-router-dom';

import IncomeChart from './IncomeChart2';
import SignupChart from './SignupChart';
import AccountUpgradeChart from './AccountUpgrade';

import TabPanel from '../../TabPanel';



//------------------------------styles for calendar
const popperSx = {
    "& .MuiPaper-root": {
        backgroundColor: "rgba(120, 120, 120, 0.2)",
        color:"#fff",
        marginTop: "10px",
    },
    "& .css-j1tbx-MuiButtonBase-root-MuiPickersDay-root:hover" :{
        backgroundColor:"#95CD41"
    },
    "& .css-1d8508y-MuiTypography-root": {
        color:"#fff",
    },
    "& .MuiSvgIcon-root":{
        color: "white",
    },
};


function Charts(props) {

    var startDate1 = new Date();
    startDate1.setMonth(startDate1.getMonth() - 3);
    const[startDate, setStartDate] = React.useState(startDate1);
    // startDate.setMonth(startDate.getMonth() - 3);
    var endDate1 = new Date();
    const[endDate, setEndDate] = React.useState(endDate);
    // console.log(endDate1.getTime()-startDate1.getTime());
    // console.log(startDate)
    // console.log(endDate1)
    // console.log(props.orders);

    const orders = props.orders;
    const validOrders = [];

    var datetime,orderDate;

    Object.keys(orders).map((key, index) => (
        datetime = orders[key].orderDate.split("T"),
        orderDate = new Date(datetime[0]),
        ((orderDate > startDate1) && (orderDate < endDate1))? validOrders.push(orders[key]):false
    ))


    //------------------------------------------------------------handeling tabs    
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //------------------------------------------------------------handeling calender changing dates
    const handleChangeStartDate = (newValue) => {
        startDate1 = newValue;
        if(endDate1.getTime()-startDate1.getTime() < 7948800000){
            alert("Minimum date range must be 3 months");
            newValue = startDate;
        }
        setStartDate(newValue);
        // console.log("startDate"+ startDate)
    };
    
    const handleChangeEndDate = (newValue) => {
        endDate1 = newValue;
        setEndDate(endDate1);
        // console.log(endDate)
    };
    
    
    
                
    

  return (
    <ThemeProvider theme={theme}>
        {/* ------------------------------------------------------------tabs box */}
        <Box sx={{
            backgroundColor: "rgba(23, 23, 23, 0.8)",
            color: "primary",
            padding: "1%",
            paddingTop: "3%"}}>

            {/* ------------------------------------------------------------time box */}
            <Box
            sx={{
                display:"flex",
                flexDirection:"row",
                columnGap: "2%",
                fontSize: "10px",
                justifyContent: "flex-end",
                paddingRight: "5%",
                alignItems: "center",
                
            }}>
                
                {/* ------------------------------------------------------------calendar box */}
                <Box
                sx={{
                    width:"20%",
                    backgroundColor: "rgba(45, 45, 45, 1)",
                    border: '1px solid rgba(255, 255, 255,0.6)',
                    borderRadius: '5px',
                }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} sx={{color:"#fff"}}>
                            <DatePicker 
                                // views={[range]}
                                value = {startDate}
                                onChange={handleChangeStartDate}
                                renderInput = {(params) => <TextField {...params} />}
                                PopperProps={{
                                    sx: popperSx
                                }}
                            />
                        </LocalizationProvider>
                </Box>
                <Typography color="primary">To</Typography>
                <Box
                sx={{
                    width:"20%",
                    backgroundColor: "rgba(45, 45, 45, 1)",
                    border: '1px solid rgba(255, 255, 255,0.6)',
                    borderRadius: '5px',
                }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker 
                                // views={[range]}
                                selected={endDate}
                                onChange={handleChangeEndDate}
                                renderInput = {(params) => <TextField {...params} />}
                                PopperProps={{
                                    sx: popperSx
                                }}
                            />
                        </LocalizationProvider>
                </Box>
            </Box>
            
            {/* ------------------------------------------------------------tabs */}
            <Tabs
                value={value}
                onChange={handleChange}
                textColor= "primary"
                TabIndicatorProps={{style: {background:'#95CD41'}}}
                sx = {{
                    color: "primary",
                    mb: "1%",
                    ml: "1%",
                }}
            >
                <Tab value={0} label={
                    <Typography varient="h4" color="#fff" fontSize="15px">Income Chart</Typography>}> 
                </Tab>
                <Tab value={1} label={
                    <Typography varient="h4" color="#fff" fontSize="15px">Signup Chart</Typography>}> 
                </Tab>
                <Tab value={2} label={
                    <Typography varient="h4" color="#fff" fontSize="15px">Account Upgrading</Typography>}> 
                </Tab>
            </Tabs>

            {/* ------------------------------------------------------------graphs changes with tabs */}
            <TabPanel value={value} index={0}>
                <IncomeChart data={validOrders}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignupChart />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AccountUpgradeChart />
            </TabPanel>
        </Box>
    </ThemeProvider>
  )
}

export default Charts