const { User, Role } = require('../models');
const { Op } = require('sequelize');
const admin = require('../config/firebaseConfig.js');

class AuthService {
  // Find user by email with role
  async findUserByEmail(email) {
    return await User.findOne({
      where: { email, is_active: true },
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'name', 'permissions']
      }]
    });
  }

  // Find user by ID with role
  async findUserById(id) {
    return await User.findByPk(id, {
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'name', 'permissions']
      }]
    });
  }

  // Find user by Google ID or email
  async findUserByGoogleIdOrEmail(googleId, email) {
    return await User.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { google_id: googleId }
        ]
      },
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'name', 'permissions']
      }]
    });
  }

  // Create new user
  async createUser(userData) {
    const user = await User.create(userData);
    return await this.findUserById(user.id);
  }

  // Update user last login
  async updateLastLogin(userId) {
    await User.update(
      { last_login: new Date() },
      { where: { id: userId } }
    );
  }

  // Update user role
  async updateUserRole(userId, roleId) {
    await User.update(
      { role_id: roleId },
      { where: { id: userId } }
    );
    return await this.findUserById(userId);
  }

  // Verify Firebase token
  async verifyFirebaseToken(token) {
    return await admin.auth().verifyIdToken(token);
  }

  // Get user permissions
  getUserPermissions(user) {
    return user.role ? user.role.permissions || [] : [];
  }

  // Format user response
  // Format user response
  formatUserResponse(user, picture = null) {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: `${user.first_name} ${user.last_name}`, // <-- corrigé ici
      phone: user.phone,
      address: user.address,
      city: user.city,
      postal_code: user.postal_code,
      country: user.country,
      role: user.role,
      email_verified: user.email_verified,
      last_login: user.last_login,
      ...(picture && { picture })
    };
  }
}

module.exports = new AuthService();