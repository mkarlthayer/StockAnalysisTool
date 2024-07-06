from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import stockData

# Create your tests here.
class StockAPITestCase(APITestCase):
    def setUp(self):
        self.valid_symbol = 'IBM'
        self.invalid_symbol = 'INVALID'
        self.url = reverse('stock_api')


        