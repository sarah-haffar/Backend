const db = require('../../models');

exports.assignRoleToUser = async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  try {
    const user = await db.User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const role = await db.Role.findByPk(roleId);
    if (!role) return res.status(404).json({ error: "Rôle non trouvé" });

    user.role_id = roleId;
    await user.save();

    res.json({ message: "Rôle assigné avec succès", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
