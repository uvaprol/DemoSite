from flask import Flask, render_template, request
from datetime import date
import pandas as pd

dev_mode = False
USERS_DB = pd.read_csv('users.csv')
ORDERING_DB = pd.read_csv('ordering.csv')
PRODUCTS_DB = pd.read_csv('products.csv')
ADMIN_LOGIN = 'admin'
ADMIN_PASSWORD = 'admin'

app = Flask(__name__)


@app.route('/')
def display_main():
    return render_template('index.html')
@app.route('/shopingCart')
def display_shopingCart():
    return render_template('shopingCart.html')
@app.route('/admin')
def display_adminPanel():
    return render_template('admin.html')


@app.route('/SignIn')
def regestration():
    global USERS_DB
    try:
        print(USERS_DB.set_index('login').loc[request.args['login']])
    except:
        user = {'login': request.args['login'],
                'password': request.args['password'],
                'shoper': '_'}
        USERS_DB = USERS_DB._append(user, ignore_index=True)
        USERS_DB.to_csv('users.csv', index=False, header=True)
        return 'true'
    return 'false'

@app.route('/LogIn')
def login():
    global USERS_DB
    try:
        if USERS_DB.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            return 'true'
    except:
        pass
    return 'false'

@app.route('/addItem')
def add_to_shoper():
    global USERS_DB
    try:
        if USERS_DB.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            USERS_DB = USERS_DB.set_index('login')
            shoper = USERS_DB.loc[request.args['login'], 'shoper']
            shoper += '|' + request.args['product']
            USERS_DB.loc[request.args['login'], ['shoper']] = shoper
            USERS_DB.reset_index(inplace= True )
            USERS_DB.to_csv('users.csv', index=False, header=True)
            return 'true'
    except:
        return 'false'

@app.route('/get_products')
def post_catalog_cards():
    return [[item for item in row] for index, row in pd.read_csv('products.csv').reset_index().iterrows()]

@app.route('/get_shoper')
def post_user_shoper():
    global USERS_DB
    USERS_DB = USERS_DB.set_index('login')
    shoper = USERS_DB.loc['uvaprol', 'shoper']
    shoper = shoper.split('|')
    shoper.remove('_')
    return shoper

@app.route('/add_order')
def add_order():
    global ORDERING_DB
    orders = request.args['order'].split('|')
    orders.remove('_')
    print(orders)
    for order in orders:
        new_order = {
            'status': True,
            'order' : order,
            'date'  : date.today()
        }
        ORDERING_DB = ORDERING_DB._append(new_order, ignore_index=True)
    ORDERING_DB.to_csv('ordering.csv', index=False, header=True)
    return 'true'

@app.route('/get_orders')
def post_orders():
    print([[item for item in row] for index, row in pd.read_csv('ordering.csv').reset_index().iterrows()])
    return [[item for item in row] for index, row in pd.read_csv('ordering.csv').reset_index().iterrows()]

@app.route('/add_card')
def update_products():
    if request.args['admin_login'] == ADMIN_LOGIN and request.args['admin_password'] == ADMIN_PASSWORD:
        global PRODUCTS_DB
        new_card = {
            'name'             : request.args['name'],
            'cost'             : request.args['cost'],
            'short-description': request.args['short-description'],
            'long-description' : request.args['long-description'],
            'img-src'          : request.args['img-src']
        }
        PRODUCTS_DB = PRODUCTS_DB._append(new_card, ignore_index=True)
        PRODUCTS_DB.to_csv('products.csv', index=False, header=True)
        return 'true'
    return 'false'

@app.route('/AdminLogin')
def check_admin_login():
    if request.args['admin_login'] == ADMIN_LOGIN and request.args['admin_password'] == ADMIN_PASSWORD:
        return 'true'
    return 'false'


app.run(host='0.0.0.0', port=80, debug=dev_mode)
