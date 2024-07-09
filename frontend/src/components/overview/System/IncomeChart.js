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
import authHeader from '../../../services/auth-header';
import { min } from 'date-fns';
import { MinimizeTwoTone } from '@mui/icons-material';
// import _ from '@underscore';

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

const chartSx = {
    "& .css-cm3ohd.Target-root": {
        fill: "#fff"
    }

}

function IncomeChart(props) {

 
  const chData = [
    { Nutrition: 'Cal.', val: 0},
    { Nutrition: 'Fat', val: 0 },
    { Nutrition: 'Prot.', val: 0 },
    { Nutrition: 'Carbo', val: 0},
  ];

  console.log(props.data)

  // const [data, setData] = React.useState[props.data];

  // var groupedByYear = _.groupBy(data, function(item) {
  //   return item.date.substring(0,4);
  // });

  // const groupByYear = data.groupByToMap(order => {
  //   return order.order.category;
  // });

  // console.log(groupByCategory); 

  


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

    <Chart
      data={chartData}
      style={{ backgroundColor: "rgba(23, 23, 23, 0.8)", minWidth: "110vh" }}
      sx = {chartSx}
    >

      <ArgumentAxis fill="#fff !import" />
      <ValueAxis max={10} fill="#fff !import" />

      <BarSeries
        valueField="val"
        argumentField="Nutrition"
        fill={"#fff"}
      />

      <Animation />
    </Chart>
)
}

export default IncomeChart