module.exports = (DataTypes) => {
	return {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		}
	}
}
