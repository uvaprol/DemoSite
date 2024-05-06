from flask import Flask, render_template, request
from datetime import date
import pandas as pd

dev_mode = False
users_db = pd.read_csv('users.csv')
ordering_db = pd.read_csv('ordering.csv')

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
    global users_db
    try:
        print(users_db.set_index('login').loc[request.args['login']])
    except:
        user = {'login': request.args['login'],
                'password': request.args['password'],
                'shoper': '_'}
        users_db = users_db._append(user, ignore_index=True)
        users_db.to_csv('users.csv', index=False, header=True)
        return 'true'
    return 'false'


@app.route('/LogIn')
def login():
    global users_db
    try:
        if users_db.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            return 'true'
    except:
        pass
    return 'false'

@app.route('/addItem')
def add_to_shoper():
    global users_db
    try:
        if users_db.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            users_db = users_db.set_index('login')
            shoper = users_db.loc[request.args['login'], 'shoper']
            shoper += '|' + request.args['product']
            users_db.loc[request.args['login'], ['shoper']] = shoper
            users_db.reset_index(inplace= True )
            users_db.to_csv('users.csv', index=False, header=True)
            return 'true'
    except:
        return 'false'

@app.route('/get_products')
def post_catalog_cards():
    return [[item for item in row] for index, row in pd.read_csv('products.csv').reset_index().iterrows()]

@app.route('/get_shoper')
def post_user_shoper():
    global users_db
    users_db = users_db.set_index('login')
    shoper = users_db.loc['uvaprol', 'shoper']
    shoper = shoper.split('|')
    shoper.remove('_')
    return shoper

@app.route('/add_order')
def add_order():
    global ordering_db
    orders = request.args['order'].split('|')
    orders.remove('_')
    print(orders)
    for order in orders:
        new_order = {
            'status': True,
            'order' : order,
            'date'  : date.today()
        }
        ordering_db = ordering_db._append(new_order, ignore_index=True)
    ordering_db.to_csv('ordering.csv', index=False, header=True)
    return 'true'

@app.route('/get_orders')
def post_orders():
    return [[item for item in row] for index, row in pd.read_csv('ordering.csv').reset_index().iterrows()]


app.run(host='0.0.0.0', port=80, debug=dev_mode)
