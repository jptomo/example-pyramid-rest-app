from wsgiref.simple_server import make_server
from pyramid.config import Configurator


if __name__ == '__main__':
    config = Configurator()
    config.include('cornice')
    config.scan('views')
    app = config.make_wsgi_app()

    (make_server('0.0.0.0', 8080, app)
     .serve_forever())
