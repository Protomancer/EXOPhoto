const jwt = require('jsonwebtoken');

// create web-token and expire time
const secret = 'shadowyCabal';
const tokenDeath = '2h';

// check auth routes
module.exports = {
    authMiddleWare: function ({req}) {
    //use req.query or headers for sending token
    let superToken = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        superToken = superToken.split('').pop().trim();
    }
    if (!superToken){
        return req;
    }
    // verify the web-token and pull user data
    try {
        const { data } = jwt.verify(superToken, secret, { maxAge: tokenDeath});
        req.user = data;
    } catch {
        console.log('Invalid Token');
    }
    return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload}, secret, { expiresIn: tokenDeath})
    },
};
