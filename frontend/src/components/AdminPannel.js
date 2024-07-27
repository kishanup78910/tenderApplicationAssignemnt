import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Form, Button, Container } from 'react-bootstrap';
import TenderList from './TenderList';
import BidTable from './BidTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
  const [tenders, setTenders] = useState([]);
  const [newTender, setNewTender] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    bufferTime: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedTender, setSelectedTender] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/tenders`);
        setTenders(response?.data);
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };
    fetchTenders();
  }, []);

  const handleTenderSelect = (tenderId) => {
    setSelectedTender(tenderId);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newTender.name) newErrors.name = 'Tender name is required';
    if (!newTender.description) newErrors.description = 'Tender description is required';
    if (!newTender.startTime) newErrors.startTime = 'Start time is required';
    if (!newTender.endTime) newErrors.endTime = 'End time is required';
    if (!newTender.bufferTime) newErrors.bufferTime = 'Buffer time is required';
    else if (isNaN(newTender.bufferTime) || newTender.bufferTime <= 0) newErrors.bufferTime = 'Buffer time must be a positive number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setNewTender({ ...newTender, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/tenders/create-tender`, newTender);
      setTenders([...tenders, response?.data]);
      setNewTender({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        bufferTime: '',
      });
      setErrors({});
      setAlertMessage('Tender created successfully!');
      setTimeout(() => setAlertMessage(''), 5000);
    } catch (error) {
      console.error('Error creating tender:', error);
      setAlertMessage('Error creating tender. Please try again.');
      setTimeout(() => setAlertMessage(''), 5000); 
    }
  };

  return (
    <Container className="my-4">
      <h2>Admin Panel</h2>
      {alertMessage && <Alert variant="success">{alertMessage}</Alert>}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="name">
          <Form.Label>Tender Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Tender Name"
            value={newTender.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Tender Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter Tender Description"
            value={newTender.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="startTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="startTime"
            value={newTender.startTime}
            onChange={handleChange}
            isInvalid={!!errors.startTime}
          />
          <Form.Control.Feedback type="invalid">{errors.startTime}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="endTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="endTime"
            value={newTender.endTime}
            onChange={handleChange}
            isInvalid={!!errors.endTime}
          />
          <Form.Control.Feedback type="invalid">{errors.endTime}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="bufferTime">
          <Form.Label>Buffer Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="bufferTime"
            placeholder="Enter Buffer Time"
            value={newTender.bufferTime}
            onChange={handleChange}
            isInvalid={!!errors.bufferTime}
          />
          <Form.Control.Feedback type="invalid">{errors.bufferTime}</Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-center mt-3">
          <Button type="submit" variant="primary">Create Tender</Button>
        </div>
      </Form>

      <TenderList tenders={tenders} onTenderSelect={handleTenderSelect} />
      {selectedTender && <BidTable tenderId={selectedTender} />}
    </Container>
  );
};

export default AdminPanel;
