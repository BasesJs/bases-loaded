const config = require('./config/config.json');
const identity = require('./identity/identity');
const apitask = require('./apitasks/apitask');
const ApiTask = require('./apitasks/apitask');

identity.connect("nps.svc", "P@ssw0rd")
    .then(token => {
        console.log(token);
        identity.getCookie()
        .then(resp => {
            //console.log(resp);
            const task = new ApiTask(identity, "API: Return Weight from Application");
            task.getTask()
            .then(resp => { 
                console.log(resp.data); 
                let item = resp.data.items.find(item => item.systemName == task.taskname);
                task.taskid = item.id;
                console.log('TASK ID: ' + task.taskid);
                reqData = {
                    "allowedInteractions": [],
                    "data": {
                        "Relation": {
                            "TaskId": "d4baebe1-a346-46d1-8bd6-92a9aeafb11c"
                        },
                        "Prop": {
                            "Weight": 5.0765
                        }
                    }
                }
                task.run(reqData)
                .then(resp => console.log(resp))
                .catch(err => console.error(err)) 
                .finally(()=>{
                    identity.disconnect()
                        .then(resp => console.log("Disconnected..."))
                        .catch(err => console.log(err));  
                })    
                    })
            .catch(err => console.error(err))             
        })
        .catch(err => console.log(err))
        .finally(()=>{
            identity.disconnect()
                .then(resp => console.log("Disconnected..."))
                .catch(err => console.log(err));  
        })      
    })
    .catch(err => console.error("err"));



