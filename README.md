===================
# General OverView
===================

 Hello! I wrote my application in Typescript using the framework Vue.
 The project folder may seem very large but there are only
 a couple of files that have the actually application logic in them (See Finding the Code).

 The idea behind the classes is a simple inventory management system for a nightclub.

  - A Club has an inventory stocked with drinks
  - A Club can have many bars
  - Each Bar sells its own set of drinks that it gets from the Clubs inventory
  - An Inventory has InventoryItems which contain a Drink along with its current and required stock.
  - Required stock is the minimum number of the Drink the inventory should have
  - A Drink object contains only information about the drinks.
  - Once a Bar's inventory is low it can restock its missing drinks from by getting them from the Club's inventory.
  - Once a Club's inventory is low it can restock its missing drinks
    by simply calling resetStock() as if a shopping trip has been completed.

=========================
# User Stories
=========================

  - A user can get all their data from a server.
  - A user can delete a drink from the bar stock.
  - A user can delete a drink from the club entirely.
  - A user can update a drinks name and information.

=====================
# Running the Project
=====================

  - To run the project you will need to have npm installed as well as the Vue CLI installed

      Installing npm:
          https://www.npmjs.com/get-npm

      Installing Vue:
          npm install -g @vue/cli

  - Withing the projects root folder run the following command:

          make

  - The app can be accessed through your browser with the localhost port that is specified in the make output

===================
# Finding The Code
===================

  * The most important files are in the "src/classes"
  * The main GUI functionality(GUI and Event Driven Programming) is within   "src/views/Home.vue"
    This types of files are a combination of both html and typescript for reactive rendering.
    The "src/components" folder holds two other files that have have rendering involved.

=========================
# Limitations
=========================

  * The application runs well with the database but it currently has a bug that I have not been able to solve with cors that kills the python code for the api.
  * I will be trying to keep making sure its up and running but if you cant see the data on the screen it means that it must be off.

=========================
# Assignment Specs
=========================

  *Choose one part (or parts) of your code that you feel exhibits very good OO technique.*

    The OO technique I choose to showcase was Composition and encapsulation. I decided to use composition in my assignment over Inheritance as it made much more sense to the idea behind the project. Composition over inheritance is a principle of using a instance of a class rather than inherit the parent class.
    I used composition throughout all class interactions to have a nicely integrated application.
    Instead of inheriting from the club class the bars are implemented as a list of bars that belong to the club.
    The 'has a' relationship makes much more sense in any context of inventory. an inventory item is not the same as an inventory but rather belongs to it.

    The part of my code that I feel exhibits best OO practices would be in the Inventory Class and the Bar Class.
    I use encapsulation heavily as well in the code with the use of private variables and public functions which allow for simplistic use of the class.
    An example of this would be in Inventory(line 185)
    The function performs a slightly verbose and complex task in which it creates a brand new drink and then adds it to the inventory but the caller does not see what is inside the function.


  *Use of assertions(pre and post conditions).*

    To use assertions in Typescript I found within their documentation that it is build in with any type checking.
    You can find it on this page under Type Assertions:

    https://www.typescriptlang.org/docs/handbook/basic-types.html

    To create any type assertion one must simply define the type for any variable that is used.
    An example is in Inventory.ts(line 75) where the arguments and the return type are identified with their respective types.
    This allows typescript to throw an error if the wrong type is sent in to the code.
    NOTE: There are variables such as the one at Inventory.ts(line 123)



  *API Implementation*

    My API was implemented on a home based server. It is running on a flask program in python.

    The file is included in the server/routerFinal.py

    The server is running at
    http://24.138.161.30:5000/

    You can paste this into your browser to use the api yourself
    GET protocols
    http://24.138.161.30:5000/locations
    http://24.138.161.30:5000/drinks
    http://24.138.161.30:5000/inventory


  *SOAP vs. REST*

    Soap stands for Simple Object Access Protocol and REST stands for Representational State Transfer

    SOAP is a protocol whereas REST is a architecture. Both have their own benefits to use one over the other.
    It typically comes down to preference and the type of usage you want in your API

    SOAP is mainly used when you want extra security on your application as it supports WS security,
    whereas REST comes in handy in systems where you require less verbosity and more flexible formats to make integration simple without having to refactor existing code.

    SOAP Benefits:
      * Increased security in transactions as it is built into the protocol
      * It is standardized and follows specific formats
      * Allows more transfer protocols other than HTTP (TCP, UDP, STMP, etc.)

    REST Benefits:
      * Better data transfer formats. (Text, JSON, XML, YAML, HTML)
      * API calls can be cached.
      * Requires fewer resources
      * Increased Scalability and flexibility

    In contrast both are good API's.
    In cases where you want extra security and possibly more protocol usage a SOAP API would work best. The downside is that soap is much more verbose with its strict XML styling and is said to be slightly slower than REST.
    In cases where you want scalability and flexibility along with less processing or for the simplicity of using JSON the better option would be REST.

    SOAP Usage:
      http://www.dneonline.com/calculator.asmx
      I used the add operation in this SOAP API. The usage can be found within views/SOAPcalculator.vue (line 107)
      In this I demonstrate how to use a SOAP protocol in typescript.
      I found it to be simple after testing out a couple API's but I personally am not the greatest fan of the verbosity

    REST Example:
      I created my own RESTFUL API and it is contained within server/routerFinal.py
      The endpoints are defined in each function and it makes use of JSON objects which make the data easily accessible.

    References
    https://raygun.com/blog/soap-vs-rest-vs-json/
    https://stackify.com/soap-vs-rest/


  *API Design Document*

    The api document is in the design folder of the project. to understand the application better you should read the General Overview at the Top.
