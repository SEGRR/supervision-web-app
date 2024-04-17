import React from 'react';
import '../css/style.css'; 
import '@fortawesome/fontawesome-free/css/all.css';

const FeedbackMessageModal = ({ onClose,mainMessage,detailMessage, feedbackType }) => {
  
  let icon = '';
  let iconClassName = '';

  if (feedbackType === 'success') {
    icon = 'fa-check-circle';
    iconClassName = 'success';
  } else if (feedbackType === 'error') {
    icon = 'fa-times-circle';
    iconClassName = 'error';
  }

  const closeModal = () => {
   
    onClose();
  };
 
  return (
    <>
      {mainMessage  && (
        <div className="modal">
          <div className="modal-content">
           
          <div className={`icon ${iconClassName}`}>
              {icon && <i className={`fas ${icon} fa-lg animated-icon`}></i>}
            </div>
            
            <p className="mainmessage">{mainMessage}</p>
            <p className="detailmessage">{detailMessage}</p>
            <button onClick={closeModal} className="button">OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackMessageModal;
