import { twMerge } from "tailwind-merge"

const Input = ({ ...otherProps }) => {
    const { styleProp } = otherProps
    const className = twMerge("w-full h-12 px-4 py-2 my-1 mb-1 transition ease-in-out bg-white border-gray-400 rounded", styleProp)
    const registerInput = otherProps?.register
    return (
        <input autoComplete='off' required className={className} {...otherProps} {...registerInput} />
    )
}

export default Input