import React from 'react';
import moment from 'moment';
import 'moment-timezone';

export default class DateFormat extends React.Component {
    render () {
        let { date, timezone, format } = this.props,
            text = moment.tz(date, timezone).format(format);

        return (<span>{ text }</span>);
    }
}
