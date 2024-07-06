from django.db import models

# Hold all important data for a given stock
class stockData(models.Model):
    symbol = models.TextField(unique=True) # ticker (input by user)
    data = models.JSONField() # all relevant financial data marked by Year
