import * as React from 'react';
import { useState , useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import theme, { Colours } from '../../assets/theme/theme';
//to use theme provider,need to import this
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import  '../../assets/css/Profile.css';
import { fontFamily } from '@mui/system';
import authHeader from '../../services/auth-header';
import axios from "axios";
import { TextareaAutosize } from '@mui/material';
// import MultiSelectComponent from './multiselect';
import { BannerContainer, BannerContainer2, BannerContent, BannerContent2, BannerLogo, BannerTitle, BannerTitle2,Userprofilephoto } from '../../assets/theme/RBanner';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

////////////////////////////////////////////input deseases
const top100Films = [
  { title: 'Pizza', year: 1994 },
  { title: 'Veg soup', year: 1972 },
  { title: 'Soup', year: 1974 },
  { title: 'Salad', year: 2008 },
  { title: 'Pizza', year: 1957 },
  { title: "Pizza", year: 1993 },
  { title: 'Pizza', year: 1994 },
  {
    title: 'Pizza',
    year: 2003,
  },
  { title: 'Pizza', year: 1966 },
  { title: 'Pizza', year: 1999 },
  {
    title: 'Pizza',
    year: 2001,
  },
  {
    title: 'Pizza',
    year: 1980,
  },
  { title: 'Pizza', year: 1994 },
  { title: 'Pizza', year: 2010 },
  {
    title: 'Pizza',
    year: 2002,
  },
  { title: "Pizza", year: 1975 },
  { title: 'Pizza', year: 1990 },
  { title: 'Pizza', year: 1999 },
  { title: 'Pizza', year: 1954 },
  {
    title: 'Pizza',
    year: 1977,
  },
  { title: 'Soup', year: 2002 },
  { title: 'Pizza', year: 1995 },
  { title: 'Pizza', year: 1991 },
  { title: "Soup", year: 1946 },
  { title: 'Pizza', year: 1997 },
  { title: 'Pizza', year: 1995 },
  { title: 'Pizza', year: 1994 },
  { title: 'Soup', year: 2001 },
  { title: 'Soup', year: 1998 },
  { title: 'Pizza', year: 1968 },
  { title: 'Soup', year: 1998 },
  { title: 'Soup', year: 2014 },
];

////////////////////////////////////////////////////////////


export default function AddressForm() {

  const frontendFrameworks = [
    'React',
    'Vue',
    'Angular',
    'Svelte',
    'Ember',
    'Preact'
  ];
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    // Let's select a random element from the array while mounting the element for the first time
    let randomSingleFramework =
      frontendFrameworks[Math.floor(Math.random() * frontendFrameworks.length)];
    setSelection([randomSingleFramework]);
  }, []);

  const [imageData, setImageData] = useState(null);

  const initialValues = {Telephone_No:"",City:"",Complaint:""};

  const [formValues,setFormValues] = React.useState(initialValues);
  const[isSubmit,setIsSubmit]=React.useState(false);

  //sending data to the backend
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formValues);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    console.log(date);
    
    // const Imagedata = new FormData();
    
    const complain = {
      restauratId: formValues.Telephone_No,
      complainTitle: formValues.City,
      
      // image:imageData
     
    }
    console.log(typeof(complain));
    console.log(complain);
     imageData.append('Telephone_No',formValues.Telephone_No);
     imageData.append('City',formValues.City);
     console.log(imageData);

    console.log(authHeader());
    axios.post("http://localhost:8072/FoodiFy/User/addprofiledetails", imageData,{ headers: authHeader() })
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

const [profileData, setData] = useState([]);
const profileImage=profileData.bImage;

useEffect((event) => {

  axios.get(`http://localhost:8072/FoodiFy/User/editprofile`, {headers: authHeader()})
      .then(data => {
          // this part if sucess
          setData(data.data)
          
      })
      .catch(error => {
          console.log("There is an error");
      });

}, []);

