function ExtractInfo(error) {
    const response = error?.response;

    return {active: response.active, code: response.data?.code};
}

export default ExtractInfo;