var opn = require('opn');
const {exec}=require("child_process");
function takerequest(data,success,failure)
{
    if(data%2==0)
    { 
        success();
    }
    else
    {
        failure();
    }

}

function success()
{
    console.log("Successful");
    exec("calc");
}
function failure()
{
    console.log("Failure");
    exec("start chrome https://www.google.com");
}
takerequest(11,success,failure);