import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


const TenderList = ({ tenders, onTenderSelect }) => {
  return (
    <div>
      <h3>Previous Tenders</h3>
      <ul className="list-group">
        {tenders.map((tender) => (
          <OverlayTrigger
            key={tender._id}
            placement="top"
            overlay={<Tooltip id={`tooltip-${tender._id}`}>Click to know more about this bid</Tooltip>}
          >
            <li
              className="list-group-item tender-item"
              onClick={() => onTenderSelect(tender._id)}
            >
              {tender.name}
            </li>
          </OverlayTrigger>
        ))}
      </ul>
    </div>
  );
};

export default TenderList;
