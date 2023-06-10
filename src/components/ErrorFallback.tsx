const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
    return (
        <div className="flex w-full h-full">
            <p>Something went wrong: </p>
            <div className="flex flex-col items-center justify-center flex-1 p-10 text-5xl">{error.message}</div>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default ErrorFallback