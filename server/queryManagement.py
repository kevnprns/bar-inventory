import mysql.connector as mariadb

mariadb_connection = mariadb.connect(host='dursley.socs.uoguelph.ca', user='kprinced', password='0940896', database='kprinced');

cursor = mariadb_connection.cursor()

if False:
    cursor.execute("insert into Drinks (name) values ('Vodka')")
    cursor.execute("insert into Drinks (name) values ('Jack Daniels')")
    mariadb_connection.commit()


cursor.execute("select * from Drinks")

print(cursor.fetchall())

# Find a specific name equal to some_name
# cursor.execute("SELECT first_name,last_name FROM employees WHERE first_name=%s", (some_name,))


curl -d'{"name":"Big Boss","description":"Greatest Gin in all of Portugal","quantity":"1"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/drinks

curl -d'{"name":"Palace Kiay","overstock":"1"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/locations
curl -d'{"name":"Main Room","overstock":"0"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/locations

curl -d'{"drinkID":"2","locationID":"1","required":"1","current":"1"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/inventory
