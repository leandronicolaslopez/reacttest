import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import DatePicker from 'components/utils/date-picker/date-picker';
import AutoComplete from 'components/utils/auto-complete/auto-complete';

import API from 'data/api';

export default class CreateIncident extends React.Component {
    constructor (props) {
        super(props);

        if (this.props.incident) {
            this.state = {
                submitted: false,
                subsidiary: this.props.incident.subsidiary,
                subsidiaryTemp: null,
                description: this.props.incident.description,
                date: moment(this.props.incident.date).toDate()
            };
        } else {
            this.state = {
                submitted: false,
                subsidiary: null,
                subsidiaryTemp: null,
                description: '',
                date: null
            };
        }
    }

    onInputChange (event) {
        let name = event.target.name,
            value = event.target.value;

        this.setState({ [name]: value });
    }

    validate () {
        let errors = {};

        if (!this.state.subsidiary) {
            errors['subsidiary'] = ['required'];
        }

        if (!this.state.description) {
            errors['description'] = ['required'];
        }

        if (!this.state.date) {
            errors['date'] = ['required'];
        }

        return errors;
    }

    submit () {
        this.setState({ submitted: true });

        if (_isEmpty(this.validate())) {
            let incident = {
                subsidiary: this.state.subsidiary,
                description: this.state.description,
                date: this.state.date.valueOf()
            };

            this.setState({ loading: true });

            API.createIncident(incident).then((result) => {
                this.props.onCreated(result);
                this.setState({ loading: false });
            }).catch(() => {
                this.setState({ loading: false });
            });
        }
    }

    onSubsidiaryChange (subsidiary, callback) {
        if (subsidiary) {
            this.setState({
                subsidiary: subsidiary,
                subsidiaryTemp: null
            }, callback);
        } else {
            this.setState({
                subsidiaryTemp: subsidiary
            }, callback);
        }
    }

    getSubsidiaries (searchText) {
        return API.getSubsidiaries(searchText).then((subsidiaries) => {
            let ids = [];

            if (this.state.subsidiary) {
                ids.push(this.state.subsidiary.id);
            }

            return subsidiaries.filter((subsidiary) => {
                return ids.indexOf(subsidiary.id) === -1;
            });
        });
    }

    render () {
        let errors = this.validate();

        return (
            <div className="overflow-container">
                <div className="overflow">
                    <div className="body flex-column">
                        <div className="input-group">
                            <div className="label">Search Subsidiary</div>
                            <div className={'input-container flex-row flex-center' + (this.state.submitted && errors['subsidiary'] ? ' has-error' : '')}>
                                <AutoComplete data={this.getSubsidiaries.bind(this)}
                                              dataConfig={{ text: 'name', value: 'id' }}
                                              value={this.state.subsidiaryTemp}
                                              onChange={this.onSubsidiaryChange.bind(this)} />

                                <img src="images/search-icon.png" alt="search icon" />
                            </div>
                            { this.state.subsidiary &&
                                <div className="subsidiaries-list flex-column">
                                    <div className="item">{ this.state.subsidiary.name }</div>
                                </div>
                            }
                        </div>

                        <div className="input-group">
                            <div className="label">Describe the Incident</div>
                            <div className={'input-container' + (this.state.submitted && errors['description'] ? ' has-error' : '')}>
                                <textarea name="description" value={this.state.description} onChange={this.onInputChange.bind(this)}></textarea>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="label">Date</div>

                            <div className="flex-row">
                                <div className={'input-container flex-row flex-center' + (this.state.submitted && errors['date'] ? ' has-error' : '')}>
                                    <img src="images/calendar-icon.png" alt="search icon" />
                                    <DatePicker name="date" format="MMM DD, YY" timezone="UTC" value={this.state.date} onChange={this.onInputChange.bind(this)} />
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <button className="btn" onClick={this.submit.bind(this)}>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
