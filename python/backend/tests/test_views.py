from django.test import TestCase, Client
from django.urls import reverse
from backend.models import Spending

import json


class TestView(TestCase):
    def setUp(self):
        self.client = Client()
        self.spendings_url = reverse('spendings')
        self.spending = Spending.objects.create(
            description = 'test1',
            amount = 2000,
            currency = 'HUF',
            spent_at = '2000-01-01T08:00:00'
        )

    def testListOfSpendings(self):
        response = self.client.get(self.spendings_url)
        self.assertEquals(response.status_code, 200)
        json = response.json()
        self.assertEquals(len(json), 1)
        self.assertEquals(json[0]['description'], self.spending.description)
        self.assertEquals(json[0]['amount'], self.spending.amount)
        self.assertEquals(json[0]['spent_at'], self.spending.spent_at)
        self.assertEquals(json[0]['currency'], self.spending.currency)

    def testCreateSpending(self):
        response = self.client.post(self.spendings_url, data = json.dumps({ 
            "description": "test2",
            "amount": 1000,
            "currency": "USD" 
        }), content_type = 'application/json')
        self.assertEquals(response.status_code, 200)

        response = self.client.get(self.spendings_url)
        last_element = response.json()[-1]
        self.assertEquals(last_element['description'], 'test2')
        self.assertEquals(last_element['amount'], 1000)
        self.assertEquals(last_element['currency'], 'USD')

    def testCreateSpendingNoBody(self):
        response = self.client.post(self.spendings_url)
        self.assertEquals(response.status_code, 400)

    def testNoMethodAllowed(self):
        response = self.client.put(self.spendings_url)
        self.assertEquals(response.status_code, 405)