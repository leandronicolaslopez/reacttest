import React from 'react';
import DateFormat from 'components/utils/date-format/date-format';

const IncidentItem = (props) => {
    return(
    <div className="panel-container flex-row">
        <div className="panel flex-row">
            <div className="col date">
                <DateFormat date={props.incident.date} timezone="UTC" format="MMM DD, YY" />
            </div>
            <div className="col subsidiary">{ props.incident.subsidiary.name }</div>
            <div className="col description">{ props.incident.description }</div>
            <div className="col actions flex-row flex-end">
            <div className="btn-icon" onClick={props.onEdit}>
                <img src="images/edit-icon.png" alt="edit icon" />
            </div>
            <div className="btn-icon" onClick={props.onDelete}>
                <img src="images/delete-icon.png" alt="delete icon" />
            </div>
        </div>
        </div>
    </div>
    );
}

export default IncidentItem;