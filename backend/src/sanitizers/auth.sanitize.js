// Sanitizing signup request body
function sanitizeSignup(req, _res, next) {
    const { name, email, password } = req.body;

    req.body = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password
    };

    return next();
}

// Sanitizing login request body
function sanitizeLogin(req, _res, next) {
    const { email, password } = req.body;

    req.body = {
        email: email.toLowerCase().trim(),
        password
    };

    return next();
}

// Sanitizing auth user response
function sanitizeAuthUserResponse(user) {
    return {
        username: user.name,
        email: user.email,
        profilePicture: user.profilePicture || "",
        bgColor: user.bgColor || "#ffffff",
        textColor: user.textColor || "#333333",
    };
}

// Exporting auth sanitizers
export {
    sanitizeAuthUserResponse,
    sanitizeLogin,
    sanitizeSignup
};
