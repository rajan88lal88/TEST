let tree = {
    data: 10,
    children:
        [{
            data: 20,
            children:
                [{
                    data: 50,
                    children: []
                },
                {
                    data: 60,
                    children: []
                }]
        },
        {
            data: 30,
            children:
                [{
                    data: 70,
                    children:
                        [{
                            data: 110,
                            children: []
                        },
                        {
                            data: 120,
                            children: []
                        }]
                },
                {
                    data: 80,
                    children: []
                }]
        },
        {
            data: 40,
            children:
                [{
                    data: 90,
                    children: []
                }]
        }]
}

function print_tree(root) {
    let output = root.data + "->";
    for (let i = 0; i < root.children.length; i++) {
        output += root.children[i].data + ",";
    }
    console.log(output);
    for (let i = 0; i < root.children.length; i++)
        print_tree(root.children[i]);
}

print_tree(tree);