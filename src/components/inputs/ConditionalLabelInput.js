export default function ConditionalLabelInput({
    label,
    name,
    type,
    value,
    onChange,
    error,
    errorMessage,
    showUpper,
    ...rest
}) {
    return (
        <div className="flex flex-col items-center w-full mb-2">
            <div className="flex items-end w-full">
                {label && (
                    <label htmlFor={name} className="block ml-2 mr-3">
                        {label}
                    </label>
                )}
                {showUpper && error && (
                    <label className="text-red-500 text-sm mb-[2px]">
                        {errorMessage}
                    </label>
                )}
            </div>
            <input
                className={`border p-2 w-full rounded ${
                    error ? "border-red-500" : ""
                }`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
            />
            <div className="w-full">
                {!showUpper && error && (
                    <label className="text-red-500 text-xs">
                        {errorMessage}
                    </label>
                )}
            </div>
        </div>
    );
}
