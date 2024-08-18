let lastUrl = null;
let lastResult = null;

const checkUserAccessToUrl = async (permissions, currentUrl) => {
    let access = false;
    if (permissions != null && permissions.length > 0) {
        permissions.forEach(permission => {
            if (permission.route === currentUrl) {
                access = true;
            }
        });
    }
    if (!access) {
        console.log("Permission Not granted!");
    }
    return access;
};

exports.checkAllCookies = (token, user, userName, role, userPermission) => {
    if (token == null || user == null || userName == null || role == null || userPermission == null) {
        return false; 
    }
    return true; 
};


exports.securityCheck = (token, permissions, currentUrl) => {

    if (lastUrl != null && currentUrl == lastUrl) {
        console.log("1");
        return lastResult;
    }
    
    if (token == null || permissions == null || currentUrl == null) {
        return false;
    }
    
    const check = checkUserAccessToUrl(permissions, currentUrl);

    lastUrl = currentUrl;
    lastResult = check;

    return (check);
};