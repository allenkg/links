from django_filters.filters import CharFilter, NumberFilter
from django_filters.rest_framework import FilterSet
from .models import *


class LinksUserFilter(FilterSet):
    user_id = NumberFilter('user')

    class Meta:
        model = Link
        fields = ['user_id']
