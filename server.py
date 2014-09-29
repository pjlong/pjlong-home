import os
from bottle import Bottle, route, run, static_file

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_ROOT = os.path.join(PROJECT_ROOT, 'templates')
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
BOWER_ROOT = os.path.join(PROJECT_ROOT, 'bower_components')

app = application = Bottle()

@app.route('/')
def home():
	return static_file('index.html', root=TEMPLATE_ROOT, mimetype='text/html')

@app.route('/<filename:re:.*\.html>')
def template(filename):
	return static_file(filename, root=TEMPLATE_ROOT)

@app.route('/bower_components/<filename:path>')
def bower_components(filename):
	#used in dev
	return static_file(filename, root=BOWER_ROOT)

@app.route('/static/<filename:path:re:^(*.css|*.js)$>')
def static(filename):
	#only in dev
	return static_file(filename, root=STATIC_ROOT)

if __name__ == '__main__':
	run(app=app, host='0.0.0.0', port=8080)
