S = 109
v = int(input())
t = int(input())

s = v * t
point = s % 109

if(point < 0):
    point = 109 - point


print(point)