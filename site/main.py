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
        print(request.args['password'])
        if df.set_index('login').at[request.args['login'], 'password'] == request.args['password']:
            return [True, 'Вы успешно зашли в лк']
    except:
        return [False, 'Ошибка при входе']

app.run(host='0.0.0.0', port=80)