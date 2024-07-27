import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BidTable = ({ tenderId }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/bids/tender/${tenderId}`);
      setBids(response?.data);
      console.log(response.data);
    };
    fetchBids();
  }, [tenderId]);

  return (
    <div className="container my-4">
      <h2>Bids for Tender</h2>
      <table className="table table-striped mb-5">
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Bid Price</th>
            <th scope="col">Bid Time</th>
            <th scope="col">Applied Last 5 Minutes</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid._id}>
              <td>{bid.companyName}</td>
              <td>{bid.bidCost}</td>
              <td>{new Date(bid.bidTime).toLocaleString()}</td>
              <td>{bid.isLastMinute==true?"Yes":"No"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidTable;
