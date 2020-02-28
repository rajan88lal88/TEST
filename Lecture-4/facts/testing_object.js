let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");

let tree={};

untree("C:\\Users\\rajan\\OneDrive\\College\\TPP\\Lecture-4\\src","C:\\Users\\rajan\\OneDrive\\College\\TPP\\Lecture-4\\dest",tree);

function untree(src, dest,Node) {
    let ans = fs.lstatSync(src).isDirectory();
    if (ans == false) {
        let uname = uniqid();
        
        fs.copyFileSync(src, path.join(dest, uname + "-" + path.basename(src)));
        Node.data=path.basename(src);
        Node.isfile=true;
        Node.newName=uname+"-"+path.basename(src);

        
    }
    else {
        Node.data=path.basename(src);
        Node.isfile=false;
        Node.newName=Node.data;
        Node.children=[];
        let children = fs.readdirSync(src);
        for (let i = 0; i < children.length; i++) {
            // console.log(Node);
            Node.children[i]={};
            untree(path.join(src, children[i]),dest,Node.children[i]);
            // console.log(Node.children);
            
        }
        
    }
    
}


// // console.log(tree.children[2].children[1]);

// function print_tree(tree) {
//     let output = tree.data + "->";
//     for (let i = 0; i < tree.children.length; i++) {
//         // output += tree.children[i].data + ",";
        
//     }
//     console.log(output);
//     for (let i = 0; i < tree.children.length; i++)
//         print_tree(tree.children[i]);
// }

// print_tree(tree);
// console.log(tree);

function print_tree(tree) {
    let output = tree.data + "->";
    for (let i = 0; i < tree.children.length; i++) {
        output += tree.children[i].data + ",";
    }
    console.log(output);
    for (let i = 0; i < tree.children.length; i++)
        print_tree(tree.children[i]);
}

print_tree(tree);