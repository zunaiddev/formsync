function KeyCardSkeleton() {
    return (
        <div
            className="shadow-lg rounded-2xl p-6 w-full max-w-lg bg-[var(--bg-secondary)] animate-pulse relative mx-auto sm:mx-0">

            <div className="mb-4 h-3 w-16 bg-gray-400 rounded"></div>

            <div className="mb-4 h-4 w-76 bg-gray-300 rounded"></div>

            <div className="mb-4">
                <div className="h-4 w-28 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>

            <div className="mb-4">
                <div className="h-4 w-20 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>

            <div className="mb-4">
                <div className="h-4 w-40 bg-gray-400 rounded mb-2"></div>
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-30 bg-gray-300 rounded-lg"></div>
                    <div className="h-6 w-30 bg-gray-300 rounded-lg"></div>
                    <div className="h-6 w-30 bg-gray-300 rounded-lg"></div>
                </div>

            </div>

            <div className="flex flex-col gap-3 flex-wrap md:gap-6 md:flex-row w-full">
                <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
                <div className="h-10 w-35 bg-gray-300 rounded-lg"></div>
                <div className="h-10 w-35 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    );
}

export default KeyCardSkeleton;