import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (currentUser.username !== user.username) {
      setCurrentUser(user);
    }
  }, [currentUser]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      await AuthService.changePassword(currentUser.id, newPassword);
      setMessage("Password changed successfully!");
      setShowModal(false);
    } catch (error) {
      setMessage("Failed to change password.");
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="container">
      <div className="profile-card">
        <header className="profile-header">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <div className="profile-body">
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Member Since:</strong> {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          Change Password
        </Button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
