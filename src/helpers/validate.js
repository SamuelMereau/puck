/**
 * Validates whether a URL sends an OK status code
 * @param {string} url URL to validate 
 * @returns {bool} Returns true if URL responded with an OK status code
 */
async function url(url) {
    let isValid = false;
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

export default { url }