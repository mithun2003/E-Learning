# import os
# import django
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.core.asgi import get_asgi_application
# # from channels.auth import AuthMiddlewareStack
# from chat.routing import websocket_urlpatterns
# from static_ranges import Ranges

# from dj_static import Cling,MediaCling
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# django.setup()

# application = ProtocolTypeRouter({
#     'http': Cling(MediaCling(get_asgi_application()),0),
#     "websocket": 
#         URLRouter(
#             websocket_urlpatterns
#         )
# })

# # application = Cling(MediaCling(lambda: get_asgi_application()))
import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from chat.routing import websocket_urlpatterns
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': URLRouter(websocket_urlpatterns),
})
