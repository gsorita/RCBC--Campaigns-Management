var loc_objDefName = '$ORG_LOCN', grp_objDefName = '$GROUP', user_objDefName = 'USER';
function main() {
	var locationId = rbv_api.selectNumber("SELECT id FROM $ORG_LOCN WHERE link_id = ?", '{!name#text}');
	var grpId = rbv_api.selectNumber("SELECT id FROM $GROUP WHERE link_id = ?", '{!name#text}');
	var userId = parseInt("{!id}");
	
	// rbv_api.setFieldValue(user_objDefName, userId, 'locationId', locationId);
	rbv_api.setFieldValue(user_objDefName, userId, 'USER_GROUP', grpId);
	rbv_api.setFieldValue(grp_objDefName, grpId, 'locationId', locationId);
} main();