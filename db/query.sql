SELECT
    -> employee.id AS banana,
    -> employee.first_name AS orange
    -> FROM
    -> employees
    -> JOIN employees ON employees.id = employees.manager_id;