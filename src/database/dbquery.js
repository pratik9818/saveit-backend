export const insertnewUser = `insert into users (email ,user_name) values ($1,$2) on conflict (email) do nothing returning user_id`
export const getUserid = `select user_id from users where email=$1`
export const insertuserSubscription_detail = `insert into subscription_detail (subscription_type_id,user_id) values($1,$2)`
export const getuserSubcriptionDetail = 'select sd.* , st.* from subscription_detail sd inner join subscription_type st on sd.subscription_type_id = st.subscription_type_id where sd.user_id=$1' 
export const insertCapsule = 'insert into capsules (user_id,capsule_name) values ($1,$2)'
export const editCapsule = 'update capsules set capsule_name=$1 where user_id=$2 and capsule_id=$3' 
export const getCapsulesInDescOrder = 'select * from capsules where user_id=$1 and created_at <= $2 order by created_at desc limit 10'
export const getCapsulesInAscOrder = 'select * from capsules where user_id=$1 and created_at <= $2 order by created_at asc limit 10'
export const getCapsulessortbySizeInAsc = 'select * from capsules where user_id=$1 and capsule_size <= $2 order by capsule_size asc limit 10'
export const getCapsulessortbySizeInDesc = 'select * from capsules where user_id=$1 and capsule_size <= $2 order by capsule_size desc limit 10'
export const getcaplsulesbyDatemodified = 'select * from capsules where user_id=$1 and updated_at <= $2 order by updated_at desc limit 10'

export const incrementcapsuleCount = 'update subscription_detail set capsule_count_used = $1 where user_id=$2'

export const searchcapsulesbyName = 'select * from capsules where user_id=$1 and capsule_name ilike $2'

export const deleteCapsules = 'delete from capsules where user_id=$1 and capsule_id = any($2)'