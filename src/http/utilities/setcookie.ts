// export function setCookie(cookieHeader: string, reqUrl: string) {
//     let cookie = cookieHeader.split(";")[0];
//     if (global.bases.cookie === undefined) {
//         //console.log("No cookie exists, Setting cookie", cookie);
//         global.bases.cookie = cookie;
//     }
//     else if (global.bases.cookie !== cookie) {
//         console.log(` Request to ${reqUrl} has caused the Cookie to changed, Setting cookie`, cookie);
//         global.bases.cookie = cookie;
//     }   
//     else{
//        // console.log("Cookie has not changed, not setting cookie", cookie);
//     }
// }