exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Kait', cohort_id: 1 },
        { name: 'Zack', cohort_id: 1 },
        { name: 'Jon', cohort_id: 2 }
      ]);
    });
};
