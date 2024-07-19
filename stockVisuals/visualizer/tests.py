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

    def test_post_invalid_input(self):
        response = self.client.post(self.url, {'symbol': self.invalid_symbol}, format = 'json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    def test_post_valid_input(self):
        response = self.client.post(self.url, {'symbol': self.valid_symbol}, format = 'json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


        