class Item
    attr_accessor :val,:weight,:ratio
    def initialize(v,w)
        @val=v
        @weight=w
        @ratio=v.to_f/w
    end
    def to_s
        return"#{val.to_s} - #{weight.to_s}"
    end
    def <=> (other)
        if @ratio>other.ratio
            return -1
        elsif other.ratio>@ratio
            return 1
        else
            return 0
        end
    end
end

prices=[15,14,10,45,30]
weights=[2,5,1,3,4]
items=[]

for i in (0..prices.length-1)
    item=Item.new(prices[i],weights[i])
    items.push(item)
end
puts "sorted items"
ratio_arr=items.sort
for i in (0..prices.length-1)
    puts ratio_arr[i].val.to_s+ "  "+ ratio_arr[i].weight.to_s
end
puts
puts
rc=7
idx=0
total_profit=0
while idx<ratio_arr.length
    if ratio_arr[idx].weight<rc
        total_profit+=ratio_arr[idx].val
        rc-=ratio_arr[idx].weight
    else
        total_profit+=rc*ratio_arr[idx].ratio
        break
    end
    idx+=1;
end
print "total profit is : #{total_profit}"