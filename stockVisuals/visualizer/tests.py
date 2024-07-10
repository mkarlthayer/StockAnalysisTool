from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import stockData

# Create your tests here.
class StockAPITestCase(APITestCase):
    def setUp(self):
        self.valid_symbol = 'NVDA'
        self.invalid_symbol = 'INVALID'
        self.url = reverse('visualizerData')

    def test_get_all_stocks(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        