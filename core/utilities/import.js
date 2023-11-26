function importdoc(){
    var dochandle;
    let input = $('#import');
    var file = input[0].files[0];
    let ext = file.name.substring(file.name.length -3);
    let size = file.size;
    fileInfo.size = size;
    let json = {
        fileExtension: ext,
        fileSize: size
    }
    auth.stagedoc(json) //First Call
    .then(resp => {
        docinfo.uploads[0].id = resp.id;
        //Set our variables to make calculations
        let start = 0;
        let remainder = file.size;
        let partSize = resp.filePartSize;
        let numOfParts = resp.numberOfParts;        
        //Loop through Number of Parts
        for(let i = 0; i < numOfParts; i++)
        {
            //Check to make sure the part size is not greater than the remaining bytes
            if(partSize > remainder)
                partSize = remainder;
            //Calculate where this part ends in the bynary data
            let partEnd = start+partSize;
            //Slice out the part of the file/blob we need
            let part = file.slice(start, partEnd);
            //Set the part number for our request
            let partNum = i+1;
            auth.sendbytes(part, resp.id, partNum)
            .then(resp => {
                if(resp.status == 204)
                {
                    //Set our new starting position
                    start = partEnd; 
                    //Subtract the part we sent from the remainder
                    remainder = remainder - partSize;
                }
            }) 
            .catch(err => console.log(err));              
        }        
        //Get Keyword GUID and finishing requests to send metadata
        auth.getkeywordguid(docinfo.documentTypeId) //Third Call
        .then(resp => {
            docinfo.keywordCollection.keywordGuid = resp.keywordGuid;  
            console.log(docinfo);
            auth.senddata(docinfo) //Fourth Call
            .then(resp => {
                dochandle = resp.id;
                $('#dochandle').val(dochandle);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
