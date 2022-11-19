import { useState } from 'react';
import createAppointment from '../libs/createAppointment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../scss/CreateAlert.scss';
import MessageModal from './MessageModal';

const types = [
    {
        id: 1,
        name: "Abholung des Aufenthaltstitels"
    }
]

export default function CreateAlert(props) {
    const handleClose = () => props.setShow(false);
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null)
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleTimeFrame = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };

    async function submitHandler(e) {
        e.preventDefault();
        const request = await createAppointment(type, startDate.toISOString(), endDate.toISOString());
        setIsOpen(true)
        if (request.success) {
            setIsSuccess(true)
        } else {
            setIsSuccess(false)
            setMessage('There has been an error')
            // setMessage(request.result);
        }
    }

    return <div className="createPageModal">
        <div className="createPageContainer">
            <h2>
                New Alert
                <button onClick={handleClose}>
                    X
                </button>
            </h2>
            <form onSubmit={submitHandler}>
                <div className='type-container'>
                    <label htmlFor="title">Type:</label>
                    <select name="type" id="type-select" onChange={(e) => setType(e.target.value)}>
                        {types.map(obj => (
                            <option value={obj.id} key={obj.id}>{obj.name}</option>
                        ))}
                    </select>
                </div>
                <div className='time-frame-container'>
                    <label htmlFor="timeFrame">Time frame:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleTimeFrame}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                    />
                </div>
                <button type="submit">
                    Create Alert
                </button>
                <div>{`${message}`}</div>
            </form>
        </div>

        <MessageModal message={message} isOpen={isOpen} setIsOpen={setIsOpen} isSuccess={isSuccess} handleClose={handleClose} />
    </div>
}