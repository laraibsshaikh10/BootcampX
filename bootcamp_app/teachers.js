// const { Pool } = require("pg");


// const pool = new Pool({
//   user: "development",
//   password: "development",
//   host: "localhost",
//   database: "bootcampx",
// });

// const queryString = `
// SELECT DISTINCT teachers.name AS teacher,
// cohorts.name AS cohort,
// COUNT(assistance_requests.*) AS total_assistances

// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id

// WHERE cohorts.name = 'JUL02'
// GROUP BY teachers.name, cohorts.name
// ORDER BY teacher;
//   `;

// const cohortName = process.argv[2];
// const teacherName = process.argv[3] || 5;
// // Store all potentially malicious values in an array.
// const values = [`%${cohortName}%`, teacherName];

// pool.query(queryString, values);


// pool
//   .query(
//     `
//   SELECT DISTINCT teachers.name AS teacher,
//     cohorts.name AS cohort,
//     COUNT(assistance_requests.*) AS total_assistances
  
//   FROM teachers
//   JOIN assistance_requests ON teacher_id = teachers.id
//   JOIN students ON student_id = students.id
//   JOIN cohorts ON cohort_id = cohorts.id
  
//   WHERE cohorts.name = 'JUL02'
//   GROUP BY teachers.name, cohorts.name
//   ORDER BY teacher;
// `
//   )
//   .then((res) => {
//     res.rows.forEach((user) => {
//       console.log(
//         `${user.cohort}: ${user.teacher}`
//       );
//     });
   
//   });

const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = process.argv[2];
const teacherName = process.argv[3] || ''; // Allow for an optional teacher name argument
const values = [`%${cohortName}%`]; // Adjusting the values array

// Construct the query string dynamically
let queryString = `
SELECT DISTINCT teachers.name AS teacher,
    cohorts.name AS cohort,
    COUNT(assistance_requests.*) AS total_assistances
  
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  
  WHERE cohorts.name LIKE $1`;

// If teacherName is provided, include it in the WHERE clause
if (teacherName) {
  queryString += `
  AND teachers.name = $2`;
  values.push(teacherName); // Add the teacherName to the values array
}

queryString += `
  GROUP BY teachers.name, cohorts.name
  ORDER BY teacher;
`;

pool.query(queryString, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
     `${user.cohort}: ${user.teacher}`
      );
   });
  })
  .catch((err) => {
    console.error("Error executing query:", err);
  });
