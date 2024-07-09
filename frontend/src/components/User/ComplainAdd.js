import * as React from 'react';
import { useState } from 'react';
import { Box,TextareaAutosize,Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Colours } from '../../assets/theme/theme';//to use theme provider,need to import this
import axios from 'axios';
import authHeader from "../../services/auth-header";


function ComplainAdd() {

  const [imageData, setImageData] = useState(null);

  const initialValues = {Resturant_Name:"",Complaint_Title:"",Complaint:""};

  const [formValues,setFormValues] = React.useState(initialValues);
  
  //sending data to the backend
  const handleSubmit = (e) =>{
    e.preventDefault();
    //console.log(formValues);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    //console.log(date);
    
    // const Imagedata = new FormData();
    
    const complain = {
      restauratId: formValues.Resturant_Name,
      complainTitle: formValues.Complaint_Title,
      complainDescription: formValues.Complaint,
      complainStatus:"accepted",
      addedDate:date,
      // image:imageData
     
    }
    //console.log(typeof(complain));
    //console.log(complain);
     imageData.append('restauratId',formValues.Resturant_Name);
     imageData.append('complainTitle',formValues.Complaint_Title);
     imageData.append('complainDescription',formValues.Complaint);
     imageData.append('complainStatus',"pending");
     imageData.append('addedDate',date);
     //console.log(imageData);

    //console.log(authHeader());
    axios.post("http://localhost:8072/FoodiFy/User/addComplains", imageData,{ headers: authHeader() })
            .then(data => {
                console.log("Entry access sucessfull")
                window.location.reload(false);
               
                
            })
            .catch(error => {
                  console.log(error)
                //  console.log("There is an error")

            })

  };

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormValues({ ...formValues,[name]:value});
  }

//sending data to image data
  const handleUploadClick = event => {
    let file = event.target.files[0];
    const imageData = new FormData();
    imageData.append('Image', file);
    setImageData(imageData);

    const {name,value} = event.target;
    setFormValues({ ...formValues,[name]:value})
    // setImagePreview(URL.createObjectURL(file));
}

  
   
  return (


     <Box color="#fff" bgcolor="#171717" opacity="50" sx= {{ml:"5%",borderRadius: '20px',p:"3%", width:{lg:"45vw",xs:"55vw"} }} >
    
      <Typography variant="h4" gutterBottom sx= {{fontSize:{lg:"230%",xs:"180%"} }} >
          Add Complaint
      </Typography>


      <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={3} sx={{ input: { color: "#fff" }, "label": {color: "#fff"}, p:"1%" }} >
     
 
        <Grid item xs={12}>
          <TextField
          sx={{
                input:
                  { color: Colours.formWhite },
                "label": { color: Colours.formWhite, fontFamily: 'Poppins', },
                "& label.Mui-focused": {
                  color: Colours.formWhite
                },


              }}

              margin="normal"
              required
              fullWidth

              label="Resturant_Name"
              name='Resturant_Name'
              autoComplete='name'

              id="Restaurant_Name"
              value={formValues.Resturant_Name}
              onChange={handleChange}
              

            />
        </Grid>

        <Grid item xs={12}>
          {/* <TextField
            required
            id="Complaint_Title"
            name="Complaint_Title"
            label="Complaint Title"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            sx={{"& label.Mui-focused": {
                color:"#fff"
              }}}  
            value={formValues.Complaint_Title}
            onChnage={handleChange}  
          /> */}

        <TextField
          sx={{
                input:
                  { color: Colours.formWhite },
                "label": { color: Colours.formWhite, fontFamily: 'Poppins', },
                "& label.Mui-focused": {
                  color: Colours.formWhite
                },


              }}

              margin="normal"
              required
              fullWidth

              label="Complaint_Title"
              name='Complaint_Title'
              autoComplete='name'

              id="Complaint_Title"
              value={formValues.Complaint_Title}
              onChange={handleChange}
              

            />
        </Grid>
        
         <Grid item xs={12} > 
        <TextareaAutosize
      
              sx={{
                input:
                  { color: Colours.formWhite },
                "label": { color: Colours.formWhite, fontFamily: 'Poppins', },
                "& label.Mui-focused": {
                  color: Colours.formWhite
                },


              }}

              margin="normal"
              required
              fullWidth
              aria-label="minimum height"
              label="Complaint"
              name='Complaint'
              minRows={10}
              style={{ width: "100%"}}
              autoComplete='name'
              placeholder="Complaint"
              id="Complaint"
              value={formValues.Complaint}
              onChange={handleChange}
              


        />
        </Grid> 
        
         <Grid item xs={12} md={4}>
         <TextField type="file" name='Image' onChange={handleUploadClick} />

            {/* <Button variant="contained" sx={{color:'#FFFFFF',backgroundColor:"#3E3E3E", '&:hover': {
                backgroundColor: Colours.darkgray,
              }}}>
              Add a photo
            </Button> */}
        </Grid> 


        <Box mt="8%" marginLeft="35%"  display="flex" flexDirextion="row" >

              <Button type="submit" variant="outlined" style={{marginRight:"5%", color:'#95CD41',borderColor: "#95CD41"
              ,"&:hover": {
              backgroundColor: "#15e577",
              borderColor:"#564345"
              } }}>
              Send
              </Button>

              <Button variant="outlined" style={{color:'#FAC213', borderColor: "#FAC213",
              "&:hover": {
              backgroundColor: "#15e577",
              borderColor:"#564345"
              } }}>
              Clear
              </Button>

        </Box>

  
      </Grid>
      </form>

     </Box>

     

  )
}

export default ComplainAdd