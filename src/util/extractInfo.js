function ExtractInfo(error) {
    const response = error?.response;

    return {status: response.status, code: response.data?.code};
}

export default ExtractInfo;