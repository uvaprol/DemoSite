import pandas as pd

# df = pd.DataFrame(columns=[
#     'login',
#     'password',
#     'shoper'])
# user = {'login': 'uvaprol', 'password': 'uvaprol', 'shoper': []}
# df = df._append(user, ignore_index=True)
#
# df.to_csv('users.csv', index=False, header=True)

df = pd.read_csv('users.csv')
try:
    df.set_index('login').loc['uvapro']
    print(False)
except:
    pass
if df.set_index('login').at['uvaprol', 'password'] == 'uvaprol':
    print(True)
