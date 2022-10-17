import useBcrypt from 'sequelize-bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  useBcrypt(User, {
    field: 'password',
    rounds: 10,
    compare: 'authenticate',
  });

  return User;
}