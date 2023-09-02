import { twMerge } from 'tailwind-merge'

const Button = ({ ...otherProps }) => {
    const { name, type, styleProp, click } = otherProps
    const className = twMerge("w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150", styleProp)
    return <button type={type} className={className} onClick={click}>{name}</button>
}

export default Button