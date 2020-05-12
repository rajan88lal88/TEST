class Node
    attr_accessor :left,:right,:data
    def initialize(d,l,r)
        @data=d
        @left=l
        @right=r
    end
    def show_node
        print @data
    end
    def get_left
        return @left
    end
    def get_right
        return @right
    end
end
def tree_print(root)
    if root==nil
        return
    end
    tree_print(root.get_left)
    root.show_node
    puts
    tree_print(root.get_right)
end
ll=Node.new(5,nil,nil)
l=Node.new(10,ll,nil);
r=Node.new(30,nil,nil);
root=Node.new(20,l,r);
tree_print(root)

