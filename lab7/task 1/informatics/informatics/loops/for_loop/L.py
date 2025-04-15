a = str(input())
a = a[::-1]
sum = 0
t = 0 ;  
for i in a :
    sum += int(i) * pow(2 , t)
    t+=1 

print(sum)    