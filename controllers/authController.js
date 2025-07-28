const jwt = require("jsonwebtoken");
const AuthService = require("../services/AuthService");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.findUserByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      role_id: user.role_id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    await AuthService.updateLastLogin(user.id);

    res.json({
      token,
      user: AuthService.formatUserResponse(user)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const newUser = await AuthService.createUser({
      email,
      password_hash: password,
      first_name,
      last_name,
      role_id: 2,
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      first_name: newUser.first_name,
      role_id: newUser.role_id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: AuthService.formatUserResponse(newUser)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await AuthService.verifyFirebaseToken(token);
    const { uid, email, name, picture } = decodedToken;

    let user = await AuthService.findUserByGoogleIdOrEmail(uid, email);

    if (!user) {
      user = await AuthService.createUser({
        email,
        google_id: uid,
        email_verified: true,
        first_name: name?.split(" ")[0],
        last_name: name?.split(" ")[1] || '',
        role_id: 2
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      role_id: user.role_id
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    await AuthService.updateLastLogin(user.id);

    res.json({
      token: jwtToken,
      user: AuthService.formatUserResponse(user, picture)
    });

  } catch (err) {
    res.status(401).json({ error: "Invalid Firebase token" });
  }
};

