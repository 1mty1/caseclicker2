let dailyItems = [{
    type: 'item',
    item: 'The Cobblestone Collection',
    display: ['Cobblestone', 'Collection'],
    color: '#350d46',
    text: '#f3f3e7',
}, {
    type: 'item',
    item: 'The Chop Shop Collection',
    amount: 25,
    display: ['25x', 'Chop Shop'],
    color: '#e2aa1f',
    text: '#000',
}, {
    type: 'item',
    item: 'The Vertigo Collection',
    amount: 25,
    display: ['25x', 'Vertigo'],
    color: '#9b1604',
    text: '#fff',
}, {
    type: 'item',
    item: 'Karambit | Tiger Tooth (Minimal Wear)',
    display: ['Karambit', 'Tiger Tooth'],
    color: '#c88228',
    text: '#222',
}, {
    type: 'item',
    item: 'The 2021 Vertigo Collection',
    amount: 50,
    display: ['50x', '2021 Vertigo'],
    color: '#ddd',
    text: '#000',
}, {
    type: 'money',
    amount: 120000,
    color: '#444',
    text: '#fff',
}];

let dailyItem = dailyItems[(Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24)) % dailyItems.length];

export default {
    prizes: [{
            type: 'money',
            amount: 50000,
            color: '#c40a0a',
        },
        {
            type: 'xp',
            amount: 25000,
            color: '#b9670e',
        },
        {
            type: 'money',
            amount: 10000,
            color: '#c9c914',
        },
        {
            type: 'money',
            amount: 15000,
            color: '#76ce0f',
        },
        dailyItem,
        {
            type: 'xp',
            amount: 10000,
            color: '#0fcc74',
        },
        {
            type: 'money',
            amount: 20000,
            color: '#0fc5c5',
        },
        {
            type: 'xp',
            amount: 5000,
            color: '#0d71cb',
        },
        {
            type: 'money',
            amount: 10000,
            color: '#0c0cd9',
        },
        {
            type: 'money',
            amount: 7500,
            color: '#810aea',
        },
        {
            type: 'money',
            amount: 5000,
            color: '#d70fd7',
        },
        {
            type: 'xp',
            amount: 15000,
            color: '#e10d7e',
        },
    ]
};