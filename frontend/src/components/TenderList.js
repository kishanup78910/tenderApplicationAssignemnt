import React from 'react';

const TenderList = ({ tenders, onTenderSelect  }) => (
  <div>
    <h3>Previous Tenders</h3>
    <ul className="list-group">
      {tenders.map((tender) => (
        <li key={tender._id} className="list-group-item" onClick={() => onTenderSelect(tender._id)}>
          {tender.name}
        </li>
      ))}
    </ul>
  </div>
);

export default TenderList;
