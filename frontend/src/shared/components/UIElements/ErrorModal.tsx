import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

interface ErrorModalProps {
    onClear: any,
    error: any
}

const ErrorModal: React.FC<ErrorModalProps> = ({ onClear, error }) => {
    return (
        <Modal
            onCancel={onClear}
            header="An Error Occurred!"
            show={!!error}
            footer={<Button onClick={onClear}>Okay</Button>}
        >
            <p>{error}</p>
        </Modal>
    );
};

export default ErrorModal;
