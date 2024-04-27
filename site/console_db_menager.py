import pandas as pd
# df = pd.DataFrame(columns=[
#     'login',
#     'password',
#     'shoper'])
# user = {'login': 'uvaprol', 'password': 'uvaprol', 'shoper': ' '}
# df = df._append(user, ignore_index=True)
#
# df.to_csv('users.csv', index=False, header=True)

# df = pd.DataFrame(columns=[
#     'name',
#     'cost',
#     'short-description',
#     'long-description
# ])
# products = {'name': 'keyboard', 'cost': '2500', 'short-description': 'the gaming keyboard', 'long-description': 'mne len mnogo pisat'}
# df = df._append(user, ignore_index=True)

# df.to_csv('users.csv', index=False, header=True)

df = pd.read_csv('users.csv')
a = df.set_index('login').loc['uvaprol', 'shoper']
a += 'a'
df = df.set_index('login')
df.loc['uvaprol', ['shoper']] = 'a'
df.reset_index(inplace= True )
print()
print(df)
