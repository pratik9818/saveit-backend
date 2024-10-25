import pool from '../database/dbConnection.js'
//get url fragment 
//get file name
//delete the fragments
//delete object in s3

const getdeletedfileName = async ()=>{
    const {rows} = await pool.query(`select url from fragments where is_deleted = true and url is not null`)
    const urls = rows;
    let filesStore = []
    let useridStore = []
    let deletepath = []
    for (let index = 0; index < urls.length; index++) {
            let url = urls[index].url
            const name = url.split('/')[url.split('/').length -1]
            const userid = url.split('/')[url.split('/').length -2]
            const path = userid + '/' + name
            filesStore.push(name);
            useridStore.push(userid)
            deletepath.push(path)
            
    }
    // const res = await deletefragment();
    // console.log(res);

    // delete the obj

    
}
getdeletedfileName()

const deletefragment = async ()=>{
    const res = pool.query('delete from fragment where is_deleted= true')
    return res
}