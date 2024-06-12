export default function DropdownMenu({ options, selectedValue, onChange, ...rest }) {
    // options is a list of values
    // ["option1", "option2", "option3",...]
    
    return (
        <select
            value={selectedValue}
            onChange={onChange}
            {...rest}
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
