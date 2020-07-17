module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tasks', 'completed', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('tasks', 'completed');
  },
};
