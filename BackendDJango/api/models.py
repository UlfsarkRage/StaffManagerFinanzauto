from django.db import models
import uuid

def object_id():
    return uuid.uuid4().hex[:24]  # Genera 24 caracteres hexadecimales como Mongo

class User(models.Model):
    TITLE_CHOICES = (
        ('Mr', 'Mr'),
        ('Ms', 'Ms'),
        ('Mrs', 'Mrs'),
        ('Miss', 'Miss'),
        ('Dr', 'Dr'),
        ('', ''),
    )

    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
        ('', ''),
    )

    id = models.CharField(primary_key=True, max_length=24, default=object_id, editable=False)
    title = models.CharField(max_length=10, choices=TITLE_CHOICES)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    dateOfBirth = models.DateTimeField()
    phone = models.CharField(max_length=50)
    picture = models.URLField(blank=True, null=True)
    document = models.CharField(blank=True, null=True)
    location = models.JSONField(default=dict, blank=True, null=True)
    registerDate = models.DateTimeField(auto_now_add=True)
    updatedDate = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.firstName} {self.lastName}'