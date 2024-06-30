import { useEffect, useState } from "react";
import PollService from '../../services/PollService.js';
import Table from "../Table.jsx";

const Polls = () => {
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState('');

    const getAllPolls = () => {
        PollService.fetchPollsForUser()
            .then(res => {
                setPolls(res.data); // Ensure res.data is an array of plain objects
            })
            .catch(err => {
                setError(err.message || "An error occurred while fetching polls.");
            });
    };

    useEffect(() => {
        getAllPolls();
    }, []);

    const fields = [
        { name: '_id', label: 'Id' },
        { name: 'question', label: 'Question' },
        { name: 'answer1', label: 'Answer 1' },
        { name: 'answer2', label: 'Answer 2' },
        { name: 'belongsTo.username', label: 'Created By' },
        { name: 'createdAt', label: 'Creation Time' }
    ];
    
    return (
        <div className="container text-primary-emphasis bg-primary-subtle border border-primary-subtle p-5 rounded text-center mt-5 mb-5">
            <a className="btn btn-success bi-journal-plus" href="/polls/create">Create new poll</a>
            <div className="table-responsive my-5">
                <Table caption={'Polls'} fields={fields} rows={polls} resourceName="polls" />
            </div>
            <button type="button" className="btn btn-primary" onClick={getAllPolls}>Refresh</button>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default Polls;
