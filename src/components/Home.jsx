import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from 'react-bootstrap'; // Ensure these are correctly imported
import PollService from "../services/PollService";
import AnswerModal from "./AnswerModal";

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    PollService.fetchAllPolls()
      .then(res => {
        setPolls(res.data.data);
      })
      .catch(err => {
        setError(err.message || "An error occurred while fetching polls.");
      });
  }, []);

  const handleOpenModal = (poll) => {
    setSelectedPoll(poll);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPoll(null);
    setShowModal(false);
  };

  const handleSharePoll = (pollId) => {
    const link = `${window.location.origin}/polls/${pollId}`;
    setShareLink(link);
  };

  const filteredPolls = polls.filter(poll => 
    poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poll.belongsTo.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>All Polls</h1>
      {error && <p className="text-danger">{error}</p>}
      <InputGroup className="my-3">
        <FormControl
          placeholder="Search polls by question or creator"
          aria-label="Search polls"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      <div className="list-group">
        {Array.isArray(filteredPolls) && filteredPolls.length > 0 ? (
          filteredPolls.map((poll) => (
            <div key={poll._id} className="list-group-item">
              <h3>{poll.question}</h3>
              <p>Answer 1: {poll.answer1}</p>
              <p>Answer 2: {poll.answer2}</p>
              <p>Creator: {poll.belongsTo.username}</p>
              <div className="answers mt-3">
                <h4>Answers:</h4>
                {poll.answers.map((answer, index) => (
                  <p key={index}><strong>{answer.username}</strong>: {answer.answer}</p>
                ))}
              </div>
              <div className="d-flex mt-3">
                <Button onClick={() => handleOpenModal(poll)} style={{ marginRight: "10px" }}>Answer Poll</Button>
                <Button onClick={() => handleSharePoll(poll._id)}>Share Poll</Button>
              </div>
            </div>
          ))
        ) : (
          <p>No polls found.</p>
        )}
      </div>
      {selectedPoll && (
        <AnswerModal
          show={showModal}
          handleClose={handleCloseModal}
          poll={selectedPoll}
        />
      )}
      {shareLink && (
        <div className="mt-3">
          <p>Share this link:</p>
          <FormControl type="text" value={shareLink} readOnly className="form-control" />
        </div>
      )}
    </div>
  );
};

export default Home;
