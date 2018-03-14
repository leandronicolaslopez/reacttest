import React from 'react';
import MdDatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import 'moment-timezone';

export default class DatePicker extends React.Component {
    formatDate (format, date) {
        return moment(date).format(format);
    }

    shiftPickerDateToTZDate (timezone, pickerDate) {
        let pickerOffset = pickerDate.getTimezoneOffset(),
            utcDate = new Date();

        utcDate.setTime(moment(pickerDate).startOf('day').toDate().getTime() - pickerOffset * 60000);

        let tzOffset = moment.tz(pickerDate, timezone).utcOffset(),
            tzDate = new Date();

        tzDate.setTime(utcDate.getTime() - tzOffset * 60000);

        return tzDate;
    }

    shiftTzDateToPickerDate (timezone, tzDate) {
        if (tzDate === null) return null;

        let tzUTCOffset = moment.tz(tzDate, timezone).utcOffset(),
            utcDate = new Date();

        utcDate.setTime(tzDate.getTime() + tzUTCOffset * 60000);

        let pickerDate = new Date(),
            pickerOffset = pickerDate.getTimezoneOffset();

        pickerDate.setTime(utcDate.getTime() + pickerOffset * 60000);

        return pickerDate;
    }

    onChange (_, date) {
        let event = {
            target: {
                name: this.props.name,
                value: this.shiftPickerDateToTZDate(this.props.timezone, date)
            }
        };

        this.props.onChange(event);
    }

    render () {
        let { format, timezone, value, onChange, ...props } = this.props;

        return (
            <MdDatePicker className="date-picker"
                          formatDate={this.formatDate.bind(this, format)}
                          value={this.shiftTzDateToPickerDate(timezone, value)}
                          onChange={this.onChange.bind(this)}
                          textFieldStyle={{
                              width: '100%',
                              height: 'auto',
                              flex: 1,
                              border: 'none',
                              background: 'none',
                              fontSize: '12px',
                              fontFamily: 'Graphik',
                              fontWeight: '500',
                              color: 'rgb(122, 122, 122)',
                              letterSpacing: '-0.3px',
                              padding: 0
                          }}
                          {...props} />
        );
    }
}
