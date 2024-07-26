import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={bid.companyName}
          onChange={handleChange}
          className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
          disabled={disabled}
        />
        {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
      </div>
      <div className="form-group py-3">
        <input
          type="number"
          name="bidCost"
          placeholder="Bid Cost"
          value={bid.bidCost}
          onChange={handleChange}
          className={`form-control ${errors.bidCost ? 'is-invalid' : ''}`}
          disabled={disabled}
        />
        {errors.bidCost && <div className="invalid-feedback">{errors.bidCost}</div>}
      </div>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <button type="submit" className="btn btn-success" disabled={disabled}>
          Submit Bid
        </button>
      </div>
    </form>
  );
};

export default BidForm;
