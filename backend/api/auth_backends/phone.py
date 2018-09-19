import uuid

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

from api.models import PhoneToken


def model_field_attr(model, model_field, attr):
    fields = dict([(field.name, field) for field in model._meta.fields])
    return getattr(fields[model_field], attr)


class PhoneBackend(ModelBackend):
    def __init__(self):
        self.user_model = get_user_model()

    def get_username(self):
        return str(uuid.uuid4())[:model_field_attr(
            self.user_model, 'username', 'max_length')
               ]

    def create_user(self, phone_token, **extra_fields):
        password = self.user_model.objects.make_random_password()
        if extra_fields.get('username'):
            username = extra_fields.get('username')
        else:
            username = self.get_username()
        if extra_fields.get('password'):
            password = extra_fields.get('password')
        else:
            password = password
        phone_number = phone_token.phone_number
        user = self.user_model.objects.create_user(
            username=username,
            password=password,
            phone_number=phone_number
        )
        return user

    def authenticate(self, request, phone_number=None, token=None, **extra_fields):
        phone_token = PhoneToken.objects.get(
            phone_number=phone_number,
            token=token,
            used=False
        )
        user = self.user_model.objects.filter(phone_number=phone_token.phone_number).first()

        if not user:
            user = self.create_user(phone_token=phone_token, **extra_fields)
        phone_token.used = True
        phone_token.save()
        return user
