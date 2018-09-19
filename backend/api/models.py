from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class PhoneToken(models.Model):
    phone_number = models.CharField(max_length=9)
    used = models.BooleanField(default=False)
    token = models.CharField(max_length=6)
    timestamp = models.DateTimeField(auto_now_add=True, editable=False)


class PhoneNumberUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, phone_number, email,
                     password, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(
            username=username, email=email, phone_number=phone_number,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, phone_number,
                    email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, phone_number, email, password,
                                 **extra_fields)

    def create_superuser(self, username, phone_number, email, password,
                         **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, phone_number, email, password,
                                 **extra_fields)


class User(AbstractUser):
    phone_number = models.CharField(max_length=9, unique=True)
    address = models.CharField(max_length=255, null=True)

    objects = PhoneNumberUserManager()
    REQUIRED_FIELDS = ['email', 'phone_number']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self):
        return '{0.first_name} {0.last_name}'.format(self)

    def get_short_name(self):
        return '{0.phone_number}'.format(self)


class Link(models.Model):
    href = models.CharField(max_length=255, verbose_name="Link")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "Link %s" % self.href
