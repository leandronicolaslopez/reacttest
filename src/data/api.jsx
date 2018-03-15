export default class API {
    static subsidiaries = [
        {
            id: 1,
            name: 'Subsidiary N° 1'
        },
        {
            id: 2,
            name: 'Subsidiary N° 2'
        },
        {
            id: 3,
            name: 'Subsidiary N° 3'
        }
    ];

    static incidents = [
        {
            subsidiary: {
                id: 1,
                name: 'Subsidiary N° 1'
            },
            date: 1494943392147,
            //description: 'This is just a mock',
            // uncomment the line below to see the bug
            description: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789'
        },
        {
            subsidiary: {
                id: 2,
                name: 'Subsidiary N° 2'
            },
            date: 1490943392147,
            description: 'This is just a mock'
        },
        {
            subsidiary: {
                id: 3,
                name: 'Subsidiary N° 3'
            },
            date: 1484943392147,
            description: 'This is just a mock'
        }
    ];

    static getIncidents () {
        return new Promise((resolve) => {
            setTimeout(() => resolve(API.incidents.concat()), 1500);
        });
    }

    static createIncident (incident) {
        return new Promise((resolve) => {
            API.incidents.push(incident);
            resolve(incident);
        });
    }

    static deleteIncident (incident) {
        return new Promise((resolve) => {
            API.incidents.splice(API.incidents.indexOf(incident), 1);
            resolve();
        });
    }

    static getSubsidiaries (searchText) {
        return new Promise((resolve) => resolve(API.subsidiaries.concat()));
    }
}