// OrderActionModal.jsx
import React from 'react';

const OrderActionModal = ({ onClose, onSelectAction }) => {
  const handleActionClick = (action) => {
    onSelectAction(action);
    onClose();
  };

  return (
    <div className="modal">
      <button onClick={() => handleActionClick('Accept')}>Accept</button>
      <button onClick={() => handleActionClick('Reject')}>Reject</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default OrderActionModal;
