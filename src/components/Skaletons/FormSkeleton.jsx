function FormSkeleton() {
    return (
        <div
            className="flex flex-wrap gap-2 items-center bg-[#1b263b] w-full min-h-12 rounded-lg relative border border-transparent p-2 animate-pulse">

            <div className="h-6 w-6 bg-gray-600 rounded"></div>

            <div className="h-4 bg-gray-500 rounded flex-1 max-w-[150px]"></div>

            <div className="hidden sm:block h-4 bg-gray-500 rounded flex-1 sm:flex-[0.8] max-w-[180px]"></div>

            <div className="hidden md:block h-4 bg-gray-500 rounded flex-1 md:flex-[0.7] max-w-[160px]"></div>

            <div className="hidden lg:block h-4 bg-gray-500 rounded flex-[0.5] max-w-[120px]"></div>

            <div className="hidden md:block h-4 bg-gray-500 rounded flex-1 max-w-[200px]"></div>

            <div className="h-4 w-10 bg-gray-400 rounded"></div>
        </div>
    );
}

export default FormSkeleton;