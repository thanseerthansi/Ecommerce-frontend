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


function App() {
  var refresh_token = window.localStorage.getItem('refresh_token')
  useEffect(() =>{
  let interval = setInterval (() => {
    // console.log("refre",refresh_token)
      if (refresh_token) {
          UpdateToken()
      }
      else{ return Navigate('/adminlogin');}

        }, 300000 );
        return ()=> clearInterval(interval)
      },[]);
      const UpdateToken=async()=>{
          try {
            let data = await axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/api/token/refresh/',
              data:{"refresh" : refresh_token },
          })
          // console.log("data",data.data)      
          window.localStorage.setItem('access_token', data.data.access)    
        } catch (error) {
          console.log("error",error)
        }
        

        }
  return (
    <div >
      <Simplecontextprovider>
      <Router>
        <Routes>
          
          <Route exact path='/' element={<Home/>}/>
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
          {/* <Route exact path='test' element={<Test/>}/> */}
          
        </Routes>
      </Router>
      </Simplecontextprovider>
    </div>
  );
}

export default App;
