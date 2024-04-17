/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import '../css/style.css';
const ConfirmMessageModal = ({ onClose, onDeleteConfirm }) => {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        onClose();
    };

    const handleDelete = () => {
        setIsOpen(false);
        onDeleteConfirm();
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="icon warning"><i className="fas fa-exclamation-circle fa-lg animated-icon"></i></div>
                        <p className="mainmessage">Are you sure?</p>
                        <p className='detailmessage'>You won ' t be able to revert this!</p>
                        <div className="button-container">
                            <button className="button" id='btn-confirm' onClick={handleDelete}>Yes, delete it!</button>
                            <button className='button' id='btn-cancel' onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmMessageModal;