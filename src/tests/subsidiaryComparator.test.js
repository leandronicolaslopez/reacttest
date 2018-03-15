import React from 'react';
import subsidiaryComparator from './../utils/comparators/subsidiaryComparator.js';

const mock = [
    {
        subsidiary: {
            id: 1,
            name: 'Subsidiary N° 1'
        },
        date: 1494943392147,
        description: 'This is just a mock',
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

it('order subsidiary desc', () => {
    
    const expectedSort = [
        {
            subsidiary: {
                id: 3,
                name: 'Subsidiary N° 3'
            },
            date: 1484943392147,
            description: 'This is just a mock'
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
                id: 1,
                name: 'Subsidiary N° 1'
            },
            date: 1494943392147,
            description: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789'
        }
    ];
    let comparator =subsidiaryComparator.bind(this, "desc");
    expect(mock.sort(comparator)).toEqual(expectedSort);
  });

  it('order subsidiary asc', () => {
    
    const expectedSort = [
        {
            subsidiary: {
                id: 1,
                name: 'Subsidiary N° 1'
            },
            date: 1494943392147,
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
    let comparator =subsidiaryComparator.bind(this, "asc");
    expect(mock.sort(comparator)).toEqual(expectedSort);
  });