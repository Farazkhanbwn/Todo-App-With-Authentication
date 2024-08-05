const bcrypt = require('bcrypt')

const encryptTextData = async (textData, saltRounds = 10) => {
    if (!textData) {
        return ''
    }
    const hash = await bcrypt.hash(textData, saltRounds)
    return hash
}

const isEncryptedDataValid = async (data, encryptedData) => {
    const isDataMatched = await bcrypt.compare(data, encryptedData)
    return isDataMatched
}

module.exports = {
    encryptTextData,
    isEncryptedDataValid,
}
