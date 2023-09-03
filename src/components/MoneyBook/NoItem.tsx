import { MdOutlineSpeakerNotesOff } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

const NoItem = ({ ...otherProps }) => {
    const { styleProp } = otherProps
    const className = twMerge('flex items-center border rounded justify-center h-full m-auto text-2xl', styleProp)
    return (
        <div className={className}>
            <MdOutlineSpeakerNotesOff size={50} />
        </div>
    )
}

export default NoItem