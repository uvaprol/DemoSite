from flask import Flask, render_template, request
from datetime import date
import pandas as pd

dev_mode = False
users_db = pd.read_csv('users.csv')
# products_db = pd.read_csv('products.csv')

app = Flask(__name__)

@app.route('/')
def display_main():
    return render_template('index.html')
@app.route('/shopingCart')
def display_shopingCart():
    return render_template('shopingCart.html')

@app.route('/SignIn')
def regestration():
    global users_db
    try:
        print(users_db.set_index('login').loc[request.args['login']])
        reg_key = False
    except:
        reg_key = True
    if reg_key:
        user = {'login': request.args['login'],
                'password': request.args['password'],
                'shoper': '_'}
        users_db = users_db._append(user, ignore_index=True)
        users_db.to_csv('users.csv', index=False, header=True)
    else:
        return [False, 'Имя занято']
    return [True, 'Вы успешно зарегестрировались']

@app.route('/LogIn')
def login():
    global users_db
    try:
        if users_db.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            return [True, 'Вы успешно зашли в лк']
    except:
        return [False, 'Ошибка при входе']

@app.route('/addItem')
def add_to_shoper():
    global users_db
    try:
        if users_db.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            users_db = users_db.set_index('login')
            shoper = users_db.loc['uvaprol', 'shoper']
            shoper += '|' + request.args['product']
            users_db.loc['uvaprol', ['shoper']] = shoper
            users_db.reset_index(inplace= True )
            users_db.to_csv('users.csv', index=False, header=True)
            return [True, 'Продукт добавлен в корзину']
    except:
        return [False, 'Ошибка добавления']

@app.route('/get_prosucts')
def post_catalog_cards():
    return [[item for item in row] for index, row in pd.read_csv('products.csv').reset_index().iterrows()]


app.run(host='0.0.0.0', port=80)
