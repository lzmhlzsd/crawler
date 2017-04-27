var user = {
    queryWebsite: 'SELECT * FROM t_website WHERE c_is_use = 1',
    queryWebsiteByNo: 'SELECT * FROM t_website WHERE c_no = ?',
    insertWebsite: 'INSERT INTO t_website(c_no,c_name,c_url,c_is_use) VALUES(?,?,?,?)',
    updateWebsite: 'UPDATE t_website SET c_is_use = ? WHERE c_id = ?',
    insertHistory: 'INSERT INTO t_history(c_website_id,c_zjobj_3,c_zjobj_1,c_zjobj_0,\
    c_zsobj_3,c_zsobj_1,c_zsobj_0,c_eu_odds_3,c_eu_odds_1,c_eu_odds_0,c_volume_3,c_volume_1,c_volume_0)\
     VALUES %s',
    queryHistory: 'SELECT * FROM crawler.t_history where c_website_id in (SELECT c_id FROM crawler.t_website where c_no = ?)'
};

module.exports = user;