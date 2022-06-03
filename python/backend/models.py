from django.db import models

class Spending(models.Model):
    description = models.TextField(blank = True, default = '')
    amount = models.IntegerField(blank = True, default = 0)
    spent_at = models.CharField(max_length = 19, blank = True, default =  '0000-00-00T00:00:00')
    currency = models.CharField(max_length = 3, blank = True, default = 'USD')
