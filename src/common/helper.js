export const handleAPIResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
}

export const encapsulateMethodHeader = (method) => {
    return {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
}