from datetime import datetime

class SpendingDto:
    def __init__(self, id, description, amount, spent_at, currency):
        self.id, self.description, self.amount, self.currency = id, description, amount, currency
        self.spent_at = datetime.strptime(spent_at, "%Y-%m-%d %H:%M:%S")

def createDtoFromDbo(spending):
    return SpendingDto(spending[0], spending[1], spending[2], spending[3], spending[4])

class UploadSpendingDto:
    def __init__(self, description, amount, currency):
        self.description, self.amount, self.currency =description, amount, currency
        self.spent_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def createUploadDto(obj):
    return UploadSpendingDto(obj['description'], obj['amount'], obj['currency'])