from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

class Database:
    def __init__(self):
        self.__engine = None

    def __createSessions(self):
        if not self.__engine:
            raise Exception("Database is not connected. Call connect() first.")

        Session = sessionmaker(autocommit=False, autoflush=False, bind=self.__engine)
        session = Session()
        return session

    def connect(self, path):
        self.__engine = create_engine(path, connect_args={"check_same_thread": False})

    def close(self):
        if self.__engine:
            self.__engine.dispose()

    def query(self, query):
        session = self.__createSessions()
        result = session.execute(text(query))
        records = result.fetchall()
        column_names = result.keys()
        return [dict(zip(column_names, record)) for record in records]

    def select(self, table, parameters=None):
        if not table:
            raise AttributeError("Lack of required arguments.")
        session = self.__createSessions()
        try:
            if not parameters:
                query = text(f'SELECT * FROM {table}')

            elif len(parameters) == 1:
                key, value = next(iter(parameters.items()))
                query = text(f'SELECT * FROM {table} WHERE {key} = :{key}')

            else:
                query = text(f'SELECT * FROM {table}')
                temp = []
                for key, value in parameters.items():
                    temp.append(f"{key} = :{value}")
                query = query.where(text(" AND ".join(temp)))

            result = session.execute(query, parameters)
            records = result.fetchall()
            column_names = result.keys()
            return [dict(zip(column_names, record)) for record in records]
        except OperationalError as e:
            return f"Error: Table '{table}' does not exist or invalid argument"

    def create(self, table, values):
        if not table or not values:
            raise AttributeError("Lack of required arguments.")

        session = self.__createSessions()
        try:
            query = text(f'INSERT INTO {table} ({", ".join(values.keys())}) VALUES ({", ".join([f":{key}" for key in values.keys()])})')
            result = session.execute(query, values)
            session.commit()
            return f'Add {result.rowcount} records.'
        except OperationalError as e:
            return f"Error: Table '{table}' does not exist or invalid argument"

    def update(self, table, criteria, values):
        if not table or not criteria or not values:
            raise AttributeError("Lack of required arguments.")

        session = self.__createSessions()
        try:
            set_clause = ", ".join([f"{key} = :{key}" for key in values.keys()])
            where_clause = " AND ".join([f"{key} = :{key}" for key in criteria.keys()])
            query = text(f'UPDATE {table} SET {set_clause} WHERE {where_clause}')
            combined_values = {**values, **criteria}
            result = session.execute(query, combined_values)
            session.commit()
            return f'Updated {result.rowcount} records.'
        except OperationalError as e:
            return f"Error: Table '{table}' does not exist or invalid argument"

    def delete(self, table, criteria):
        if not table or not criteria:
            raise AttributeError("Lack of required arguments.")
        session = self.__createSessions()
        try:
            whereClause = " AND ".join([f"{key} = :{key}" for key in criteria.keys()])
            query = f'DELETE FROM {table} WHERE {whereClause}'
            result = session.execute(text(query), criteria)
            session.commit()
            return f'Deleted {result.rowcount} records.'
        except OperationalError as e:
            return f"Error: Table '{table}' does not exist or invalid argument"

