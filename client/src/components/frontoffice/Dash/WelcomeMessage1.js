
import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function WelcomeMessage1() {
  const [showModal, setShowModal] = useState(true);
  const [count, setCount] = useState(0);
  const idu = localStorage.getItem('userId') ;
  useEffect(() => {
    async function fetchGyms() {
      const response = await fetch(`http://localhost:5000/api/gyms/getGymsByManager/${idu}`);
      const data = await response.json();
      
      setCount(data.length);
    }
      
  
    fetchGyms();
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const dataa = {
  
   
   count: count,
   };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Dear Gym Manager, here you can check the statistics for your gyms.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Gyms added by you <h1  className="count">{count} </h1>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeMessage1;