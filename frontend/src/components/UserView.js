import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BidForm from './BidForm';
import { Container, Alert, ListGroup, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserView = () => {
  const [tenders, setTenders] = useState([]);
  const [bids, setBids] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchTenders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/tenders`);
      setTenders(response?.data);
    };
    fetchTenders();
  }, []);

  const handleBidSubmit = async (tenderId, bid) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/bids/submit-bid`, { tenderId, ...bid });
      setBids([...bids, response?.data]);
      setAlertMessage('Bid submitted successfully!');
      setTimeout(() => setAlertMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  const getStatus = (endTime) => {
    const now = new Date();
    return new Date(endTime) > now ? 'Active' : 'Expired';
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  const sortedTenders = [...tenders].sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h2>Available Tenders</h2>
          {alertMessage && <Alert variant="success">{alertMessage}</Alert>}
        </div>
        <div>
          <Link to="/admin">
            <Button variant="primary">Go to Admin Panel</Button>
          </Link>
        </div>
      </div>
    
      <ListGroup>
        {sortedTenders.map((tender) => (
          <ListGroup.Item key={tender._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{tender.name}</h5>
                <p>{tender.description}</p>
                <Badge bg={getStatus(tender.endTime) === 'Active' ? 'success' : 'danger'}>
                  {getStatus(tender.endTime)}
                </Badge>
                <p>Expiration Time: {formatDate(tender.endTime)}</p>
              </div>
              <BidForm
                tenderId={tender._id}
                onBidSubmit={handleBidSubmit}
                disabled={getStatus(tender.endTime) === 'Expired'}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserView;
