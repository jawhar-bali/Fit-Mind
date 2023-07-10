import React, {useState , useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './stylemeet.css';
import HeaderSignedInClient from '../../shared/HeaderSignedInClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../../authentification/requireAuth';
import "./stylemeet.css"

const HomePage = () => {

    const [value , setValue]= useState("");
    const navigate = useNavigate();

    const handleJoinRoom = useCallback(()=>{

        navigate(`/room/${value}`);

    }, [navigate,value ]);







  return (
 
    <div className={styles.container1}>
           <div style={{
        // backgroundImage:`url(${process.env.PUBLIC_URL}/meet2.png)`,
        backgroundSize: "600px",
        backgroundRepeat: "repeat",
      }}>
            <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Create Room</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            <HeaderSignedInClient/>
<div className='containermeet'>
<input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type='text'
      placeholder='Enter Room Name : '
      className="inputmeet"
    />
<button onClick={handleJoinRoom} className="buttonmeet">
  <FontAwesomeIcon icon={faVideo} /> Create Meeting
</button>
    
</div>

   
  </div>
  </div>

  )
}

export default requireAuth (HomePage)
