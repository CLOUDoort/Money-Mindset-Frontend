const Input = ({ ...otherProps }) => {
    return (
        <input required autoComplete='off' className="w-full px-4 py-2 mb-4 text-xl transition ease-in-out bg-white border-gray-400 rounded" {...otherProps} />
    )
}

export default Input