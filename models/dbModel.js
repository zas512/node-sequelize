const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig.js");

// User model
exports.User = sequelize.define(
  "User",
  {
    USER_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      defaultValue: 0,
    },
    USERNAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Employee model
exports.Employee = sequelize.define(
  "Employee",
  {
    EMP_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    FIRST_NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LAST_NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TEAM_LEAD: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

// Project model
exports.Project = sequelize.define(
  "Project",
  {
    PROJECT_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DESCRIPTION: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ASSIGNED_BY: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "projects",
    timestamps: false,
  }
);

// Add associations
exports.Employee.belongsToMany(exports.Project, {
  through: "EmployeeProject",
  foreignKey: "EMP_ID",
  as: "AssignedProjects",
});
exports.Project.belongsToMany(exports.Employee, {
  through: "EmployeeProject",
  foreignKey: "PROJECT_ID",
  as: "AssignedEmployees",
});

exports.Project.belongsTo(exports.User, {
  foreignKey: "ASSIGNED_BY",
  as: "AssignedByUser",
});
exports.User.hasMany(exports.Project, {
  foreignKey: "ASSIGNED_BY",
  as: "AssignedProjects",
});
