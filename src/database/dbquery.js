export const insertnewUser = `insert into users (email ,user_name) values ($1,$2) on conflict (email) do nothing returning user_id`
export const getUserid = `select user_id from users where email=$1`
export const insertuserSubscription_detail = `insert into subscription_detail (subscription_type_id,user_id) values($1,$2)`
export const getuserSubcriptionDetail = 'select sd.* , st.* from subscription_detail sd inner join subscription_type st on sd.subscription_type_id = st.subscription_type_id where sd.user_id=$1'
export const insertCapsule = 'insert into capsules (user_id,capsule_name,updated_at) values ($1,$2,$3)'
export const editCapsule = 'update capsules set capsule_name=$1 where user_id=$2 and capsule_id=$3' 
export const getCapsulesInDescOrder = 'select * from capsules where user_id=$1 and created_at <= $2 and is_deleted=false order  by created_at desc limit 10'
export const getCapsulesInAscOrder = 'select * from capsules where user_id=$1 and created_at <= $2 and is_deleted=false order by created_at asc limit 10'
export const getCapsulessortbySizeInAsc = 'select * from capsules where user_id=$1 and capsule_size <= $2 and is_deleted=false order by capsule_size asc limit 10'
export const getCapsulessortbySizeInDesc = 'select * from capsules where user_id=$1 and capsule_size <= $2 and is_deleted=false order by capsule_size desc limit 10'
export const getcaplsulesbyDatemodified = 'select * from capsules where user_id=$1 and updated_at <= $2 and is_deleted=false order by updated_at desc limit 10'

export const incrementcapsuleCount = 'update subscription_detail set capsule_count_used = capsule_count_used + $1 where user_id=$2'

export const searchcapsulesbyName = 'select * from capsules where user_id=$1 and capsule_name ilike $2 and is_deleted=false'

// export const deleteCapsules = 'delete from capsules where user_id=$1 and capsule_id = any($2)'
export const deleteCapsules = 'update capsules set is_deleted = true where capsule_id = any($2) and user_id=$1 returning capsule_size'

export const insertfragmentfile = 'insert into fragments (capsule_id,size,tag,url,fragment_type,file_name) values ($1, $2, $3, $4,$5,$6)';
export const insertfragmenttext = 'insert into fragments (capsule_id,size,tag,fragment_type,text_content) values ($1, $2, $3, $4,$5)';
export const incrementstorageUsed = 'update subscription_detail set storage_used = storage_used + $1 where user_id=$2';
export const updatecapsule = 'update capsules set capsule_size = capsule_size + $1 , updated_at=$2 where capsule_id=$4 and user_id=$3';
export const getallFragments = 'select * from fragments where capsule_id=$1 and created_at <= $2 and is_deleted=false order by created_at desc limit 40'
export const updateTag = 'update fragments set tag = $1 , updated_at=$2 where fragment_id=$3';
export const updateText = 'update fragments set text_content = $1 , updated_at=$2 where fragment_id=$3';
export const deleteFragments = 'update fragments set is_deleted = true where fragment_id= any($1) returning size'
export const incrementdownloadCount = 'update fragments set download_count = case when download_count < (select download_per_fragment_count from subscription_type where subscription_type_id = 1) then download_count + 1 else download_count end where fragment_id = $1 returning download_count'
export const searchfragments = 'select * from fragments where capsule_id=$1 and (tag ilike $2 or file_name ilike $2 or text_content ilike $2) and is_deleted=false'
export const filterfragments = 'select * from fragments where capsule_id=$1 and created_at <= $3 and fragment_type =$2 and is_deleted=false order by created_at desc limit 40'
export const filterdocsfragments = 'select * from fragments where capsule_id=$1 and created_at <= $2 and is_deleted=false and fragment_type != $3 and fragment_type != $4 and fragment_type != $5 order by created_at desc limit 40'
export const capsuleUpdatetime = 'update capsules set updated_at=$1 where capsule_id=$2';
export const updatecapsuleSize = 'update capsules set capsule_size = capsule_size - $1 , updated_at=$2 where user_id=$3 and capsule_id=$4 returning capsule_size';
export const decrementstorageUsed = 'update subscription_detail set storage_used = storage_used - $1 where user_id=$2';
export const updatesubDetailOnDeleteCapsule = 'update subscription_detail set storage_used = storage_used - $1 , capsule_count_used = capsule_count_used - $2 where user_id=$3';
