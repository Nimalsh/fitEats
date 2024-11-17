// import React, { useState } from 'react';
// import { CardHeader, Typography, FormControl, Radio, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel } from '@mui/material';
// import BackgroundImage from '../../assets/images/Background_image.png';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { OrderTable } from './OrderTable';

// const orderStatus = [
//   { label: "All", value: "ALL" },
//   { label: "Pending", value: "Pending" },
//   { label: "On Delivery", value: "On Delivery" },
//   { label: "Completed", value: "Completed" },
//   { label: "Cancelled", value: "Cancelled" },
// ];

// export const Orders = () => {
//   const [filterValue, setFilterValue] = useState("ALL");
//   const [selectedDate, setSelectedDate] = useState("");

//   const handleFilter = (e, value) => {
//     setFilterValue(value);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleCalendarSelect = (date) => {
//     setSelectedDate(date);
//     // Handle logic for selecting date
//   };

//   return (
//     <div 
//       style={{
//         backgroundImage: `url(${BackgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         width: '100%',
//         color: 'white'
//       }}
//     >
//       <div className='px-2 mt-60px'>
//       <Typography sx={{ paddingBottom: "1rem", color: "white",paddingTop:'20px',paddingLeft:'20px' }} variant='h5'>
//             Orders
//       </Typography>
//         <div
//           style={{
//             backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//             borderRadius: '10px', 
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             display: 'flex',
//             flexDirection: 'row',
//             textAlign: 'left',
//             margin: '20px',
//             padding: '30px'
//           }}
//         >

//         <div 
//           style={{
//             backgroundColor: 'black',
//             borderRadius: '10px',
//             padding: '20px',
//             marginBottom: '20px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             display: 'flex',
//             justifyContent: 'space-between',
//             width:'50%',
//             marginRight:'30px',
//           }}
//         >
//           <div>
//             <Typography variant="h6" sx={{ color: "white" }}>Date</Typography>
//             {/* Replace with your calendar component */}
//             <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px',color: 'white' }}>
//               <CalendarTodayIcon sx={{ marginRight: '10px', color: 'white' }} />
//               <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e)} style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', border: 'none', borderRadius: '4px', padding: '8px' }} />
//             </div>
//           </div>
//           <div>
//             <Typography variant="h6" sx={{ color: "white" }}>Orders Number</Typography>
//             <button className="details-button">11</button>
//           </div>
//           <div>
//             <Typography variant="h6" sx={{ color: "white" }}>Income</Typography>
//             <button className="details-button">LKR 28 750.00</button>
//           </div>
//         </div>

//         </div>
//         <div 
//           style={{
//             padding: '20px',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//             borderRadius: '8px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//           }}
//         >
//           <Typography sx={{ paddingBottom: "1rem", color: "white" }} variant='h5'>
//             Order Status
//           </Typography>
//           <FormControl sx={{ padding: "2rem", color: "white", backgroundColor: 'rgba(0, 0, 0, 0.5)',width:'60%' }}>
//             <RadioGroup onChange={handleFilter} row name='category' value={filterValue}>
//               {orderStatus.map((item) => (
//                 <FormControlLabel
//                   key={item.label}
//                   value={item.value}
//                   control={<Radio />}
//                   label={item.label}
//                   sx={{ color: "white" }}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </div>
//         <OrderTable filterValue={filterValue} />
//       </div>
//     </div>
//   );
// };

import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { OrderTable } from './OrderTable';

const orderStatus = [
  {label:"All" , value:"ALL"},
  {label:"Pending" , value:"PENDING"},
  {label:"On Delivary" , value:"ON DELIVARY"},
  {label:"Completed" , value:"COMPLETED"},
  {label:"Cancelled" , value:"CANCELLED"},
]

export const Orders = () => {

  const [filterValue, setFilterValue] = useState();

  const handleFilter = (e,value) => {
    setFilterValue(value)
  }
  return (
    <div className='px-2'>
      <Card className='p-5'>
        <Typography sx={{paddingBottom: "1rem"}} variant='h5'>
          Order Status
        </Typography>

        <FormControl>
          <RadioGroup onChange={handleFilter} row name='category' value={filterValue || "all"}>
            {orderStatus.map((item) => <FormControlLabel
            key={item.label}
            value={item.value}
            control={<Radio/>}
            label={item.label}
            sx={{color:"white"}}
            />
          )}
          </RadioGroup>
        </FormControl>
      </Card>

      <OrderTable/>
    </div>
  )
}

