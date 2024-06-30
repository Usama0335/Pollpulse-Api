/* import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Poll.css';
import PollService from '../../services/PollService.js';
import schema from './pollValidationSchema.js';

const PollEdit = () => {
  const [responseMessage, setResponseMessage] = useState();
  const { pollId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const { fields, append } = useFieldArray({
    control,
    name: "questions"
  });

  useEffect(() => {
    PollService.getPollById(pollId).then(response => {
      const poll = response.data;
      setValue('title', poll.title);
      setValue('description', poll.description);
      setValue('type', poll.type);
      setValue('questions', poll.questions);
    }).catch(error => {
      setResponseMessage(error.message);
    });
  }, [pollId, setValue]);

  const doUpdate = async (formData) => {
    try {
      const response = await PollService.changePollForUser(pollId, formData);
      setResponseMessage(response.data.message);

      setTimeout(() => {
        navigate("/polls/" + pollId);
      }, 3000);
    } catch (error) {
      const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setResponseMessage(errortext);

      setTimeout(() => {
        setResponseMessage(null);
      }, 3000);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className="col-md-12">
        <div className="card card-container">
          <h1>Edit Poll</h1>
          <form onSubmit={handleSubmit(doUpdate)}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" {...register("title")} />
              {errors?.title && <label className="error-feedback">{errors.title.message}</label>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea {...register("description")} />
              {errors?.description && <label className="error-feedback">{errors.description.message}</label>}
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select {...register("type")}>
                <option value="rows">Rows</option>
                <option value="pie">Pie</option>
              </select>
              {errors?.type && <label className="error-feedback">{errors.type.message}</label>}
            </div>
            <div className="form-group">
              <label htmlFor="questions">Questions</label>
              {fields.map((question, index) => (
                <div key={question.id} className="mb-3">
                  <input type="text" {...register(`questions[${index}].questionText`)} placeholder="Question Text" />
                  {errors?.questions?.[index]?.questionText && <label className="error-feedback">{errors.questions[index].questionText.message}</label>}
                  <input type="text" {...register(`questions[${index}].answerOptions[0]`)} placeholder="Answer Option 1" />
                  {errors?.questions?.[index]?.answerOptions?.[0] && <label className="error-feedback">{errors.questions[index].answerOptions[0].message}</label>}
                  <input type="text" {...register(`questions[${index}].answerOptions[1]`)} placeholder="Answer Option 2" />
                  {errors?.questions?.[index]?.answerOptions?.[1] && <label className="error-feedback">{errors.questions[index].answerOptions[1].message}</label>}
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={() => append({ questionText: "", answerOptions: ["", ""] })}>
                Add Question
              </button>
            </div>
            <div className="form-group d-flex justify-content-between">
              <button className="btn btn-primary btn-block">
                Update
              </button>
              <button onClick={handleCancel} className="btn btn-secondary btn-block">
                Cancel
              </button>
            </div>
          </form>
          {responseMessage && (
            <div className="alert alert-success">
              {typeof responseMessage === 'string' ? responseMessage : JSON.stringify(responseMessage)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PollEdit;
 */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Poll.css';
import PollService from '../../services/PollService.js';
import schema from './pollValidationSchema.js';

const PollEdit = () => {
  const [responseMessage, setResponseMessage] = useState();
  const { pollId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  useEffect(() => {
    PollService.getPollById(pollId).then(response => {
      const poll = response.data;
      setValue('question', poll.question);
      setValue('answer1', poll.answer1);
      setValue('answer2', poll.answer2);
    }).catch(error => {
      setResponseMessage(error.message);
    });
  }, [pollId, setValue]);

  const doUpdate = async (formData) => {
    try {
      const response = await PollService.updatePoll(pollId, formData);
      setResponseMessage(response.data.message);

      setTimeout(() => {
        navigate("/polls/" + pollId);
      }, 3000);
    } catch (error) {
      const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setResponseMessage(errortext);

      setTimeout(() => {
        setResponseMessage(null);
      }, 3000);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h1>Edit Poll</h1>
        <form onSubmit={handleSubmit(doUpdate)}>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input type="text" {...register("question")} />
            {errors?.question && <label className="error-feedback">{errors.question.message}</label>}
          </div>
          <div className="form-group">
            <label htmlFor="answer1">Answer 1</label>
            <input type="text" {...register("answer1")} />
            {errors?.answer1 && <label className="error-feedback">{errors.answer1.message}</label>}
          </div>
          <div className="form-group">
            <label htmlFor="answer2">Answer 2</label>
            <input type="text" {...register("answer2")} />
            {errors?.answer2 && <label className="error-feedback">{errors.answer2.message}</label>}
          </div>
          <div className="form-group d-flex justify-content-between">
            <button className="btn btn-primary btn-block">Update</button>
            <button onClick={handleCancel} className="btn btn-secondary btn-block">Cancel</button>
          </div>
        </form>
        {responseMessage && (
          <div className="alert alert-success">
            {typeof responseMessage === 'string' ? responseMessage : JSON.stringify(responseMessage)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PollEdit;
