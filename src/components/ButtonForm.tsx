const Button = ({ ...otherProps }) => {
    const { name, type, style } = otherProps
    return <button type={type} className={`w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150 ${style}`}>{name}</button>
}

export default Button