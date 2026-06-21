function sanitizeSignup(req, _res, next) {
    const { name, email, password, privacyPolicyAccepted, termsAccepted } = req.body;

    req.body = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        privacyPolicyAccepted,
        termsAccepted,
    };

    return next();
}

function sanitizeLogin(req, _res, next) {
    const { email, password } = req.body;

    req.body = {
        email: email.toLowerCase().trim(),
        password,
    };

    return next();
}

function sanitizeAuthUserResponse(user) {
    return {
        username: user.name,
        email: user.email,
        profilePicture: user.profilePicture || "",
        bgColor: user.bgColor || "#ffffff",
        textColor: user.textColor || "#333333",
        role: user.role || "user",
        customLogo: user.customLogo || "",
        customName: user.customName || "",
        removeLinkterBranding: user.removeLinkterBranding || false,
    };
}

export { sanitizeAuthUserResponse, sanitizeLogin, sanitizeSignup };
