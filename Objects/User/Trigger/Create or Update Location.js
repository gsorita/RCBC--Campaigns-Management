rbv_api.setVerbose(true);
var loc_objDefName = '$ORG_LOCN', grp_objDefName = '$GROUP';

function main () {
    var locId = rbv_api.selectNumber("SELECT id FROM $ORG_LOCN WHERE link_id = '{!name#text}'");
	rbv_api.println("Location ID: " + locId);
	var grpId = rbv_api.selectNumber("SELECT id FROM $GROUP WHERE link_id = '{!name#text}'");
	rbv_api.println("Group ID: " + grpId);
    var arr = [], groupCount = parseInt('{!USER_GROUP#id}');
	arr['link_id'] = '{!name#text}';
	arr['name'] = '{!name#text}';
	rbv_api.println("Parent Location: "+ getParentLocation("{!parent_user_link}"));
    if (locId > 0) {	//Update Record using location ID from query.
		rbv_api.updateRecord(grp_objDefName, grpId, arr);
		arr['parentId'] = getParentLocation("{!parent_user_link}");
		rbv_api.updateRecord(loc_objDefName, locId, arr);
    } else if (groupCount > 0) {	//Update Record using location ID from related group, if any.
		rbv_api.updateRecord(grp_objDefName, parseInt("{!USER_GROUP#id}"), arr);
		arr['parentId'] = getParentLocation("{!parent_user_link}");
		rbv_api.updateRecord(loc_objDefName, parseInt("{!USER_GROUP.locationId}"), arr);
	} else {
		rbv_api.createRecord(grp_objDefName, arr);
		arr['parentId'] = getParentLocation("{!parent_user_link}"); 	
		rbv_api.createRecord(loc_objDefName, arr);
	}
} 

function getParentLocation (referredTo) {
	rbv_api.println(referredTo)
	if (referredTo != "") {
		return rbv_api.selectNumber("SELECT id FROM $ORG_LOCN WHERE link_id = ?", referredTo);
	} return -1;
}

main();