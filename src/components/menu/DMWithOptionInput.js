// if there's "other" option, show input field

import React, { useState } from "react";

export default function DMWithOptionInput({ options, onChange, ...rest }) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        if (value === "other") {
            setShowInput(true);
        } else {
            setSelectedOption(value);
            setShowInput(false);
            setInputValue("");
            onChange(e);
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onChange(e);
    }

    return (
        <div>
            <select
                value={selectedOption}
                onChange={handleSelectChange}
                {...rest}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
                <option value="other">Other</option>
            </select>
            {showInput && (
                <input
                    type="text"
                    name="otherInput"
                    placeholder="Please specify"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded"
                />
            )}
        </div>
    );
}