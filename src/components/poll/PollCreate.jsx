import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Poll.css';
import PollService from '../../services/PollService.js';
import schema from './pollValidationSchema.js';

const PollCreate = () => {
    const [responseMessage, setResponseMessage] = useState();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const doCreate = async (formData) => {
        console.log("Form Data: ", JSON.stringify(formData, null, 2)); // Log form data for debugging
        try {
            const response = await PollService.addPollForUser(formData);
            setResponseMessage(response.data.message);

            setTimeout(() => {
                navigate("/dashboard");
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
                <h1>New Poll</h1>
                <form onSubmit={handleSubmit(doCreate)}>
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
                        <button className="btn btn-primary btn-block">Create</button>
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

export default PollCreate;
