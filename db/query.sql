SELECT
    -> e.first_name + ' ' + e.last_name employee,
    -> m.first_name + ' ' + m.last_name manager
    -> FROM
    -> employees e
    -> INNER JOIN employees m ON m.id = e.manager_id
    -> ORDER BY
    -> manager;