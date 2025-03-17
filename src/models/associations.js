const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProject = require('./userProject.model');
const Role = require('./role.model');
const Permission = require('./permission.model');
const RolePermission = require('./rolePermission.model');

// Relación entre Usuario y Rol
User.belongsTo(Role, { foreignKey: 'rol_id' });
Role.hasMany(User, { foreignKey: 'rol_id' });

// Relación entre Usuario y Administrador (auto-referencia)
User.belongsTo(User, { as: 'Administrador', foreignKey: 'administrador_id' });
User.hasMany(User, { as: 'Subordinados', foreignKey: 'administrador_id' });

// Relación entre Proyecto y Usuario (Administrador)
Proyect.belongsTo(User, { as: 'Administrador', foreignKey: 'administrador_id' });
User.hasMany(Proyect, { foreignKey: 'administrador_id' });

// Relación muchos a muchos entre Usuario y Proyecto
User.belongsToMany(Proyect, { through: UserProject, foreignKey: 'usuario_id' });
Proyect.belongsToMany(User, { through: UserProject, foreignKey: 'proyecto_id' });

// Relación muchos a muchos entre Rol y Permiso
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'rol_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permiso_id' });

module.exports = {
    User,
    Proyect,
    UserProject,
    Role,
    Permission,
    RolePermission
};