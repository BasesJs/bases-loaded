export function splitfile(file: any, numberOfParts: number, partSize: number) {
    console.log({
        fileSize: file.byteLength,
        partSize: partSize,
        numberOfParts: numberOfParts
    })
    let parts = [];
    let start = 0;
    let remainder = file.byteLength;
    let runSize = partSize;
    for (let i = 0; i < numberOfParts; i++) {
        if (runSize > remainder) {
            runSize = remainder;
        }
        let partEnd = start + runSize;
        let partBytes = file.slice(start, partEnd);
        let partNum = i + 1;
        let part = {
            partNum: partNum,
            partSize: runSize,
            bytes: partBytes
        }
        parts.push(part);
        start = partEnd;
        remainder = remainder - runSize;
    }
    console.log(`Returning ${parts.length} parts`);
    return parts;
}