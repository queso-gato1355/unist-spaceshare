// "use server";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '@/components/store';

export default function FilterPage() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);

    const handleRoleChange = () => {
        dispatch(actions.filter.roleChange());
    };

    const handleLocationChange = (event) => {
        dispatch(actions.filter.locChange({ location: event.target.value }));
    };

    const handleBoxChange = (index, delta) => () => {
        dispatch(actions.filter.boxChange({ idx: index, delta }));
    };

    return (
        <div>
            <h3>Filter Component</h3>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.forBuyer}
                        onChange={handleRoleChange}
                    />
                    Are you a buyer?
                </label>
            </div>
            <div>
                <input
                    type="text"
                    value={filter.location}
                    onChange={handleLocationChange}
                    placeholder="Enter location"
                />
            </div>
            <div>
                <h4>Box Numbers:</h4>
                {filter.boxNum.map((num, index) => (
                    <div key={index}>
                        <button onClick={handleBoxChange(index, -1)} disabled={num <= 0}>-</button>
                        <span> Box {index + 1}: {num} </span>
                        <button onClick={handleBoxChange(index, 1)}>+</button>
                    </div>
                ))}
            </div>
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
  