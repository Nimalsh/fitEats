import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './component/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import Home from './component/Home/Home';
import Profile from './component/Profile/Profile';



import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import CustomRoutes from './Routers/CustomRoutes'; 
import Routers from './Routers/Routers';






function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Navbar/>
      {/* <Home/> */}
      {/*<RestaurantDetails/>*/}
      {/*<Cart/>*/}
      {/* <CustomRoutes/>  */}
      <Routers/>
    </ThemeProvider>
  
      
  
  );
}

export default App;
