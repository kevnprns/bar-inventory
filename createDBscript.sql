------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
-- Creating tables for the database ...

-- Creating Drinks ...
CREATE TABLE Drinks (
	 drinkID	INT(11)	PRIMARY KEY autoincrement
	,name VARCHAR(10)
	,description TEXT
	,quantity INT(11)
);


-- Creating Locations ...

CREATE TABLE Locations (
  locationID	INT(11)	PRIMARY KEY autoincrement,
  name VARCHAR(10),
  overstock tinyint(1)
);

-- Creating Inventory ...
CREATE TABLE Inventory (
  inventoryID INT(11)
  ,drinkID	INT(11)
	,locationID	INT(11)
	,required INT(11)
	,current INT(11)
  ,PRIMARY KEY (inventoryID, drinkID, locationID)
);

CREATE TABLE Drinks ( drinkID	INT(11)	PRIMARY KEY autoincrement ,name VARCHAR(10) ,description TEXT ,quantity INT(11) );

CREATE TABLE Locations (locationID	INT(11)	PRIMARY KEY autoincrement,name VARCHAR(10),overstock tinyint(1));

CREATE TABLE Inventory (inventoryID INT(11) auto_increment, drinkID INT(11), locationID INT(11),required INT(10),current INT(10), PRIMARY KEY (inventoryID, drinkID, locationID));
