/**
 * Creates an SVG element with provided values
 * @param {number} width Width of SVG 
 * @param {number} height Height of SVG 
 * @param {Object} padding Paddings to modify shape of image
 * @param {Object} margin Margins to align image
 * @param {string} imgData Base64 Image Data
 * @returns {string} Inline SVG Element
 */
export default function createSvg({width, height, padding, margin, imgData}) {
    const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="
        border-radius: 50%;
        padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
        margin: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;
    ">
        <image href="${imgData}" height="100%"/>
    </svg>`;
    return svg.replace(/\n/g,"").replace(/\s\s+/g, " ");
}