function ExtractErrorInfo(err) {
    const response = err?.response;

    return {
        status: response?.status,
        code: response?.data?.code,
    }
}

export default ExtractErrorInfo;