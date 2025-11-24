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
    variant = 'info',
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

    const title = variant ? variant.toUpperCase() : 'Alert';

    const getIcon = () => {
        switch (variant) {
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
            case 'confirm':
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
                    className={`rpa-text-${variant}`}
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
                        <Button size='md' variant="primary" onClick={handleConfirm}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={onClose}>
                        OK
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default PopupAlert;