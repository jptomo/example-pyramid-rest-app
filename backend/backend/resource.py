from pyramid.exceptions import Forbidden

from cornice import Service


PRODUCTS = {
    '1': {
        'id': '1',
        'name': 'some',
        'price': 300},
    '2': {
        'id': '2',
        'name': 'somesome',
        'price': 320},
    '3': {
        'id': '3',
        'name': 'bar',
        'price': 501},
}


cors_policy = {'enabled': True, 'origins': ('*',)}
prod_source = Service(
    name='data_source',
    path='/products',
    description='some',
    cors_policy=cors_policy)


@prod_source.get()
def get_products(request):
    if 'id' in request.GET:
        return [PRODUCTS.get(str(request.GET['id']))]
    else:
        return list(PRODUCTS.values())


@prod_source.post()
def set_products(request):
    data = request.POST
    if all(x in data for x in ['id', 'name', 'price']):
        item_id = str(data['id'])
        PRODUCTS[item_id] = {'id': item_id, 'name': data['name'], 'price': int(data['price'])}
        return {'success': True}
    elif all(x in data for x in ['name', 'price']):
        item_id = str(PRODUCTS.keys() + 1)
        PRODUCTS[item_id] = {'id': item_id, 'name': data['name'], 'price': int(data['price'])}
        return {'success': True}
    else:
        raise Forbidden()
