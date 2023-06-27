from django.http import JsonResponse
import json
class BlockMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and request.user.is_block:
            response_data['is_blocked'] = request.user.is_block

            return JsonResponse(response_data, status=403)

        response = self.get_response(request)

        if request.user.is_authenticated and 'application/json' in response.get('Content-Type', ''):
            try:
                if request.user.is_block:
                    response_data = json.loads(response.content)
                    if isinstance(response_data, dict):
                        response_data.clear()  # Remove any existing data
                        response_data['is_blocked'] = request.user.is_block
                        response = JsonResponse(response_data, status=403)
                    else:
                        return response
            except ValueError:
                pass

        return response


