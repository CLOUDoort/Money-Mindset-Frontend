const Input = ({ ...otherProps }) => {
    return (
        <input required autoComplete='off' className="w-full h-12 px-4 py-2 mt-2 mb-4 text-center transition ease-in-out bg-white border-gray-400 rounded" {...otherProps} />
    )
}

export default Input