export const useridAbsent = 'User id is not persent ! Please login again'
export const absentdeleteCapsuleIds = 'Capsule id is necssary to delete any capsule !'
export const absentFeedbackField = 'You have to fill min one field !'
export const absentdeleteFragmentsIds = 'Fragment id is necssary to delete any fragment !'
export const tokenAbsent = 'Please login again !'
export const googletokenAbsent = 'Google acess token is not persent !'
export const invalidEmail = 'Email is not valid !'
export const serverError = 'Something went wrong'
export const loginError = 'Something went wrong while login'
export const successfullylogin = 'Sucessfull login'
export const dberror = 'Error in db connection'
export const verifygoogletokenError = 'Error in verifying google token'
export const invalidtoken = 'Session has expired ! please login'
export const capsulenameerror = 'Capsule name is not persent or capule name less then 2 words'
export const capsuleiderror = 'Capsule id is not persent'
export const capsulelimitAlert = 'Your capsule limit has been reached'
export const storagelimitAlert = 'Your storage limit has been reached'
export const capsuleCreatedError = 'Error occur while creating capsule'
export const fragmentfilecreatedError = 'Error occur while creating fragment file'
export const fragmenttextcreatedError = 'Error occur while creating fragment text'
export const downloadfileError = 'Error occur while download fragment file'
export const getfragmentsError = 'Error occur while getting fragments'
export const fragmenttagcreatedError = 'Error occur while creating fragment tag'
export const textupdatedError = 'Error occur while updateing text'
export const uploadpresignedurlError = 'Error occur while creating upload presigned url'
export const success = ''
export const downloadSuccess = 'Downloaded'
export const deletedResource = 'Deleted'
export const updateMessage = 'Updated !'
export const capsuleeditError = 'Error in editing capsule in db'
export const UserNameError = 'Error in getting user name'
export const capsuledatemodifiedError = 'Error in get capsule by date modified in db'
export const capsulesortbydatecreatedError = 'Error in get capsule by date created in db'
export const capsulesortbysizeError = 'Error in get capsule by size in db'
export const capsulesearchError = 'Error in get capsule by search in db'
export const fragmentssearchError = 'Error in fragments search in db'
export const fragmentsfilterError = 'Error in fragments filter in db'
export const fragmentsdocsfilterError = 'Error in fragments docs filter in db'
export const fragmentdeleteError = 'Error in delete fragment in db'
export const capsuledeleteError = 'Error in delete capsule in db'
export const dateError = 'Date is neccassary for get capsules'
export const orderMissing = 'order is missing , it is necessary get capsules'
export const capsulessizeError = 'size is missing , it is necessary get capsules'
export const capsuleCreated = 'New capsule created !'
export const fragmentCreated = 'New fragment created !'
export const capsulenameUpdated = 'Capsule name updated !'
export const datanotFound = 'Not Found'
export const allDataFetched = 'All data fetched !'
export const capsulesdataError = 'Error occur while getting capsules'
export const searchvalueError = 'Search value absent'
export const fragmenttypeAbsent = 'Fragment type value absent'
export const tagcharError = 'tag char exceed'
export const filenameError = 'File name should be more then 2 char'
export const bucketName = 'files.saveit.tech'
export const missingkey = 'missing key'
export const logoutSucessfully = 'Logout !'
export const logoutError = 'Something went wrong while logout !'
export const feedbackError = 'Something went wrong while giveing feedback !'
export const downloadlimitExceed = 'download limit exceed'
export const feedbackMessage = 'Thank you for your feedback !'
export const s3Url = 'https://files.saveit.tech'
export const capsuleNameCharLimit = 30
export const capsuleNameCharLimitError = 'Capsule name should be less then 30 char'
export const fragmentDeleteLimit = 40
export const capsuleDeleteLimit = 20
export const fragmentdeletelimitError = `Only ${fragmentDeleteLimit} fragment can be deleted at one time `
export const capsuledeletelimitError = `Only ${capsuleDeleteLimit} capsule can be deleted at one time `
export const feedbackCharLimit = 500
export const feedbackCharLimitError = 'Max 500 char in each field'
export const tokenAge = 7776000000 //in milisecond //// 3600 * 24 * 90 - 3 month expiration time
// export const maxStorage = 10000 //this is max. storage any user can have even permium user -10gb
export const uploadLimit = 50 //in mb
export const freememberDownloadcount = 10 //free member download count

export const maxbatchUpload = 10 //max batch upload
export const filecountError = `${maxbatchUpload} files can be uploaded at one time`
export const filesizeError = `Upload size should be less then ${uploadLimit} mb`
export const filenamecharLimit = 2
export const presignedurlExpire = 60 * 10
export const textcharLimit = 10000; //10k char
export const textcharlimitExceed =`10k char limit exceed`

export const tagcharLimit = 100;
// export const compresstype = 'zip'
export const badRequest = 400;
export const successful = 200;
export const internalserverError = 500;
export const unauthorized = 401;
export const resourceCreated = 201
export const resourceUpdated = 204
export const limitReached = 403
export const notFound = 404
