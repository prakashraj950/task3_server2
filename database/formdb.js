import util from 'util';

export class FormSetDb{
    constructor(conn){
    this.conn =conn;
    this.query = util.promisify(conn.query).bind(conn);
}





async read_form_data(form_data){
    const stmt = "SELECT * FROM form_data WHERE  STRCMP(Email,?) = 0";

    try{
        const rows = await this.query(stmt,[form_data.email])
        if (rows.length === 1){
         form_data.copy(rows[0]);
        }
    }
    catch(err){
        throw err;
    }
}
}