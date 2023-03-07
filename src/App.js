import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router,Navigate,Route,Routes} from "react-router-dom";
import './App.css';
import Admincategory from "./components/Admincategory";
import Admincity from "./components/Admincity";
import Admincontact from "./components/Admincontact";
import Admindashboard from "./components/Admindashboard";
// import Test from "./components/Adminexportexcel";
import Adminhome from "./components/Adminhome";
import Adminlogin from "./components/Adminlogin";
import Adminmissorder from "./components/Adminmissorder";
import Adminorder from "./components/Adminorder";
import Adminproduct from "./components/Adminproduct";
import Adminprofile from "./components/Adminprofile";
import Home from './components/Home';
import Simplecontextprovider from "./components/Simplecontext";
import { createBrowserHistory } from 'history';
import Adminstatus from "./components/Adminstatus";
import Adminmetatags from "./components/Adminmetatags";



function App() {
  
        
  return (
    <div >
      
      <Router>
      <Simplecontextprovider>
        <Routes>
          
          <Route exact path='/' element={<Adminlogin/>}/>
          <Route  path='adminlogin' element={<Adminlogin/>}/>
          <Route  path='adminhome' element={<Adminhome/>}/>
          <Route  path='admindashboard' element={<Admindashboard/>}/>
          <Route  path='adminprofile' element={<Adminprofile/>}/>
          <Route  path='adminorder' element={<Adminorder/>}/>
          <Route  path='adminmissorder' element={<Adminmissorder/>}/>
          <Route  path='adminproduct' element={<Adminproduct/>}/>
          <Route  path='admincategory' element={<Admincategory/>}/>
          <Route  path='admincity' element={<Admincity/>}/>
          <Route  path='admincontact' element={<Admincontact/>}/>
          <Route  path='status' element={<Adminstatus/>}/>
          <Route  path='metatags' element={<Adminmetatags/>}/>
          {/* <Route exact path='test' element={<Test/>}/> */}
          
        </Routes>
        </Simplecontextprovider>
      </Router>
      
    </div>
  );
}

export default App;
