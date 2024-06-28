
import sequelize from '../config/db'

const Tutor = sequelize.define('Tutor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Tutor;