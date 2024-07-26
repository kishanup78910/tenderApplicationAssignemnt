import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BidForm from './BidForm';

const UserView = () => {
  const [tenders, setTenders] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchTenders = async () => {
      const response = await axios.get('http://localhost:3001/api/tenders');
      setTenders(response.data);
    };
    fetchTenders();
  }, []);

  const handleBidSubmit = async (tenderId, bid) => {
    const response = await axios.post('http://localhost:3001/api/bids/submit-bid', { tenderId, ...bid });
    setBids([...bids, response.data]);
  };

  const getStatus = (endTime) => {
    const now = new Date();
    return new Date(endTime) > now ? 'Active' : 'Expired';
  };

  const sortedTenders = [...tenders].sort((a, b) => {
    return getStatus(b.endTime) === 'Active' ? 1 : -1;
  });

  return (
    <div className="container">
      <h2 className="my-4">Available Tenders</h2>
      <ul className="list-group">
        {sortedTenders.map((tender) => (
          <li key={tender._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{tender.name}</h5>
                <p>{tender.description}</p>
                <p className={`badge ${getStatus(tender.endTime) === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                  {getStatus(tender.endTime)}
                </p>
                <p>Expiration Time: {new Date(tender.endTime).toLocaleString()}</p>
              </div>
              <BidForm
                tenderId={tender._id}
                onBidSubmit={handleBidSubmit}
                disabled={getStatus(tender.endTime) === 'Expired'}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
