export default function puck(imgHeight) {
    return {
        paddingTop: (imgHeight / 100) * 10,
        paddingRight: (imgHeight / 100) * 40,
        paddingBottom: (imgHeight / 100) * 40,
        paddingLeft: (imgHeight / 100) * 10,
    }
}