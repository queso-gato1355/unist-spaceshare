export default function ToggleButton({ buttonNames, stateFunction, state, highlightColor }) {
    function handleClick(e) {
        stateFunction(e.target.value);
    }

    // button slides
    return (
        <div className={`flex justify-center rounded-full border-4 bg-gray-200 border-gray-200`}>
            {buttonNames.map((name, index) => (
                <button
                    key={index}
                    value={name}
                    onClick={handleClick}
                    className={`${state === name ? `${highlightColor} text-white` : "text-gray-500 hover:text-gray-600 hover:bg-gray-300"} ${index == 0 ? "rounded-l-full" : index == buttonNames.length - 1 ? "rounded-r-full" : ""} px-4 py-2 transition-colors duration-300 ease-in-out`}
                >
                    {name}
                </button>
            ))}
        </div>
    );
    
}  