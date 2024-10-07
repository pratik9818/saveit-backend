export const insertnewUser = `insert into users (email ,user_name) values ($1,$2) on conflict (email) do nothing returning user_id`
export const getUserid = `select user_id from users where email=$1`
export const insertuserSubscription_detail = `insert into subscription_detail (subscription_type_id,user_id) values($1,$2)`
export const getuserSubcriptionDetail = 'select sd.* , st.* from subscription_detail sd inner join subscription_type st on sd.subscription_type_id = st.subscription_type_id where sd.user_id=$1' 
export const insertCapsule = 'insert into capsules (user_id,capsule_name) values ($1,$2)'
export const editCapsule = 'update capsules set capsule_name=$1 where capsule_id=$2' 
export const getCapsules = 'select * from capsules where user_id=$1'