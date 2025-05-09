import pool from "../database/dbConnection.js";
import { getUserid, insertnewUser, insertuserSubscription_detail, updateLogin } from "../database/dbquery.js";
import { internalserverError, loginError } from "../utils/constant.js";
import { AppError } from "../utils/error.js";


const loginModal = async (email, username) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN');
    const insertedvalues = [email, username,true];
    const res = await client.query(insertnewUser, insertedvalues);
    if (res.rows.length > 0) {
      const user_id = res.rows[0].user_id
      await client.query(insertuserSubscription_detail, [1, user_id])
      client.query('COMMIT')
      return { user_id:user_id, message: 'New user created', newuser: true, status: 201 }
    }

    const selectres = await client.query(updateLogin, [email,true]);
    // await client.query(updateLogin,[true])
    await client.query('COMMIT');
    return { user_id:selectres.rows[0].user_id,message: 'Sucessfull login', newuser: false, status: 200 };
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    throw new AppError({ status: internalserverError, message: loginError })
  }
  finally{
    client.release()
  }
}
export default loginModal;