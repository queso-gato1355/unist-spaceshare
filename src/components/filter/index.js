// "use server";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '@/components/store';

export default function FilterPage({ initFilter, handleFilter }) {
    const dispatch = useDispatch();
    const filterParam = useSelector(state => state.filter);

    const handleRoleChange = () => {
        dispatch(actions.filterParam.roleChange());
    };

    const handleLocationChange = (event) => {
        dispatch(actions.filterParam.locChange({ location: event.target.value }));
    };

    // const handleBoxChange = (index, delta) => () => {
    //     dispatch(actions.filterParam.boxChange({ idx: index, delta }));
    // };

    const handlePriceChange = (index) => (event) => {
        dispatch(actions.filterParam.priceChange({idx: index, newPrice: event.target.value}));
    };

    const boxNames=["small", "medium", "large", "XL"];

    return (
        <>
            <h3>Filter</h3>
            <div className='flex flex-col md:flex-row bg-pink-50 w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4 mx-auto justify-between items-center mb-4'>
                <div className='flex flex-col w-full md:w-1/4 space-y-4'>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={filterParam.forBuyer}
                                onChange={handleRoleChange}
                            />
                            Are you a buyer?
                        </label>
                    </div>
                    {/* <div>
                        <input
                            type="text"
                            value={filterParam.location}
                            onChange={}
                            placeholder="Enter location. e.g. 301"
                        />
                    </div> */}

                    <div>
                        <label>
                            Location: 
                            <select
                                value={filterParam.location}
                                onChange={handleLocationChange}
                                name="statusCode"
                                id="statusCode"
                                placeholder="Enter location. e.g. 301"
                            >
                                <option value="" >Any Location (default)</option> {/* Placeholder for "null" disabled */}
                                <option value="301">301</option>
                                <option value="302">302</option>
                                <option value="303">303</option>
                                <option value="304">304</option>
                                <option value="305">305</option>
                                <option value="306">306</option>
                                <option value="307">307</option>
                                <option value="308">308</option>
                                <option value="309">309</option>
                                {/* <option value="others">others</option> */}
                            </select>
                        </label>
                    </div>
                </div>
                <div className='flex flex-col w-full md:w-1/2 space-y-4'>
                    <div>
                        <h4>Box Prices:</h4>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-8">
                            <div className='flex flex-col w-full md:w-1/2 space-y-4'>
                                {[0,1].map((index) => (
                                    <div key={index} className='flex items-center'>
                                        <label className='mr-2 min-w-[60px]'>
                                            {boxNames[index]}
                                        </label>
                                        <input
                                            type='number'
                                            className='flex w-full md:mr-1'
                                            value={filterParam.boxPrices[index]}
                                            onChange={handlePriceChange(index)}
                                            placeholder='0'
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col w-full md:w-1/2 space-y-4'>
                                {[2, 3].map((index) => (
                                    <div key={index} className='flex items-center'>
                                        <label className='mr-2 min-w-[60px]'>
                                            {boxNames[index]}
                                        </label>
                                        <input
                                            type='number'
                                            className='flex w-full md:mr-1'
                                            value={filterParam.boxPrices[index]}
                                            onChange={handlePriceChange(index)}
                                            placeholder='0'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-4 w-full md:w-1/4 h-full justify-center' >
                    <button className="flex min-h-8 bg-slate-300 justify-center items-center" onClick={initFilter}>Find All!</button>
                    <button className="flex min-h-8 bg-slate-300 justify-center items-center" onClick={handleFilter(filterParam)}>Search!</button>
                </div>
            </div>
        </>
    );
};

// export default class FilterPage extends React.Component {
//     state = { username: '' };

//     handleRadio = event => {
//         this.setState({});
//     }

//     handleChange = event => {
//       this.setState({ username: event.target.value });
//     };
  
//     handleSubmit = event => {
//       alert('A name was submitted: ' + this.state.username);
//       event.preventDefault();
//     };
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name:
//             <input type="text" value={this.state.username} onChange={this.handleChange} />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       );
//     }
//   }
  