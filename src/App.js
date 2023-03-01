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



function App() {
  
        
  return (
    <div >
      
      <Router>
      <Simplecontextprovider>
        <Routes>
          
          <Route exact path='/' element={<Adminlogin/>}/>
          <Route exact path='adminlogin' element={<Adminlogin/>}/>
          <Route exact path='adminhome' element={<Adminhome/>}/>
          <Route exact path='admindashboard' element={<Admindashboard/>}/>
          <Route exact path='adminprofile' element={<Adminprofile/>}/>
          <Route exact path='adminorder' element={<Adminorder/>}/>
          <Route exact path='adminmissorder' element={<Adminmissorder/>}/>
          <Route exact path='adminproduct' element={<Adminproduct/>}/>
          <Route exact path='admincategory' element={<Admincategory/>}/>
          <Route exact path='admincity' element={<Admincity/>}/>
          <Route exact path='admincontact' element={<Admincontact/>}/>
          <Route exact path='status' element={<Adminstatus/>}/>
          {/* <Route exact path='test' element={<Test/>}/> */}
          
        </Routes>
        </Simplecontextprovider>
      </Router>
      
    </div>
  );
}

export default App;
