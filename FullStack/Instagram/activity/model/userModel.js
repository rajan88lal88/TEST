const db=require("./connection");
const { v4: uuidv4 } = require('uuid');

const create=function(userobj){
    userobj.uid=uuidv4();
    
    return new Promise(function(res,rej){
        db.query('INSERT INTO user SET ?',userobj,function(err,resolve){
            if(err){
                rej(err);
            }
            else{
                res(userobj);
            }
        });
    })
}
const getById=function( uid ){
    return new Promise(function(res,rej){
        db.query(`SELECT * FROM user where uid="${uid}";`,function(err,result){
            if(err)
             rej(err)
            else
            {
                res(result[0])
            
            }    

        })
    })
}
const getAllUsers=function( ){
    return new Promise(function(res,rej){
        db.query(`SELECT * FROM user ;`,function(err,result){
            if(err)
             rej(err)
            else
            {
                res(result)
            
            }    

        })
    })
}
const updateById=function(uid,data){
    
        let queryStr="";
        for(key in data){
            queryStr+=`${key} = ${data[key]} , `;
        }
        queryStr=queryStr.substring(0,queryStr.length-2);
        var query=`UPDATE user SET ${queryStr} WHERE uid="${uid}"`;
        console.log(query);
        return new Promise(function(res,rej){
            db.query(query,function(err,result){
                if(err)
                 rej(err)
                else
                {
                    res(result)
                }    
    
            })
        })
        
    

}
const deleteById=function(uid){
    return new Promise(function(res,rej){
        let query= `DELETE FROM user WHERE uid="${uid}"`;
        console.log(query);
        db.query(query,function(err,resolve){
            
            if(err){
                rej(err);
            }
            else{
                res(resolve);
            }
        });
    })
}
module.exports.create=create;
module.exports.getById=getById;
module.exports.getAllUsers=getAllUsers;
module.exports.updateById=updateById;
module.exports.deleteById=deleteById;