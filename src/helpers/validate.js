/**
 * Validates whether a URL sends an OK status code
 * @param {string} url URL to validate 
 * @returns {bool} Returns true if URL responded with an OK status code
 */
async function url(url) {
    let isValid = false;

    if (url == undefined) {
        return isValid;
    }

    await fetch(url)
        .then((res) => {
            if (hasAllowedMimeType(res.headers.get('Content-Type'))) {
                isValid = res.ok; 
            }
        })
        .catch((err) => { throw new Error(err) });
    return isValid;
}

/**
 * Validates whether the MIME type is allowed for use in image modification
 * @param {string} contentType MIME type
 * @returns {bool} Returns true if MIME type is allowed
 */
function hasAllowedMimeType(contentType) {
    const pattern = /(image\/)\b(?:gif|jpeg|png|svg\+xml)/g;
    const isAllowed = pattern.test(contentType); 
    console.log({contentType, isAllowed});
    return isAllowed;
}

/**
 * Validates whether a string is numeric
 * @param {string} string Value to check
 * @returns {bool} Returns true if the string is a number
 */
function isNumeric (string) {
    if (typeof string != "string") {
        return false;
    }

    return !isNaN(string) && !isNaN(parseFloat(string));
}

export default { url, isNumeric }