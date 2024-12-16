export function setCookie(cookieHeader: string) {
    //console.log("Setting cookie: " + cookieHeader);
    let cookie = cookieHeader.split(";")[0];
    if (global.bases.cookie === undefined) {
        global.bases.cookie = cookie;
        //console.log("Cookie is undefined, setting: " + cookie)
    }
    else if (global.bases.cookie !== cookie) {
        global.bases.cookie = cookie;
        //console.warn("Cookie is different, setting: " + cookie)
    }   
}