const jwt = require("jsonwebtoken");

module.exports = {
    isLoggedIn: function(req, res, next) {
        const token = req.body.token;
        //   console.log(token);
        if (token == null) {
            const output = {
                status: "false",
                message: "not login"
            };
            return res.status(200).json(output);
        }

        if (token.length == 0) {
            const output = {
                status: "false",
                message: "not login"
            };
            return res.status(200).json(output);
        }

        jwt.verify(token, "secret", function(err, legit) {
            if (err) {
                const output = {
                    status: "false",
                    message: "logint timeout"
                };
                return res.status(200).json(output);
            }
            req.legit = legit;
        });

        next();
    }
};
