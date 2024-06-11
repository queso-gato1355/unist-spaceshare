// components/store/filter.js
import { createSlice } from '@reduxjs/toolkit';

// 판매자? 장소, 재고 (보관 가능한 상자 종류)
const filterSlice = createSlice({
    name: "filterParam",
    initialState: {
        forBuyer: true,
        timeStart: null,
        timeEnd: null,
        location: "",
        boxNum: [0,0,0,0],
        boxPrices: [0, 0, 0, 0], // integers
    },
    reducers: {
        roleChange(state) {
            state.forBuyer = !state.forBuyer;
        },
        timeSChange(state, action) { // time
            state.timeStart = action.payload.time;
        },
        timeEChange(state, action) { // time
            state.timeEnd = action.payload.time;
        },
        locChange(state, action) { // location
            state.location = action.payload.location;
        },
        boxChange(state, action) { // idx, delta
            const idx = action.payload.idx;
            state.boxNum[idx] = state.boxNum[idx] + action.payload.delta;
        },
        priceChange(state, action) { // idx, newPrice
            const idx = action.payload.idx;
            state.boxPrices[idx] = action.payload.newPrice;
        }
        // // Show the HTTP request notifications
        // showNotification(state, action) {
        //     state.notification = {
        //         status: action.payload.status,
        //         title: action.payload.title,
        //         message: action.payload.message,
        //     };
        // },
    }
});

export default filterSlice;


// {
//     _id: new ObjectId('6662f9b928863a6a9a5218f9'),
//     userId: new ObjectId('665e740a973af77e2014ee5b'),
//     title: 'Title 1',
//     location: 'Other',
//     description: 'Description 1',
//     postedTime: 1717080140,  
//     price: [ 'Price 1-1', 'Price 1-2', 'Price 1-3', 'Price 1-4' ],
//     image: 'https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jfm-2024-1704560007-SGQ6F/living-room-1704796237-OxcYs/la-9-1710762201-Lwnli.jpg',
//     occupation: 'Buyer',
//     state: false
//   }