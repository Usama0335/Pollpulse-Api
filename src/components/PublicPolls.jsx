import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PollService from "../services/PollService.js";

const PublicPolls = () => {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    PollService.fetchAllPolls()
      .then(res => {
        setPolls(res.data);
      })
      .catch(err => {
        setError(err.message || "An error occurred while fetching polls.");
      });
  }, []);

  return (
    <div className="container">
      <h1>All Polls</h1>
      {error && <p className="text-danger">{error}</p>}
      <div className="list-group">
        {Array.isArray(polls) && polls.length > 0 ? (
          polls.map((poll) => (
            <div key={poll._id} className="list-group-item">
              <h3>{poll.title}</h3>
              <p>{poll.description}</p>
              <p><strong>Creator:</strong> {poll.creatorName}</p>
              <Link to={`/polls/${poll._id}`} className="btn btn-primary">Answer Poll</Link>
            </div>
          ))
        ) : (
          <p>No polls found.</p>
        )}
      </div>
    </div>
  );
};

export default PublicPolls;
