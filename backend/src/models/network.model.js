export default (sequelize, DataTypes) => {
  const Network = sequelize.define("network", {
    bssid: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    essid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    privacy: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    cipher: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    auth: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    cracked: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "no"
    },
    channel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(8,6),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    }
  }, {
    tableName: 'networks',
    timestamps: false
  });

  return Network;
}