from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('estimate.html')

@app.route('/get_input', methods=['POST'])
def get_input():
    starting_address = request.form['starting_address']
    destination_address = request.form['destination_address']
    budget = request.form['budget']
    
    print(starting_address, destination_address, budget)

    return '''
<html>
    <head>
        <title>Templating</title>
    </head>
    <body>
        <h1>Hello, ''' + budget + '''!, you’re ''' + destination_address + ''' years old.</h1>
    </body>
</html>'''

# MAIN BELOW RUNS APP
if __name__ == '__main__':
   app.run(debug = True, port=8080)
