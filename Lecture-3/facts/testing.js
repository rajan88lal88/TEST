
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

let directoryPath = "C:\\Users\\rajan\\OneDrive\\College\\TPP\\Lecture-3\\src";
function showfile(file,directoryPath) {
    
    console.log(file); 
     
        
}
function readdirectory(err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(showfile);

}
fs.readdir(directoryPath, readdirectory);



// var fs = require('fs');
// var path = require('path');
// let dir = "C:\\Users\\rajan\\OneDrive\\College\\TPP\\Lecture-3\\src";
// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var pending = list.length;
//     if (!pending) return done(null, results);
//     list.forEach(function(file) {
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             if (!--pending) done(null, results);
//           });
//         } else {
//           results.push(file);
//           if (!--pending) done(null, results);
//         }
//       });
//     });
//   });
// };