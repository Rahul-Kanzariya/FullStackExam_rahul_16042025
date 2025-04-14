const userModel = require("../src/model/user.model");
const { decodeToken } = require("../src/services/auth.service");

async function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (token == null) {
        return res.status(401).json({ message: 'Authentication token not provided' }); // Unauthorized
    }


    const isValid = decodeToken(token)
    if (isValid && isValid.userId) {
        const user = await userModel.findById({ _id: isValid.userId })
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Not Found
        }
    }
    next()
}

module.exports = authenticateToken;