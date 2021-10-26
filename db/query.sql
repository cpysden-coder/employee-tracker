SELECT 
employees.id, 
employees.first_name AS first, 
employees.last_name AS last, 
roles.title AS role,
departments.name AS department,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employees 
LEFT JOIN roles ON roles.id=employees.id
LEFT JOIN departments ON roles.department_id=departments.id
LEFT JOIN employees manager ON manager.id=employees.manager_id;