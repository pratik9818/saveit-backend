api (non-sequence) and their logic


post api /sign in via google auth. - lb -- done
		
post /create folder - lb -----------------------------done
		1. user send req to create capsule whith body - name
		2. accept the req in server
		3. get toke and validate it and extract userid
		4. 1st check count capsule in sub. detail table and get account limit from another table
		5. if valid ,cerate new capsule
		6. if not , send res to clined ur capsule limit reach
****
put / folder name -------------------------------------done

get /get folder (by default some folder in first render by last modified)----------done
get /get folder (only some folder in first render) --------------------------------done
get /filter via date of create(only some folder in first render) ------------------done
get /filter via size(only some folder in first render) ----------------------------done
delete / **batch** or single delete (set max limit and proper error hanlding neccasy)
	**when deleting folder it means deleteing lots of fragment in one fragment cause load on db one alternative is just mark as delete and run cron in night or whatever to cleanup things**

get / folder search by name -lb


post / upload media -lb (topic to consider , round trip of database , server, s3 server AND compress files or zip AND limit in size  sending one file , type of files like video , pdf , docs , photo etc AND proper updating sub-details of user and capsule size column in capsule table AND batch uploading and yet to **come** ) ----------------------DONE

post /upload note -lb
post /link (need to search about do I can crate different post or I can make these in one api) -lb
put /note -lb
put /set tag
put /set reminder -lb
get /get file 
get /search -lb
get /filter by vide ,image etc ---
get /download -lb
delete / batch or single delete
logout api . /logout

get /get all reminder
get /get coming reminder
get / get expiry reminder
delete / delete batch and detele single




post /logout
******1. get only that data which is not markerd as delete -- done
    1. update at column must update when fragment insert and update -- done
    2. when something delete capsule or fragment , need to also upate storeage , foldercount. -- done
    3. textcontent length check in controller instead of this , char limmit nned to check in db
    4. need to think about delete , should i do real delete or fake - done
    5.  impelmet connection pooling -- done
    6.  making script deleting the fragment , capsules and objects.-------------done
    7.  read access need to impelmet
    8.  need to rewrite error handling in modal layer
**INDEXING**-------------------------------**imp** ------------done
**MULTIPLE DB CONNECTION** ------------------------------------done
**DELETING THE CHILD ROW IF PARENT ROW DELETED** ---**IMP**----done
**deletin objects in s3 on delete fragments/capsule** --------done
**use docker for contairize node app and cicd**
**learn and implent nginx for api limit ,cahcing etc**



<!-- /////////////////////////////////////////////////////////////////////////////////////////////////---------------------------------------- -->
<!-- 1. update sub detail - storage used , capsule size , reminder count , downloadcount -->