import React, { useState } from 'react';
import './Login.css'; // Custom styles if needed
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        onLogin();
    };

    return (
        <Container fluid className="login-container d-flex flex-column justify-content-center align-items-center">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4} className="login-box p-4 shadow-sm rounded">
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxBZuYddfI0M9SBxZQpmgwoN4LVyN60t_hA&s" alt="Logo" className="logo mb-4" fluid />
                    <h1 className="tagline text-primary mb-4">SomaSoma</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
            <footer className="footer text-muted mt-5">
                Enhance your learning experience with integrated tools and seamless functionalities.
            </footer>
        </Container>
    );
};

export default Login;
