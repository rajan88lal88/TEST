let root = {
    data: 10,
    children: [
      {
        data: 20,
        children: [
          { data: 50, children: [] },
          {
            data: 60,
            children: []
          }
        ]
      },
      {
        data: 30,
        children: [
          { data: 70, children: [] }
          
        ]
      },
      {
        data: 40,
        children: [
          { data: 80, children: [] },
          {
            data: 90,
            children: [
            ]
          }
        ]
      }
    ]
  };

  function displaytree(root) {
    let mem = root.data + "=>";
    for (let i = 0; i < root.children.length; i++) {
      mem = mem + root.children[i].data + ",";
    }
    console.log(mem);
    for (let i = 0; i < root.children.length; i++) {
      displaytree(root.children[i]);
    }
  }
  
  displaytree(root);
  