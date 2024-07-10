from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status

from . models import stockData
from . serializers import stockSerializer

import requests
import os

class stockAPIView(APIView):
    
    serializer_class = stockSerializer

    def get(self, request): 
        stocks = [ {"symbol": stock.symbol, "data": stock.data}  
        for stock in stockData.objects.all()] 
        return Response(stocks) 
  
    def post(self, request): 
        API_KEY = os.getenv('API_KEY')
        symbol = request.data.get('symbol')

        company_overview_url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={API_KEY}'
        company_overivew_data = requests.get(company_overview_url).json()

        if 'Symbol' not in company_overivew_data:
            return Response({"error": "Could not fetch data from Alpha Vantage"}, status=status.HTTP_400_BAD_REQUEST)

        dataSelections = ['Description', "Exchange", "Country", "Sector", "Industry", "LatestQuarter", "PERatio", "PEGRatio", "DividendPerShare", "EPS", "Beta", "SharesOutstanding"]
        selected_company_data = {}
        for selection in dataSelections:
            selected_company_data[selection] = company_overivew_data[selection]

        income_statement_url = f'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol={symbol}&apikey={API_KEY}'
        income_statement_data = requests.get(income_statement_url).json()

        balance_sheet_url = f'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol={symbol}&apikey={API_KEY}'
        balance_sheet_data = requests.get(balance_sheet_url).json()

        cash_flow_url = f'https://www.alphavantage.co/query?function=CASH_FLOW&symbol={symbol}&apikey={API_KEY}'
        cash_flow_data = requests.get(cash_flow_url).json()
       
       
        yearsOfSelectedData = min(5, len(income_statement_data['annualReports']))
        selected_company_data['yearsOfData'] = yearsOfSelectedData - 1 #subtract 1 so for loop works on react side
        for i in range(yearsOfSelectedData):
            selected_company_data['dateYear' + str(i)] = income_statement_data['annualReports'][i]['fiscalDateEnding']
            selected_company_data['netIncomeYear' + str(i)] = income_statement_data['annualReports'][i]['netIncome']
            selected_company_data['totalRevenueYear' + str(i)] = income_statement_data['annualReports'][i]['totalRevenue']
            selected_company_data['totalAssetsYear' + str(i)] = balance_sheet_data['annualReports'][i]['totalAssets']
            selected_company_data['totalLiabilitiesYear' + str(i)] = balance_sheet_data['annualReports'][i]['totalLiabilities']
            selected_company_data['longTermDebtYear' + str(i)] = balance_sheet_data['annualReports'][i]['longTermDebt']
            selected_company_data['totalEquityYear' + str(i)] = balance_sheet_data['annualReports'][i]['totalShareholderEquity']
            selected_company_data['operatingCashflowYear' + str(i)] = cash_flow_data['annualReports'][i]['operatingCashflow']

        #save the dictionary to database
        serializer = stockSerializer(data={"symbol": symbol, "data": selected_company_data})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    