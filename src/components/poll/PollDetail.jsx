/* import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollService from '../../services/PollService.js';

const PollDetail = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    PollService.getPollById(pollId).then(response => {
      setPoll(response.data);
    }).catch(error => {
      setResponseMessage(error.message);
    });
  }, [pollId]);

  const handleAnswerChange = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PollService.submitPollAnswer(pollId, { answers });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <>
      {poll ? (
        <div className="col-md-12">
          <div className="card card-container">
            <h1>{poll.title}</h1>
            <p>{poll.description}</p>
            <form onSubmit={handleAnswerSubmit}>
              {poll.questions.map((question, index) => (
                <div key={index} className="mb-3">
                  <h3>{question.questionText}</h3>
                  {question.answerOptions.map((option, idx) => (
                    <div key={idx}>
                      <input
                        type="radio"
                        value={option}
                        name={`question_${index}`}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      {option}
                    </div>
                  ))}
                </div>
              ))}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {responseMessage && (
              <div className="alert alert-success">
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PollDetail;
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollService from '../../services/PollService.js';

const PollDetail = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    PollService.getPollById(pollId).then(response => {
      setPoll(response.data);
    }).catch(error => {
      setResponseMessage(error.message);
    });
  }, [pollId]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PollService.submitPollAnswer(pollId, { answer });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <>
      {poll ? (
        <div className="col-md-12">
          <div className="card card-container">
            <h1>{poll.question}</h1>
            <form onSubmit={handleAnswerSubmit}>
              <div className="mb-3">
                <div>
                  <input
                    type="radio"
                    value={poll.answer1}
                    name="answer"
                    onChange={handleAnswerChange}
                  />
                  {poll.answer1}
                </div>
                <div>
                  <input
                    type="radio"
                    value={poll.answer2}
                    name="answer"
                    onChange={handleAnswerChange}
                  />
                  {poll.answer2}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {responseMessage && (
              <div className="alert alert-success">
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PollDetail;
