api (non-sequence) and their logic


post api /sign in via google auth. - lb -- done
		
post /create folder - lb -----------------------------done
		1. user send req to create capsule whith body - name
		2. accept the req in server
		3. get toke and validate it and extract userid
		4. 1st check count capsule in sub. detail table and get account limit from another table
		5. if valid ,cerate new capsule
		6. if not , send res to clined ur capsule limit reach

put / folder name -------------------------------------done

get /get folder (only some folder in first render) --------------------------------almost done
get /filter via date of create(only some folder in first render)
get /filter via size(only some folder in first render)
delete / **batch** or single delete (set max limit and proper error hanlding neccasy)
get / folder search by name -lb


get /get file 
get /search
get /filter by vide ,image etc
get /download -lb
post /upload note -lb
post / upload media -lb
post /link (need to search about do I can crate different post or I can make these in one api) -lb
put /set tag
delete / batch or single delete
put /note -lb
put /set reminder -lb

get /get all reminder
get /get coming reminder
get / get expiry reminder
delete / delete batch and detele single




post /logout