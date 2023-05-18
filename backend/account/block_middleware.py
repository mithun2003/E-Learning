from django.http import JsonResponse
import json
class BlockMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
                # Exclude admin page from middleware
        if request.path.startswith('/course/') or request.path.startswith('/user/') or request.path.startswith('/teacher/'):
            return response
        if request.user.is_authenticated:
            if 'application/json' in response.get('Content-Type', ''):
                response_data = json.loads(response.content)
                response_data['is_blocked'] = request.user.is_block
                response = JsonResponse(response_data)
        return response
