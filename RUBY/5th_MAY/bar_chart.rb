arr=[2,5,3,7,5,8]
max=arr.max();

for i in (max).downto(1)
    for j in (0..arr.length-1)
        if(i>arr[j])
            print " \t"
        else
            print "*\t"
        end
    end
    puts
end 