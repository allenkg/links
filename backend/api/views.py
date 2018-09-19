import random

from django.contrib.auth import authenticate
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse

from api.filters import LinksUserFilter
from api.utils import Message, ConsoleSender
from .models import *
from .serializers import *
from rest_framework import mixins
from rest_framework import views, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


class TestView(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(data={'data': 'test'})

def user_detail(user):
    try:
        token = user.auth_token.key
    except:
        token = Token.objects.create(user=user)
        token = token.key
    user_json = {
        "id": user.pk,
        "token": token,
        "name": user.username if len(user.username) != 36 else user.phone_number
    }
    return user_json


class GenerateTokenView(views.APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('phone_number')
        if not phone_number:
            return JsonResponse('Телефон должен быть заполнен', status=400)

        phone_token = PhoneToken.objects.create(phone_number=phone_number, token=random.randrange(100000, 999999))
        message = Message(phone_token)
        message.send(ConsoleSender())
        return JsonResponse('Ok', safe=False)


class VerifyTokenView(views.APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('phone_number')
        token = request.data.get('token')

        user = authenticate(request, phone_number=phone_number, token=token)
        if user:
            response = user_detail(user)
            return JsonResponse(response, safe=False)


class LinkView(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = LinksUserFilter

