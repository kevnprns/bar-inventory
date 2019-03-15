from flask import Flask, request, jsonify, abort
import json
from flask_cors import CORS

import mysql.connector as mariadb
from config import *

app = Flask(__name__)
CORS(app)

def checkTargetIds(jsonData, targets):

    data = jsonData

    errorMessage = ""

    for target in targets:
        if target not in data:
            errorMessage = errorMessage + "targetMissing: " + target + "\n"


    if errorMessage != "":
        errorMessage = "Error: " + errorMessage
        abort(428, errorMessage)  # 404 Not Found

def startDatabaseConnection():
    mariadb_connection = mariadb.connect(user=USERNAME, password=USERPASS, database=DATABASE, auth_plugin='mysql_native_password');
    cursor = mariadb_connection.cursor(dictionary=True)

    return mariadb_connection, cursor

@app.route("/drinks/<id>",methods=['PUT','GET','DELETE'])
def single_drinks(id):
    print("Getting ID")
    print(id)
    drinkID = id

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method
    if requestType == "PUT":
        content = request.json

        if content is None:
            abort(428,"Error: drinks/id not recieving json")


        checkTargetIds(content, ['name', 'description', 'quantity'])

        name = content['name']
        description = content['description']
        quantity = content['quantity']

        try:
            cursor.execute("UPDATE Drinks SET name=%s, description=%s, quantity=%s WHERE drinkID=%s", (name,description,quantity,drinkID))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        cursor.execute("select * from Drinks where drinkID=%s", (drinkID,))

        return jsonify(cursor.fetchall())

    elif requestType == "DELETE":
        try:
            # cursor.execute("UPDATE Drinks SET name=%s, description=%s, quantity=%s WHERE drinkID=%s", (name,description,quantity,drinkID))
            cursor.execute("DELETE from Drinks where drinkID=%s", (drinkID,))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        return ""

    else:

        cursor.execute("select * from Drinks where drinkID=%s;", (drinkID,))

        return jsonify(cursor.fetchall())

@app.route("/drinks",methods=['POST','GET'])
def drinks():

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method

    if requestType == "POST":
        content = request.json

        if content is None:
            abort(428,"Error: drinks not recieving json")

        checkTargetIds(content, ['name', 'description', 'quantity'])

        name = content['name']
        description = content['description']
        quantity = content['quantity']

        try:
            cursor.execute("insert into Drinks (name,description,quantity) values (%s,%s,%s)", (name,description, quantity))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        cursor.execute("select * from Drinks order by drinkID DESC LIMIT 1")

        return jsonify(cursor.fetchall())
    else:
        cursor.execute("select * from Drinks")

        # print()
        return jsonify(cursor.fetchall())

@app.route("/locations/<id>",methods=['PUT','GET','DELETE'])
def single_locations(id):
    print("Getting ID")
    print(id)
    locationID = id

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method
    if requestType == "PUT":
        content = request.json

        if content is None:
            abort(428,"Error: locations/id not recieving json")  # 404 Not Found

        checkTargetIds(content, ['name', 'overstock'])

        name = content['name']
        overstock = content['overstock']

        try:
            cursor.execute("UPDATE Locations SET name=%s, overstock=%s WHERE locationID=%s", (name,overstock,locationID))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        cursor.execute("select * from Locations where locationID=%s", (locationID,))

        return jsonify(cursor.fetchall())

    elif requestType == "DELETE":
        try:
            cursor.execute("DELETE from Locations where locationID=%s;", (locationID,))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        return ""
    else:

        cursor.execute("select * from Locations where locationID=%s;", (locationID,))

        return jsonify(cursor.fetchall())

@app.route("/locations",methods=['POST','GET'])
def locations():

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method

    if requestType == "POST":
        content = request.json

        if content is None:
            abort(428,"Error: locations not recieving json")

        checkTargetIds(content, ['name', 'overstock'])

        name = content['name']
        overstock = content['overstock']

        try:
            cursor.execute("insert into Locations (name,overstock) values (%s,%s)", (name,overstock))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        cursor.execute("select * from Locations order by locationID DESC LIMIT 1")

        return jsonify(cursor.fetchall())
    else:
        cursor.execute("select * from Locations")

        # print()
        return jsonify(cursor.fetchall())

