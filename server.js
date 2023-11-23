const basesloaded = require('./bases');

LoadBases()
    .then(bases => {
        console.log("Bases Loaded");
    })
    .then(()=>{
        bases.core.autofillkeysets.get()
        .then(items => {
            console.log(items);
        })
    })

async function LoadBases(){
    console.log("Loading basesjs...");
    const bases = new basesloaded();
    let success = await bases.connect("Template.Service", "ENR4RjYZr2jZH48VxW2V28Zqz");
    return bases;
}