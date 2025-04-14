const jwt  = require('jsonwebtoken');
const screte = 'screte-key'

function generateToken(user){
    const token = jwt.sign({ userId: user._id }, screte, { expiresIn: '1h'});
    return token
}

function decodeToken(token){
    token = token.replace("Bearer ","")
    const decoded = jwt.verify(token, screte);
    return decoded
}

module.exports = {
    generateToken,
    decodeToken,
}