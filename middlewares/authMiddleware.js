const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Access denied" });

    const actualToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

    jwt.verify(actualToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Admin access only" });
    }
    next();
};

module.exports = { authenticateToken, authorizeAdmin };
