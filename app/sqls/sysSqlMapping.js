var sys = {
    insertDepart: 'INSERT INTO t_department(c_name,c_no,c_desc,c_pid,t_organization_c_id,c_type) VALUES(?,?,?,?,?,?)',
    queryDepartByOrgId: 'SELECT * FROM t_department WHERE t_organization_c_id = ?',
    updateDepart: 'UPDATE t_department SET c_name = ?, c_no = ? WHERE c_id = ?',
    deleteDepart: 'DELETE FROM t_department WHERE c_id in (?)'
}

module.exports = sys