@app.route("/inventory/<id>",methods=['PUT','GET','DELETE'])
def single_inventory(id):
    print("Getting ID")
    print(id)

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method

    if requestType == "PUT":
        content = request.json

        if content is None:
            abort(428,"Error: inventory/id not recieving json")

        checkTargetIds(content, ['drinkID', 'locationID', 'required', 'current'])

        drinkID = content['drinkID']
        locationID = content['locationID']
        required = content['required']
        current = content['current']

        try:
            cursor.execute("UPDATE Inventory SET drinkID=%s, locationID=%s, required=%s, current=%s WHERE inventoryID=%s", (drinkID,locationID,required,current,id))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        cursor.execute("select * from Inventory where inventoryID=%s", (id,))

        return jsonify(cursor.fetchall())
    elif requestType == "DELETE":
        try:
            cursor.execute("DELETE from Inventory where inventoryID=%s;", (id,))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        return ""
    else:

        cursor.execute("select * from Inventory where inventoryID=%s;", (id,))

        return jsonify(cursor.fetchall())


@app.route("/inventory",methods=['POST','GET'])
def inventory():

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method

    if requestType == "POST":
        content = request.json

        if content is None:
            abort(428,"Error: inventory not recieving json")

        checkTargetIds(content, ['drinkID', 'locationID', 'required', 'current'])

        drinkID = content['drinkID']
        locationID = content['locationID']
        required = content['required']
        current = content['current']

        try:
            cursor.execute("insert into Inventory (drinkID,locationID,required,current) values (%s,%s,%s,%s)", (drinkID,locationID,required,current))
            mariadb_connection.commit()
        except mariadb.Error as error:
            abort(500,"Error: {}".format(error))

        cursor.execute("select * from Inventory order by inventoryID DESC LIMIT 1")

        return jsonify(cursor.fetchall())
    else:
        cursor.execute("select * from Inventory")

        # print()
        return jsonify(cursor.fetchall())

@app.route("/inventory/remove",methods=['PUT','GET'])
def inventoryRemove():
    myLocation = 0

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method

    if requestType == "PUT":
        content = request.json

        if content is None:
            abort(428,"Error: inventoryRemove not recieving json")

        for inventoryItem in content:
            print(inventoryItem)
            checkTargetIds(inventoryItem, ['drinkID', 'locationID', 'current'])

            drinkID = inventoryItem['inventoryID']
            locationID = inventoryItem['locationID']
            current = inventoryItem['current']
            myLocation = locationID

            # print("Inventory:",inventoryID,"  location:",locationID,"  current:",current)

            try:
                cursor.execute("UPDATE Inventory SET current = current - %s WHERE locationID=%s AND drinkID=%s ", (current,locationID,drinkID))
                mariadb_connection.commit()
            except mariadb.Error as error:
                abort(500,"Error: {}".format(error))


        cursor.execute("select * from Inventory where locationID=%s", (myLocation,))
        return jsonify(cursor.fetchall())
    else:
        pass
        # doesnt do anything

@app.route("/inventory/add",methods=['PUT','GET'])
def inventoryAdd():
    myLocation = 0

    mariadb_connection, cursor = startDatabaseConnection()

    requestType = request.method

    if requestType == "PUT":
        content = request.json

        if content is None:
            abort(428,"Error: inventoryAdd not recieving json")

        for inventoryItem in content:
            checkTargetIds(inventoryItem, ['drinkID', 'locationID', 'current'])

            drinkID = inventoryItem['drinkID']
            locationID = inventoryItem['locationID']
            current = inventoryItem['current']
            myLocation = locationID

            try:
                cursor.execute("UPDATE Inventory SET current=current+%s WHERE locationID=%s AND drinkID=%s", (current,locationID,drinkID))
                mariadb_connection.commit()
            except mariadb.Error as error:
                abort(500,"Error: {}".format(error))


        cursor.execute("select * from Inventory where locationID=%s", (myLocation,))
        return jsonify(cursor.fetchall())
    else:
        pass


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
