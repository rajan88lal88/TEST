function promiseCreator()
{
    return new Promise(function abc(resolve,reject)
    {
        setTimeout(function()
        {
            resolve("resolved value of promise");
        },1000)
    })
}