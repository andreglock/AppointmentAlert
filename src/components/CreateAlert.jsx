import { useState } from 'react';
import createAppointment from '../libs/createAppointment';

import '../scss/CreatePage.scss';

export default function CreateAlert(props) {
    const handleClose = () => props.setShow(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
        const request = await createAppointment(title, description);
        if (request.success) {
            // add universe to current state
            
            handleClose();
        } else {
            setMessage(request.result);
        }
    }

    return <div className="createPageModal">
        <div className="createPageContainer">
            <h2>
                New Appointment
                <button onClick={handleClose}>
                    X
                </button>
            </h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text" id="title" placeholder="Title" required maxLength={60}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <div>
                        <label  htmlFor="description">Description:</label>
                    </div>
                    <textarea 
                        rows={10} cols={60} id="description" placeholder="Add a description..." maxLength={9000}
                        onChange={e => setDescription(e.target.value)} className="description"
                    />
                </div>
                <button type="submit">
                    Create Appointment
                </button>
                <div>{`${message}`}</div>
            </form>
        </div>
    </div>
}