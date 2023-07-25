const Input = ({ ...otherProps }) => {
    const registerInput = otherProps?.register
    return (
        <input autoComplete='off' className="w-full h-12 px-4 py-2 my-1 mb-1 transition ease-in-out bg-white border-gray-400 rounded" {...otherProps} {...registerInput} />
    )
}

export default Input