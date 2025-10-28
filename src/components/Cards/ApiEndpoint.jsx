function ApiEndpoint({method, endpoint}) {
    const methodColors = {
        GET: "bg-blue-600 hover:bg-blue-600",
        POST: "bg-green-600 hover:bg-green-600",
        PUT: "bg-yellow-600 hover:bg-yellow-600",
        DELETE: "bg-red-600 hover:bg-red-600",
        PATCH: "bg-purple-600 hover:bg-purple-600",
    };

    return (
        <div className="flex items-center gap-3 bg-gray-900 rounded-lg p-4 border border-gray-800">
            <Badge className={`${methodColors[method]} text-white`}>{method}</Badge>
            <code className="text-sm text-blue-400">{endpoint}</code>
        </div>
    );
}

export default ApiEndpoint;