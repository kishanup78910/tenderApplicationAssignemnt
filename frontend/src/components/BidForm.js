import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BidForm = ({ tenderId, onBidSubmit, disabled }) => {
  const [bid, setBid] = useState({
    companyName: '',
    bidCost: '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setBid({ ...bid, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bid.companyName) newErrors.companyName = 'Company Name is required';
    if (!bid.bidCost) newErrors.bidCost = 'Bid Cost is required';
    else if (isNaN(bid.bidCost) || bid.bidCost <= 0) newErrors.bidCost = 'Bid Cost must be a positive number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onBidSubmit(tenderId, bid);
    setBid({
      companyName: '',
      bidCost: '',
    });
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group controlId="companyName">
        <Form.Control
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={bid.companyName}
          onChange={handleChange}
          isInvalid={!!errors.companyName}
          disabled={disabled}
        />
        <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="bidCost" className="py-3">
        <Form.Control
          type="number"
          name="bidCost"
          placeholder="Bid Cost"
          value={bid.bidCost}
          onChange={handleChange}
          isInvalid={!!errors.bidCost}
          disabled={disabled}
        />
        <Form.Control.Feedback type="invalid">{errors.bidCost}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <Button type="submit" variant="success" disabled={disabled}>
          Submit Bid
        </Button>
      </div>
    </Form>
  );
};

export default BidForm;
