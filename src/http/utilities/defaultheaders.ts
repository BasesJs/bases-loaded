export function DefaultHeaders() {    
    return {        
        'Accept': '*/*',
        'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`,
        'Cookie': global.bases.cookie ?? ''
    }
}