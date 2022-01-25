/**
 * Calculates puck paddings and margins for image
 * @param {number} imgHeight Height of image
 * @returns {Object} Paddings and margins required to create image modification
 */
export default function puck(imgHeight) {
    const topLeftPadding = (imgHeight / 100) * 10;
    const rightBottomPadding =  (imgHeight / 100) * 40;
    return {
        "padding" : {
            top: topLeftPadding,
            right: rightBottomPadding,
            bottom: rightBottomPadding,
            left: topLeftPadding
        },
        "margin" : {
            top: -topLeftPadding,
            right: -rightBottomPadding,
            bottom: -rightBottomPadding,
            left: -topLeftPadding
        }
    };
}