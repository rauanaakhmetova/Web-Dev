x = input()
reversed_x = ""

for i in range(len(x) - 1, -1, -1):
    reversed_x += x[i]

print(int(reversed_x))
