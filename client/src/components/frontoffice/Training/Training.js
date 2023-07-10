import HeaderFront from "../shared/HeaderFront";
import FooterFront from "../shared/FooterFront";
import { FormText, Form, FormGroup, Label, Input, Button , Row , Col, Alert } from "reactstrap";
import { Card, CardBody, CardTitle, CardText,Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState ,useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';
import myImage1 from '../Training/yoga25.jpg'
import myImage2 from '../Training/yoga10.jpg'
import myImage3 from '../Training/yoga12.jpg'
import myImage4 from '../Training/yoga19.jpg'
import myImage5 from '../Training/yoga24.jpg'
import myImage6 from '../Training/yoga15.jpg'
import myImage7 from '../Training/work.gif'




import HeaderSignedInClient from "../shared/HeaderSignedInClient";


const Training=()=>{




  const GetPos = async (img) => {
     
    try {
       await axios.get(`http://localhost:5001/train/${img}`);
     // setGyms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const position = async () => {
     
    try {
       await axios.post('http://localhost:5002/muscle');
     // setGyms(response.data);
    } catch (error) {
      console.error(error);
    }
  };


 
    return (
        <div style={{backgroundColor : "black"}}>
    <HeaderSignedInClient/>
    <main style={{ background: 'black' }}>
      {/*? Hero Start */}
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Training with fitmind AI</h2>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
    <h1 style={{ fontSize: '9rem', color: '#750000'}}>Yoga</h1>
    </div>
    <div>
      <ul>
        <li>
      <img src={myImage1} alt="My Image" width="300" height="300" />
      <Button onClick={() => GetPos("yoga25.jpg")} size="lg">Train</Button>
      </li>
      <li>
      <img src={myImage2} alt="My Image" width="300" height="300" />
      <Button onClick={() => GetPos("yoga10.jpg")} size="lg">Train</Button>
      </li>
      <li>
      <img src={myImage3} alt="My Image" width="300" height="300" />
      <Button onClick={() => GetPos("yoga12.jpg")} size="lg">Train</Button>
      </li>
      </ul>
      <ul>
      <li>
      <img src={myImage4} alt="My Image" width="300" height="300" />
      <Button onClick={() => GetPos("yoga19.jpg")} size="lg">Train</Button>
      </li>
      <li>
      <img src={myImage5} alt="My Image" width="300" height="300" />
      <Button onClick={() => GetPos("yoga24.jpg")} size="lg">Train</Button>
      </li>
      <li>
      <img src={myImage6} alt="My Image" width="300" height="300" />
      <Button onClick={() => GetPos("yoga15.jpg")} size="lg">Train</Button>
      </li>
      </ul>
      
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
    <h1 style={{ fontSize: '9rem',color: '#750000' }}>Musculation</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img src={myImage7} alt="My Image" width="300" height="300" />
  <Button onClick={position} size="lg">Train</Button>

</div>
 
   


  

    
 
  <FooterFront/>
        </div>
      )
}

export default Training  
