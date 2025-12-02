export function decryptXOR(text, key) {
    const decoded = Buffer.from(text, 'base64')
    const bytes = [(key >> 8) & 0xFF, key & 0xFF]
    let output = ''
    for (let i=0; i<decoded.length; i++) {
        let xorByte = decoded[i] ^ bytes[i % bytes.length]
        output += String.fromCharCode(xorByte)
    }
    return output

}