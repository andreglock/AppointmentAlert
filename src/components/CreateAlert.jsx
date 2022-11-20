import { useState, useEffect } from 'react';
import createAlert from '../libs/createAlert';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../scss/CreateAlert.scss';
import MessageModal from './MessageModal';
import axios from "axios";
import GlobalConfig from '../dev.json'



export default function CreateAlert(props) {
    const handleClose = () => props.setShow(false);
    const [types, setTypes] = useState({})
    const [type, setType] = useState("LEIPZIG_RESIDENCE_PERMIT_PICKUP");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null)
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const url = GlobalConfig.endpoint;
        async function fetchTypes() {
          await axios
            .get(url + "/types", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setTypes(response.data);
            })
            .catch((error) => {
              console.log("error from getTypes :>> ", error);
            });
        }
        fetchTypes();
    }, [])
    
    const handleTimeFrame = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };

    async function submitHandler(e) {
        e.preventDefault();
        const request = await createAlert(type, startDate.toISOString(), endDate.toISOString());
        setIsOpen(true)
        setMessage(request.result)
        if (request.success) {
            setIsSuccess(true)
        } else {
            setIsSuccess(false)
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
                    <select name="type" id="type-select" value={type} onChange={(e) => setType(e.target.value)}>
                        {Object.values(types).map((value, index) => (
                            <option value={Object.keys(types)[index]} key={index}>{value}</option>
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
            </form>
        </div>

        <MessageModal message={message} isOpen={isOpen} setIsOpen={setIsOpen} isSuccess={isSuccess} handleClose={handleClose} />
    </div>
}