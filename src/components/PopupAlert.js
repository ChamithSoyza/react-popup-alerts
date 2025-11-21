import React from "react";
import { Modal, Button } from 'react-bootstrap';
import {
    CiCircleInfo,
    CiCircleCheck,
    CiCircleQuestion,
    CiCircleAlert,
    CiCircleRemove
} from "react-icons/ci";

const PopupAlert = ({
    varient = 'info',
    message = '',
    isConfirm = false,
    onConfirm = null,
    onCancel = null,
    onClose
}) => {
    if (!message) {
        return null;
    }

    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm();
        }
        onClose();
    }

    const handleCancel = async () => {
        if (onCancel) {
            await onCancel();
        }
        onClose();
    }

    const title = varient ? varient.toUpperCase() : 'Alert';

    const getIcon = () => {
        switch (varient) {
            case 'info':
                return <CiCircleInfo />;
            case 'success':
                return <CiCircleCheck />;
            case 'warning':
                return <CiCircleAlert />;
            case 'error':
                return <CiCircleRemove />;
            case 'cancel':
                return <CiCircleRemove />;
            case 'ask':
                return <CiCircleQuestion />;
            default:
                return null;
        }
    }

    return (
        <Modal
            show={true}
            onHide={onClose}
            animation={false}
            centered
            dialogClassName='rpa-alert-modal'
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header className='d-flex justify-content-center align-items-center align-content-center border-0 mt-3'>
                <Modal.Title
                    className={`rpa-text-${varient}`}
                    style={{ fontSize: "88px" }}
                >
                    {getIcon()}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='justify-content-center text-lg-center'>
                <h3>{title}</h3>
                <span>{message}</span>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center border-0'>
                {isConfirm ? (
                    <>
                        <Button size='md' varient="primary" onClick={handleConfirm}>
                            Yes
                        </Button>
                        <Button varient="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button varient="secondary" onClick={onClose}>
                            OK
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default PopupAlert;