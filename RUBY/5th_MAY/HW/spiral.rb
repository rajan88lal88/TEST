m=ARGV[0].to_i
n=ARGV[1].to_i
ARGV.clear()
arr=[]
for i in 0..m-1
    row=[]
    for j in 0..n-1
        val=gets.chomp.to_i
        row.push(val)
    end
    arr.push(row)
end

total=m*n
flag=0
p=0
while(p<total)
    # left
    for i in flag..(m-1-flag-1)
        print arr[i][flag].to_s+" "
        p+=1
    end
    # puts "left"
    # down
    # for (i=flag+1;i<n-1-flag-1;i+=1)
    for i in (flag)..(n-1-flag-1)
        print arr[(m-1-flag)][i].to_s+" "
        p+=1
    end
    # puts "down"
    # right
    # for(i=m-flag-1;i>=flag;i+=1)
    for i in (m-flag-1).downto(flag+1)
        print arr[i][n-flag-1].to_s+" "
        p+=1
    end 
    # puts "right"
    # top
    # for(i=n-flag;i>=flag;i+=1)
    for i in (n-flag-1).downto(flag+1)
        print arr[flag][i].to_s+" "
        p+=1
    end
    # puts "top"
    flag+=1;
end