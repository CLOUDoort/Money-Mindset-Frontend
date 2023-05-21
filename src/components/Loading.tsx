import { useIsFetching, useIsMutating } from "react-query"

const Loading = () => {
    const isFetching = useIsFetching()
    const isMutating = useIsMutating()
    const display = isFetching || isMutating ? true : false
    return (
        <div>
            {display && <div className="text-5xl">Loading</div>}
        </div>
    )
}

export default Loading