import psycopg2, environ


env = environ.Env()
environ.Env.read_env()

HOST = env('DB_HOST')
PORT = env('DB_PORT')
NAME = env('DB_NAME')
USER = env('DB_USER')
PASS = env('DB_PW')

class Database():
    def read(self):
        try:
            self.conn = psycopg2.connect(host = HOST, database = NAME, user = USER, password = PASS)
            cur = self.conn.cursor()
            cur.execute('SELECT description, amount, spent_at, currency from backend_spending;')
            rows = cur.fetchall()
            cur.close()
            return rows
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            self.conn.close()
    
    def insert(self, dto):
        try:
            self.conn = psycopg2.connect(host = HOST, database = NAME, user = USER, password = PASS)
            cur = self.conn.cursor()
            query = 'INSERT INTO backend_spending(description, amount, spent_at, currency) ' \
                    'VALUES (%s, %s, %s, %s);'
            data = (dto.description, dto.amount, dto.spent_at, dto.currency)

            cur.execute(query, (data))
            self.conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            self.conn.close()