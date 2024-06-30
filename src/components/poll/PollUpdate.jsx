import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Poll.css';
import UserService from '../../services/UserService.js'
import schema from './pollValidationSchema.js'

const PollUpdate = () => {
    const { pollId } = useParams();
    const [responseMessage, setResponseMessage] = useState();

    const location = useLocation();
    const [currentPoll] = useState(location.state);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    })

    const doUpdate = async (formData) => {
        try {
            const response = await UserService.changePollForUser(pollId, formData);
            setResponseMessage(response.data.message);

            setTimeout(() => {
                navigate("/polls");
            }, 3000);
        } catch (error) {
            const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setResponseMessage(errortext);

            setTimeout(() => {
                navigate(-1);
            }, 3000);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <>
            <div className="col-md-12">
                <div className="card card-container">
                    <h1>Edit Poll</h1>
                    <form onSubmit={handleSubmit(doUpdate)}>
                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <input type="text" {...register("department")} />
                            {errors?.department && <label className="error-feedback">{errors.department.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="unitname">Unit Name</label>
                            <input type="text" {...register("unitname")} />
                            {errors?.unitname && <label className="error-feedback">{errors.unitname.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="workers">Workers</label>
                            <input type="number" {...register("workers")} />
                            {errors?.workers && <label className="error-feedback">{errors.workers.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="head">Head</label>
                            <input type="text" {...register("head")} />
                            {errors?.head && <label className="error-feedback">{errors.head.message}</label>}
                        </div>
                        <p></p>
                        <div className="form-group d-flex justify-content-between">
                            <button className="btn btn-primary btn-block" >
                                Update
                            </button>
                            <button onClick={handleCancel} className="btn btn-secondary btn-block">
                                Cancel
                            </button>
                        </div>
                    </form>
                    <p></p>
                    {responseMessage && (
                        <div className="alert alert-success" >
                            {responseMessage}
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default PollUpdate;
