'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Notes', [
      {
        title: "Dimma-do's",
        content: "Remember to buy 45-gallon hat",
        userId: 1,
        notebookId: 1
      },
      {
        title: "Dimma-dont's",
        content: "Stop paying employees with dimma-dollars",
        userId: 1,
        notebookId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
