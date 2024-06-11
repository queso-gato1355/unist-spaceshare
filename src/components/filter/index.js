// "use server";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '@/components/store';

export default function FilterPage({ handleFilter }) {
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

    return (
        <div>
            <h3>Filter Component</h3>
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
            </div>
            <div>
                <h4>Box Numbers & Prices:</h4>
                {filterParam.boxPrices.map((num, index) => (
                    <div key={index}>
                        {/* <button onClick={handleBoxChange(index, -1)} disabled={num <= 0}>-</button> */}
                        {/* <span> Box {index + 1}: {num} </span> */}
                        {/* <button onClick={handleBoxChange(index, 1)}>+</button> */}
                        <input
                            type='number'
                            value={filterParam.boxPrices[index]}
                            onChange={handlePriceChange(index)}
                            placeholder='0'
                        />
                    </div>
                ))}
            </div>
            <button onClick={handleFilter(filterParam)}>Search!</button>
        </div>
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
  