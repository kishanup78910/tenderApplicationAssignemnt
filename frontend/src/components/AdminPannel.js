import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TenderList from './TenderList';
import BidTable from './BidTable';

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

  useEffect(() => {
    const fetchTenders = async () => {
      const response = await axios.get('http://localhost:3001/api/tenders');
      setTenders(response.data);
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
      const response = await axios.post('http://localhost:3001/api/tenders/create-tender', newTender);
      setTenders([...tenders, response.data]);
      setNewTender({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        bufferTime: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error creating tender:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Tender Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Tender Name"
            value={newTender.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Tender Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter Tender Description"
            value={newTender.description}
            onChange={handleChange}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="startTime" className="form-label">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={newTender.startTime}
            onChange={handleChange}
            className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
          />
          {errors.startTime && <div className="invalid-feedback">{errors.startTime}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="endTime" className="form-label">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={newTender.endTime}
            onChange={handleChange}
            className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
          />
          {errors.endTime && <div className="invalid-feedback">{errors.endTime}</div>}
        </div>

        <div className="form-group ">
          <label htmlFor="bufferTime" className="form-label">Buffer Time (minutes)</label>
          <input
            type="number"
            id="bufferTime"
            name="bufferTime"
            placeholder="Enter Buffer Time"
            value={newTender.bufferTime}
            onChange={handleChange}
            className={`form-control ${errors.bufferTime ? 'is-invalid' : ''}`}
          />
          {errors.bufferTime && <div className="invalid-feedback">{errors.bufferTime}</div>}
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-primary">Create Tender</button>
        </div>
      </form>

      <TenderList tenders={tenders} onTenderSelect={handleTenderSelect} />
      {selectedTender && <BidTable tenderId={selectedTender} />}
    </div>
  );
};

export default AdminPanel;
