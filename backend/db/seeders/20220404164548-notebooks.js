'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Notebooks', [
      {
        title: 'Miscellaneous',
        userId: 1
      },
      {
        title: 'TITLE 2',
        userId: 1
      },
      {
        title: 'TITLE 3',
        userId: 1
      },
      {
        title: 'TITLE 4',
        userId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
