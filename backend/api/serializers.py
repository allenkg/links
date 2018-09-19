from rest_framework import serializers
from rest_framework.fields import HiddenField
from .models import *


class LinkSerializer(serializers.ModelSerializer):
    current_user = HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Link
        fields = ('id', 'href', 'current_user', 'user')

    def create(self, validated_data, **kwargs):
        link = Link()
        link.href = validated_data['href']
        link.user = self.get_user(validated_data['current_user'])
        link.save()
        return link

    def get_user(self, user):
        return User.objects.get(id=user.id)