return(
  <Container 
  sx={{
    backgroundColor:Colours.dark ,
    width:'40%',
    marginTop:'4%',
    marginBottom:'4%',
    borderRadius:"33px",
    paddingBottom:"2%",
    paddingTop:"2%"
   
    }}>

  <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
  <Typography sx={{fontFamily:"Poppins",marginLeft:"35%",marginBottom:"5%", marginTop:"0%",color:Colours.formWhite,fontWeight:''}} variant="h6" gutterBottom >
        Profile Details
      </Typography>
  <Grid container spacing={3} sx={{ input: { color: "#fff" }, "label": {color: "#fff"}, p:"1%" }} >
  
  <Userprofilephoto 
       src={ `data:image/jpeg;base64,${profileImage}`}
  />
 
  <TextField sx={{marginLeft:'50%'}} type="file" name='Image' onChange={handleUploadClick} />

{/* <Button variant="contained" sx={{color:'#FFFFFF',backgroundColor:"#3E3E3E", '&:hover': {
    backgroundColor: Colours.darkgray,
  }}}>
  Add a photo
</Button> */}
</Grid> 
  <Grid item xs={12} >
        <Typography variant="h4" gutterBottom sx= {{color: Colours.formWhite,fontSize:{lg:"100%",xs:"100%"} }} >
          User Name
      </Typography>
          <TextField
          sx={{ input: 
            { color: Colours.formWhite }, 
            "label": {color: Colours.formWhite,  fontFamily:'Poppins'},
            "& label.Mui-focused": {
            color:Colours.formWhite
            },backgroundColor:Colours.transparenceGrey,
          
            }}
            id="userName"
            name="userName"
            placeholder={profileData.userName}
            fullWidth
            autoComplete="given-name"
            variant="filled"
           
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx= {{color: Colours.formWhite,fontSize:{lg:"100%",xs:"100%"} }} >
              Email
          </Typography>
           <TextField
           sx={{ input: 
            { color: Colours.formWhite }, 
            "label": {color: Colours.formWhite,fontFamily:'Poppins'},
            "& label.Mui-focused": {
            color:Colours.formWhite
            },backgroundColor:Colours.transparenceGrey
        
            }}
            id="Email"
            name="Email"
            placeholder={profileData.email}
            fullWidth
            autoComplete="email"
            variant="filled"
          />
        </Grid>

    <Grid item xs={12}>
        <Typography variant="h4" gutterBottom sx= {{color: Colours.formWhite,fontSize:{lg:"100%",xs:"100%"} }} >
              Telephone No
          </Typography>
           <TextField
          sx={{ input: 
            { color: Colours.formWhite }, 
            "label": {color: Colours.formWhite,  fontFamily:'Poppins'},
            "& label.Mui-focused": {
            color:Colours.formWhite
            },backgroundColor:Colours.transparenceGrey,
          
            }}
            required
            id="userName"
            name="Telephone_No"
            placeholder={profileData.telephone}
            onChange={handleChange}
          
            fullWidth
            autoComplete="given-name"
            variant="filled"
           
          />
    </Grid>

    <Grid item xs={12}>
    <Typography variant="h4" gutterBottom sx= {{color: Colours.formWhite,fontSize:{lg:"100%",xs:"100%"} }} >
              Home Town
    </Typography>
        <TextField
            sx={{ input: 
              { color: Colours.formWhite }, 
              "label": {color: Colours.formWhite,fontFamily:'Poppins'},
              "& label.Mui-focused": {
              color:Colours.formWhite
              },backgroundColor:Colours.transparenceGrey
          
              }}
            id="City"
            name="City"
            value={formValues.City}
            onChange={handleChange}
            placeholder={profileData.location}
            fullWidth
            autoComplete="City"
            variant="filled"
          />
    </Grid>
    <Grid item xs={12} sm={6} >
        <Typography variant="h4" gutterBottom sx= {{color: Colours.formWhite,fontSize:{lg:"100%",xs:"100%"} }} >
              Prefered food items
          </Typography>
         <Typography sx={{color: Colours.formWhite,fontFamily:'Poppins',marginLeft:"0%",backgroundColor:Colours.grey,paddingLeft:"2%",fontColor:Colours.gray1}} >
          <p>Bonelass Daing</p>
          <p>Tulingan Sa </p>
          <p>Tilapia in Tausi</p>
          <p>Tulingan Sa</p>
          </Typography>
      </Grid>
      {/* <Grid item xs={12} sm={6} >
        <Typography variant="h4" gutterBottom sx= {{color: Colours.formWhite,fontSize:{lg:"100%",xs:"100%"} }} >
              Add food items
          </Typography>
          <TextField
            sx={{ input: 
              { color: Colours.formWhite }, 
              "label": {color: Colours.formWhite,fontFamily:'Poppins'},
              "& label.Mui-focused": {
              color:Colours.formWhite
              },backgroundColor:Colours.transparenceGrey
          
              }}
            id="City"
            name="City"
            value={formValues.City}
            onChange={handleChange}
            // placeholder={profileData.location}
            fullWidth
            autoComplete="City"
            variant="filled"
          />
      </Grid> */}

      {/* <MultiSelectComponent
        getOptionLabel={options => options}
        label="Your framework of choice"
        value={selection}
        options={frontendFrameworks}
        onChange={handleChange}
        limitTags={3} // limits number of chip to render while out of focus, useful for responsiveness
        getLimitTagsText={count => `+${count}📦`} // modify the limit tag text, useful for translation too
        // filterOptions={}
      /> */}

    
     
    
     <Grid item xs={12} md={4}>
    


    <Box mt="8%" marginLeft="35%"  display="flex" flexDirextion="row" >

          <Button type="submit" variant="outlined" style={{marginRight:"5%", color:'#95CD41',borderColor: "#95CD41"
          ,"&:hover": {
          backgroundColor: "#15e577",
          borderColor:"#564345"
          } }}>
          Update
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
  </Container>
)

}