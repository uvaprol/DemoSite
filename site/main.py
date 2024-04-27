from flask import Flask, render_template, request
from datetime import date
import pandas as pd

dev_mode = False
df = pd.read_csv('users.csv')


app = Flask(__name__)

@app.route('/')
def display_main():
    return render_template('index.html')

@app.route('/SignIn')
def regestration():
    global df
    try:
        print(df.set_index('login').loc[request.args['login']])
        reg_key = False
    except:
        reg_key = True
    if reg_key:
        user = {'login': request.args['login'],
                'password': request.args['password'],
                'shoper': []}
        df = df._append(user, ignore_index=True)
        df.to_csv('users.csv', index=False, header=True)
    else:
        return [False, 'Имя занято']
    return [True, 'Вы успешно зарегестрировались']

@app.route('/LogIn')
def login():
    global df
    try:
        if df.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            return [True, 'Вы успешно зашли в лк']
    except:
        return [False, 'Ошибка при входе']

@app.route('/addItem')
def add_to_shoper():
    global df
    try:
        if df.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            # df.set_index('login').loc[request.args['login'], ['shoper']] = [request.args['product']]
            shoper = df.set_index('login').loc['uvaprol', 'shoper']
            shoper += request.args['product']
            df = df.set_index('login')
            df.loc['uvaprol', ['shoper']] = shoper
            df.reset_index(inplace= True )
            print(df)
            return [True, 'Продукт добавлен в корзину']
    except:
        print(df)
        return [False, 'Ошибка добавления']


app.run(host='0.0.0.0', port=80)
