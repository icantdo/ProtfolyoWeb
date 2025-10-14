from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Load portfolio data from config file
def load_config():
    with open('config.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def home():
    config = load_config()
    return render_template('index.html', **config)

@app.route('/config.json')
def get_config():
    config = load_config()
    return jsonify(config)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
