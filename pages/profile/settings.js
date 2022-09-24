// Next.js components
import Link from 'next/link'

// Bootstrap components
import Nav from 'react-bootstrap/Nav'
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';

// Styles
import styles from '../../styles/Settings.module.css'


export default function SettingsView() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Nav onClick={handleShow}>Settings</Nav>

    <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Settings</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <div className={styles.container}>
        <main className={styles.main}>
            <Form>
                <div className={styles.item}>
                <h3>
                    <Form.Label>Change Name</Form.Label>
                </h3>
                
                <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control placeholder="Alice" />
                </FloatingLabel>
                <FloatingLabel label="Surname" className="mb-3">
                    <Form.Control placeholder="Brown" />
                </FloatingLabel>
                </div>

                <div className={styles.item}>
                <h3>
                    <Form.Label>Change Password</Form.Label>
                </h3>
                <FloatingLabel label="Enter New Password" className="mb-3">
                    <Form.Control type="password" />
                </FloatingLabel>
                <FloatingLabel label="Re-enter New Password" className="mb-3">
                    <Form.Control type="password" />
                </FloatingLabel>
                </div>
            
                <div className={styles.item}>
                <Button variant="primary" type="submit">
                    Confirm
                </Button>
                </div>
            </Form>
            </main>
            </div>
    </Offcanvas.Body>
    </Offcanvas>
    </>
  );
}
