-- Calculate the average total duration of assistance requests for each cohort.

-- Use the previous query as a sub query to determine the duration per cohort.
-- Return a single row average_total_duration

SELECT AVG(total_duration) AS average_total_duration
FROM (
  SELECT cohorts.name AS cohort,
    SUM(assistance_requests.completed_at - assistance_requests.started_at) AS total_duration
  FROM students
  JOIN assistance_requests ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  GROUP BY cohorts.name
  ORDER BY total_duration
) AS subquery;