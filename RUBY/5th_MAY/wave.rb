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

for i in (0..n-1)
    if i%2==0
        for j in 0..n-1
            print arr[j][i].to_s+"\t"
        end
        puts
    else
        for j in (arr.length-1).downto(0)
            print arr[j][i].to_s+"\t"
        end
        puts
    end
end

