import os
from bottle import Bottle, route, run, request, static_file

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_ROOT = os.path.join(PROJECT_ROOT, 'templates')
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')
BOWER_ROOT = os.path.join(PROJECT_ROOT, 'bower_components')

app = application = Bottle()

@app.route('/')
@app.route('/resume')
@app.route('/rwby')
def home():
	return static_file('index.html', root=TEMPLATE_ROOT, mimetype='text/html')

@app.route('/templates/<filename:re:.*\.html>')
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

@app.route('/media/<filename>')
def media(filename):
	#only in dev

	if request.query.d == 1:
		return static_file(filename, root=MEDIA_ROOT, download=filename)
	return static_file(filename, root=MEDIA_ROOT)


@app.route('/media/img/<filename:path>')
def img(filename):
	return static_file(filename, root=os.path.join(MEDIA_ROOT, 'img'))

if __name__ == '__main__':
	run(app=app, host='0.0.0.0', port=8080, reloader=True, debug=True)
