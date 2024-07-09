import * as React from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Box, Typography, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import authHeader from '../../services/auth-header';

//------------------------------styles for calendar
const popperSx = {
  "& .MuiPaper-root": {
    backgroundColor: "rgba(120, 120, 120, 0.5)",
    color: "#000",
    marginTop: "10px",
  },
  "& .css-j1tbx-MuiButtonBase-root-MuiPickersDay-root:hover": {
    backgroundColor: "#95CD41"
  },
  "& .css-1d8508y-MuiTypography-root": {
    color: "#000",
  },
  "& .MuiSvgIcon-root": {
    color: "#000",
  },
};


function SummaryChart() {

 
  const chData = [
    { Nutrition: 'Cal.', val: 0},
    { Nutrition: 'Fat', val: 0 },
    { Nutrition: 'Prot.', val: 0 },
    { Nutrition: 'Carbo', val: 0},
  ];
  
  const chartHead = "Chart of Nutritions Summary";

  //------------------------------------------------------------handeling calender changing dates
  const [date, setDate] = React.useState(new Date());
  const [chartData, setchartData] = React.useState(chData);

  useEffect(() => {

    axios.get("http://localhost:8072/FoodiFy/Premium/getIntakeChart", { headers: authHeader() })
      .then(data => {
        // this part if sucess

        const details = data.data;
        
        const chData = [
          { Nutrition: 'Cal.', val: details.calaries },
          { Nutrition: 'Fat', val: details.fat },
          { Nutrition: 'Prot.', val: details.protein },
          { Nutrition: 'Carbo', val: details.carbo },
        ];

        setchartData(chData);


      })
      .catch(error => {
        console.log(error);

      });
    }, []);


  const handleChangeDate = (newValue) => {

    axios.get("http://localhost:8072/FoodiFy/Premium/searchbydateintake/"+newValue, { headers: authHeader() })
      .then(data => {
        // this part if sucess

        const details = data.data;

        const chData = [
          { Nutrition: 'Cal.', val: details.calaries },
          { Nutrition: 'Fat', val: details.fat },
          { Nutrition: 'Prot.', val: details.protein },
          { Nutrition: 'Carbo', val: details.carbo },
        ];

        setchartData(chData);

      })
      .catch(error => {
        console.log(error);

      });
  


  setDate(newValue);

};

return (
  <Paper sx={{ backgroundColor: "#eee", borderRadius: "20px", mb: "20px" }}>

    <Box sx={{ ml: "5%" }} pt={3} >

      <Typography variant="h5" component="h2" textAlign="center" color="#171717" fontWeight="bold">
        {chartHead}
      </Typography>

      <Box
        sx={{
          width: "15%",
          backgroundColor: "#999",
          borderRadius: '5px',
        }}>

        <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ color: "#000" }}>
          <DatePicker
            // views={[range]}
            value={date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
            PopperProps={{
              sx: popperSx
            }}
          />
        </LocalizationProvider>
      </Box>


    </Box>

    <Chart
      data={chartData}
      style={{ backgroundColor: "#eee" }}
    >

      <ArgumentAxis fill="#fff !import" />
      <ValueAxis max={10} fill="#fff !import" />

      <BarSeries
        valueField="val"
        argumentField="Nutrition"
        fill={"#95CD41"}
      />

      <Animation />
    </Chart>
  </Paper>
)
}

export default SummaryChart