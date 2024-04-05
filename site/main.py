from flask import Flask, render_template, request
from datetime import date
import pandas as pd

dev_mode = False



app = Flask(__name__)

@app.route('/')
def display_main():
    return render_template('index.html')



app.run(host='0.0.0.0', port=80)