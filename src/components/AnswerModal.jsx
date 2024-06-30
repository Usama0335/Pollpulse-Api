
import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from '../services/AuthService';
import PollService from "../services/PollService";

const AnswerModal = ({ show, handleClose, poll }) => {
  const [answer, setAnswer] = useState('');
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("To answer this poll, you need to sign in or register first.");
      navigate('/login');
      return;
    }

    try {
      await PollService.submitPollAnswer(poll._id, { answer });
      handleClose();
      // Optionally refresh the poll list or the poll details
    } catch (error) {
      console.error('Failed to submit answer', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{poll.question}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Choose an answer:</Form.Label>
            <Form.Check
              type="radio"
              label={poll.answer1}
              value={poll.answer1}
              checked={answer === poll.answer1}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Form.Check
              type="radio"
              label={poll.answer2}
              value={poll.answer2}
              checked={answer === poll.answer2}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AnswerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  poll: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer1: PropTypes.string.isRequired,
    answer2: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnswerModal;
