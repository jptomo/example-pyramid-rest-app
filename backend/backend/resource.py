from pyramid.exceptions import Forbidden

from cornice import Service


# easy to develop
# use dictionary on memory
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


# api declaration
cors_policy = {'enabled': True, 'origins': ('*',)}
prod_source = Service(
    name='products api',
    path='/products',
    description='get or update product data',
    cors_policy=cors_policy)


@prod_source.get()
def get_products(request):
    '''Get products data.

    If the function spcified product id, then return such product data.
    '''
    if 'id' in request.GET:
        return [PRODUCTS.get(str(request.GET['id']))]
    else:
        return sorted(list(PRODUCTS.values()), key=lambda x: x['id'])


@prod_source.put()
def upsert_products(request):
    '''Upsert product data.'''
    data = request.json
    if 'name' in data and 'price' in data:
        # compute id
        item_id = data.get('id')
        if not item_id:
            _item_ids = [int(x) for x in PRODUCTS.keys() if x.isdigit()]
            item_id = str(max(_item_ids) + 1)

        # upsert
        PRODUCTS[item_id] = {
            'id': item_id,
            'name': data['name'],
            'price': int(data['price'])}

        return {'success': True}
    else:
        raise Forbidden()
