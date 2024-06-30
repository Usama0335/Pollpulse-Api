// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import PollService from '../services/PollService';
// import AuthService from '../services/AuthService';
// import "bootstrap/dist/css/bootstrap.min.css";
// import './css/Dashboard.css';
// import { FormControl, InputGroup, Button } from 'react-bootstrap'; // Import necessary components

// const Dashboard = () => {
//   const [polls, setPolls] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [shareLink, setShareLink] = useState('');
//   const navigate = useNavigate();
//   const user = AuthService.getCurrentUser();

//   useEffect(() => {
//     PollService.fetchPollsForUser()
//       .then(res => {
//         setPolls(res.data.data);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }, []);

//   const handleSignout = () => {
//     AuthService.logout();
//     navigate('/login');
//   };

//   const handleDelete = async (pollId) => {
//     try {
//       await PollService.deletePoll(pollId);
//       setPolls(polls.filter(poll => poll._id !== pollId));
//     } catch (err) {
//       console.error('Failed to delete poll', err);
//     }
//   };

//   const handleSharePoll = (pollId) => {
//     const link = `${window.location.origin}/polls/${pollId}`;
//     setShareLink(link);
//   };

//   const filteredPolls = polls.filter(poll => 
//     poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     poll.belongsTo.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container dashboard">
//       <div className="d-flex justify-content-between align-items-center">
//         <h1>Welcome, {user.username}</h1>
//         <button onClick={handleSignout} className="btn btn-danger">Sign Out</button>
//       </div>
//       <InputGroup className="my-3">
//         <FormControl
//           placeholder="Search polls by question or creator"
//           aria-label="Search polls"
//           aria-describedby="basic-addon2"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </InputGroup>
//       <div className="actions my-3">
//         <Link to="/polls/create" className="btn btn-primary">Create New Poll</Link>
//       </div>
//       <div className="poll-list">
//         {filteredPolls.length > 0 ? (
//           filteredPolls.map((poll) => (
//             <div key={poll._id} className="poll-item">
//               <h3>{poll.question}</h3>
//               <p>Answer 1: {poll.answer1}</p>
//               <p>Answer 2: {poll.answer2}</p>
//               <p>Creator: {poll.belongsTo.username}</p>
//               <div className="poll-actions">
//                 {poll.belongsTo.id === user.id && ( // Only show if the poll belongs to the logged-in user
//                   <>
//                     <Link to={`/polls/${poll._id}/update`} className="btn btn-warning">Edit</Link>
//                     <button className="btn btn-danger" onClick={() => handleDelete(poll._id)}>Delete</button>
//                   </>
//                 )}
//                 <Button onClick={() => handleSharePoll(poll._id)} className="ml-2">Share Poll</Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No polls found.</p>
//         )}
//       </div>
//       {shareLink && (
//         <div className="mt-3">
//           <p>Share this link:</p>
//           <FormControl type="text" value={shareLink} readOnly className="form-control" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PollService from '../services/PollService';
import AuthService from '../services/AuthService';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/Dashboard.css';
import { FormControl, InputGroup, Button } from 'react-bootstrap'; // Import necessary components

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shareLink, setShareLink] = useState('');
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    PollService.fetchPollsForUser()
      .then(res => {
        setPolls(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleSignout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const handleDelete = async (pollId) => {
    try {
      await PollService.deletePoll(pollId);
      setPolls(polls.filter(poll => poll._id !== pollId));
    } catch (err) {
      console.error('Failed to delete poll', err);
    }
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
    <div className="container dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Welcome, {user.username}</h1>
        <button onClick={handleSignout} className="btn btn-danger">Sign Out</button>
      </div>
      <InputGroup className="my-3">
        <FormControl
          placeholder="Search polls by question or creator"
          aria-label="Search polls"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      <div className="actions my-3">
        <Link to="/polls/create" className="btn btn-primary">Create New Poll</Link>
      </div>
      <div className="poll-list">
        {filteredPolls.length > 0 ? (
          filteredPolls.map((poll) => (
            <div key={poll._id} className="poll-item">
              <h3>{poll.question}</h3>
              <p>Answer 1: {poll.answer1}</p>
              <p>Answer 2: {poll.answer2}</p>
              <p>Creator: {poll.belongsTo.username}</p>
              <div className="poll-actions">
                {poll.belongsTo._id === user.id && ( // Only show if the poll belongs to the logged-in user
                  <>
                    <Link to={`/polls/${poll._id}/update`} className="btn btn-warning">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(poll._id)}>Delete</button>
                  </>
                )}
                <Button onClick={() => handleSharePoll(poll._id)} className="ml-2">Share Poll</Button>
              </div>
            </div>
          ))
        ) : (
          <p>No polls found.</p>
        )}
      </div>
      {shareLink && (
        <div className="mt-3">
          <p>Share this link:</p>
          <FormControl type="text" value={shareLink} readOnly className="form-control" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
