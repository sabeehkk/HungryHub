// OrderActionModal.jsx
import React from 'react';

const OrderActionModal = ({ onClose, onSelectAction }) => {
  const handleActionClick = (action) => {
    onSelectAction(action);
    onClose();
  };

  return (
    // Your modal content here, displaying available actions as buttons
    <div className="modal">
      <button onClick={() => handleActionClick('Accept')}>Accept</button>
      <button onClick={() => handleActionClick('Reject')}>Reject</button>
      {/* Add more buttons for other actions as needed */}
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default OrderActionModal;
