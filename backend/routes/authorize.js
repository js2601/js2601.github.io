// JWT Authorization (for local storage)

const jwt = require('jsonwebtoken');

function jwtAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({success: false, error: "Unauthorized"});
    }

    jwt.verify(token, 'test', (err, decoded) => {
        if (err) {
            console.error('JWT verify error: ', err);
          return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = jwtAuth;
