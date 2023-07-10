import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash , faBan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx';

const GymList = () => {
    const [gyms, setGyms] = useState([]);
    const [deletedGymId, setDeletedGymId] = useState(null);
    
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/gyms/getAll");
      setGyms(response.data);
    };
    
    fetchUsers();
  }, [deletedGymId]);

  
  const handleDeleteGym = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/gyms/${id}`);
      setDeletedGymId(id);
    } catch (error) {
      console.log(error);
    }
  };



  const handleUndoDelete = () => {
    setDeletedGymId(null);
  };
  

  const filteredGyms = gyms.filter((gym) => gym._id !== deletedGymId);

  return (
    <div className={styles.container}>
      <Header/>
      <SideNav/>

      <h2>Gym List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>Profile</th> */}
            <th> Name</th>
            <th> Description</th>
            <th>Localisation</th>
            {/* <th>Password</th> */}
            <th>rating</th>
            <th>performance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGyms.map((gym) => (
            <tr key={gym._id}>
              {/* <td>{user.profile}</td> */}
              <td>{gym.name}</td>
              <td>{gym.description}</td>
              <td>{gym.localisation}</td>
              <td>{gym.rating}</td>
              <td>{gym.performance}</td>
             

              <tr>


              <th className= {styles.transparent}>
 
  </th>
              <th className={styles.transparent}>
  {/* <Button className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </Button> */}
  <Button

    className={styles.delete}
    onClick={() => handleDeleteGym(gym._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button> </th>

  


</tr>

            </tr>
          ))}
        </tbody>


      </table>



      <Footer/>
    </div>
  );
};

export default GymList ;
