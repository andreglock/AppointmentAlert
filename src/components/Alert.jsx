import Confirm from 'react-confirm-bootstrap';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { NavLink } from 'react-router-dom';
import UniverseDescPrompt from './UniverseDescPrompt.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import '../scss/Alert.scss'
import deleteAlert from '../libs/deleteAlert.js';

export default function Alert(props) {
    const [ showDescPrompt, setShowDescPrompt] = useState(false);
    const [ itemInfo, setItemInfo ] = useState({});

    console.table('Alerts:', props.alert)

    const id = props.alert.id;
    const appointmentAlert = props.alert;
    const alerts = props.alerts;
    const setAlerts = props.setAlerts;

    function mapName(type) {
        switch (type) {
            case "LEIPZIG_RESIDENCE_PERMIT_PICKUP":
                return "Residence Permit Pickup";
            case "LEIPZIG_DRIVERS_LICENCE_PICKUP":
                return "Drivers Licence Pickup";
            default:
                return type;
        }
    }

    async function editAlertHandler(id, alertId) {
        const deleteCheck = "TODO";
        if (deleteCheck.pass === true) {
            const index = appointmentAlert.map(universe => universe._id).indexOf(id);
            appointmentAlert.splice(index, 1);
            // Cloning by value and not by reference (same pointer)
            setAlerts([...appointmentAlert]);
            alert(deleteCheck.message);

        } else {
            // display error message
            alert(deleteCheck.message);
        }
    }

    async function deleteAlertHandler(id) {
        const deleteCheck = await deleteAlert(id);
        if (deleteCheck.success === true) {
            const index = alerts.map(item => item.id).indexOf(id);
            alerts.splice(index, 1);
            // Cloning by value and not by reference (same pointer)
            setAlerts([...alerts]);
            alert("Deleted Successfully");
        } else {
            // display error message
            alert(deleteCheck.message);
        }
    }

    return <div className="Alert" key={Math.floor(Math.random() * 10000)} data={id}>
        <h3>
            <span>{mapName(appointmentAlert.type)}</span>
{/* TODO            <Confirm
                onConfirm={() => editAlertHandler(id)}
                confirmText="Edit Alert"
                title="Are you sure you want to edit this alert?">
                <button className="AlertButton" testId="editAlertButton">
                    <FontAwesomeIcon icon={faEdit}/>
                </button>
            </Confirm> */}
            <Confirm
                onConfirm={() => deleteAlertHandler(appointmentAlert.id)}
                body="This action cannot be undone."
                confirmText="Delete Alert"
                title="Are you sure you want to delete this alert?">
                <button className="AlertButton" testId="deleteAlertButton">
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </Confirm>
        </h3>
        <div>
            Alert me from {appointmentAlert.startDate} to {appointmentAlert.endDate}.
        </div>
        {showDescPrompt ?
            <UniverseDescPrompt         
                setShow={setShowDescPrompt}
                show={showDescPrompt}
                universes={alerts}
                setUniverses={setAlerts}
                itemInfo={itemInfo}
            /> : null
        }
    </div>
}