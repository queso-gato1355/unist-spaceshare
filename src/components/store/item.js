// import { createSlice } from '@reduxjs/toolkit';

// // const initItem = {
// //     id: ???,
// //     title: '',
// //     quantity: 0,
// //     price: 0,
// //     total: 0,
// // };

// const itemSlice = createSlice({
//     name: "item",
//     initialState: {
//         items: [],
//         totalQuantity: 0, // to display at the badge of cart.
//         changed: false,
//     },
//     reducers: {
//         // Added to load the cart from the DB!
//         replaceItem(state, action) {
//             state.items = action.payload.items;
//             state.totalQuantity = action.payload.totalQuantity;
//             // changed = false;
//         },
//         // Or addItemToCart(state, action)
//         increment(state, action) {
//             // action: {id, title, price} object.
//             const newItem = action.payload;
//             let items = state.items;
//             let idx = items.findIndex(item=>{
//                 return item.id === newItem.id;
//             });
//             if(idx>=0) {
//                 items[idx].quantity++;
//                 items[idx].total += items[idx].price;
//             } else { // add-to-cart called for a new item.
//                 items.push({
//                     ...newItem,
//                     quantity: 1,
//                     total: newItem.price,
//                 });
//             }
//             state.totalQuantity++;
//             state.changed = true;
//         },
//         decrement(state, action) {
//             const id = action.payload;
//             // action: id object.
//             let items = state.items;
//             let idx = items.findIndex(item=>{
//                 return item.id === id;
//             });
//             if(idx>-1) {
//                 if(items[idx].quantity > 1) {
//                     items[idx].quantity--;
//                     items[idx].total -= items[idx].price;
//                 }
//                 else {
//                     // items = items.filter(item => item.id !== id);
//                     items.splice(idx, 1);
//                 }
//                 state.totalQuantity--;
//                 state.changed = true;
//             } else {
//                 console.log(`INVALID Reducer: Cannot delete un-existing item with id ${action.payload} from the state`);
//             }
//         },
//     }
// });

// export default itemSlice;