import React from 'react';
import _flattenDeep from 'lodash/flattenDeep';

import Confirmation from 'components/utils/confirmation/confirmation';
import { createConfirmation } from 'react-confirm';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import CreateIndicent from 'components/incidents/create-indicent/create-indicent';

import IncidentItem from './incidentItem';

import API from 'data/api';
import dateComparator from '../../utils/comparators/dateComparator';
import subsidiaryComparator from '../../utils/comparators/subsidiaryComparator';

export default class Indicents extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isLoading: false,
            selected: null,
            incidents: [],
            searchText: '',
            dialogOpen: false,
            confirmationOpen: false,
            sortBy:'',
            sortOrder:''
        };
    }

    componentWillMount () {
        this.getIncidents();
    }

    onInputChange (event) {
        let name = event.target.name,
            value = event.target.value;

        this.setState({ [name]: value });
    }

    openDialog () {
        this.setState({ dialogOpen: true });
    }

    onIndicentCreated (incident) {
        if (this.state.selected) {
            let incidents = this.state.incidents.concat();
            incidents[incidents.indexOf(this.state.selected)] = incident;

            this.setState({
                selected: null,
                dialogOpen: false,
                incidents: incidents
            });
        } else {
            this.setState({
                dialogOpen: false,
                incidents: this.state.incidents.concat(incident)
            });
        }
    }

    getIncidents () {
        this.setState({ isLoading:true });
        return API.getIncidents().then((incidents) => {
            this.setState({ incidents:incidents, isLoading:false });
        });
    }

    getFilteredIncidents () {
        return this.state.incidents.filter((item) => {
            if (this.state.searchText) {
                let strings = [
                    item.subsidiary.name,
                    item.description
                ];

                return _flattenDeep(strings).some((value) => value.toString().toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1);
            } else {
                return true;
            }
        });
    }

    deleteIncident (incident) {
        createConfirmation(Confirmation)({
            title: 'Wait!',
            confirmation: 'Are you sure you want to delete it?'
        }).then(() => {
            return API.deleteIncident(incident);
        }).then(() => {
            let incidents = this.state.incidents.concat();
            incidents.splice(incidents.indexOf(incident), 1);

            this.setState({ incidents });
        });
    }

    editIncident (incident) {
        this.setState({
            selected: incident,
            dialogOpen: true
        });
    }

    sortBy(field) {
        let sortOrder = 'asc';

        //if we are already sorting by this field, we invert the orders
        if(this.state.sortBy == field) {
            sortOrder = this.state.sortOrder == 'asc' ? 'desc' : 'asc';
        }

        this.setState({
            sortBy: field,
            sortOrder: sortOrder
        });

        var comparatorMap = new Map();
        comparatorMap.set('date', dateComparator.bind(this,sortOrder));
        comparatorMap.set('subsidiary', subsidiaryComparator.bind(this,sortOrder));

        let comparator = this.defaultComparator.bind(this,sortOrder);
        if(comparatorMap.has(field)) {
            comparator = comparatorMap.get(field);
        }

        this.state.incidents.sort(comparator)
    }

    defaultComparator() {
        return 1;
    }

    render () {
        let incidents = this.getFilteredIncidents();

        return (
            <div className="incidents-component">
                <div className="flex-row">
                    <div className="content">
                        <div className="body">
                            <div className="heading flex-row flex-center-space-between">
                                <button className="btn" onClick={this.openDialog.bind(this)}>
                                    Add New
                                </button>

                                <div className="input-container flex-row flex-center">
                                    <input name="searchText" value={this.state.searchText} onChange={this.onInputChange.bind(this)} placeholder="Search" />
                                    <img src="images/search-icon.png" alt="search icon" />
                                </div>
                            </div>

                            <div className="panel-container flex-row">
                                <div className="head flex-row">
                                    <div className="col date" onClick={this.sortBy.bind(this, 'date')}>Date</div>
                                    <div className="col subsidiary" onClick={this.sortBy.bind(this, 'subsidiary')}>Subsidiary</div>
                                    <div className="col description">Incident</div>
                                </div>
                            </div>
                            
                            {this.state.isLoading && <p>Loading...</p>}

                            { !this.state.isLoading && incidents.map((incident, i) =>
                                <IncidentItem incident={incident} key={i}
                                onEdit={()=>{this.editIncident(incident)}}
                                onDelete={()=>{this.deleteIncident(incident)}}/>
                            )}

                        </div>
                    </div>
                </div>

                <Dialog open={this.state.dialogOpen}
                        onRequestClose={() => this.setState({ dialogOpen: false, selected: null })}
                        bodyStyle={{ fontFamily: 'Graphik', padding: '20px' }}
                        contentStyle={{ width: '100%', maxWidth: '820px' }}>
                    <CreateIndicent onCreated={this.onIndicentCreated.bind(this)}
                                    incident={this.state.selected} />
                </Dialog>
            </div>
        );
    }
}
