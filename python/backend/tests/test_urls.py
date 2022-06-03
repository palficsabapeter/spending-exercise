from django.test import SimpleTestCase
from django.urls import reverse, resolve

from backend.views import handleSpendingsReq

class TestUrls(SimpleTestCase):
    def testSpendingsUrl(self):
        url = reverse('spendings')
        self.assertEquals(resolve(url).func, handleSpendingsReq)