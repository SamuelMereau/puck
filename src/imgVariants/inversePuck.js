export default function inversePuck(imgHeight) {
    return {
        paddingTop: (imgHeight / 100) * 30,
        paddingRight: (imgHeight / 100) * 10,
        paddingBottom: (imgHeight / 100) * 10,
        paddingLeft: (imgHeight / 100) * 30,
    }
}