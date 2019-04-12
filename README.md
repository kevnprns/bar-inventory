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

  *NEW USER STORIES*

  - A Bartender can view a bar and account for each nights stock.
  - A Barback can receive each list of items to stock each bar.
  - As a user I can alter the name of each bar.

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
  * The main GUI functionality(GUI and Event Driven Programming) is within   "src/views/Home.vue", "src/views/Bartender.vue", "src/views/Barback.vue"
    This types of files are a combination of both html and typescript for reactive rendering.
    The "src/components" folder holds two other files that have have rendering involved.

=========================
# Limitations
=========================

  * The server that hosts my API is current not operational so
  I have been using my local machine and running it on a python pip environment.
  * If you need to run the code you need to cd into the server folder and install install pip3env and install flask and flask-cors on it.
  * Once the install is complete you can then run the following.

    pipenv run python3 router.py

    it may not work though if it runs on anything other than http://127.0.0.1:5000 as that is the endpoint used in the code.

    I assume the only time this needs to run is during the demo though so I believe that should be fine

=========================
# Going Through the Assignment
=========================

  *OO Design of the Application*

    The OO technique I choose to showcase was Composition and encapsulation.
    I decided to use composition in my assignment over Inheritance as it made much more sense to the idea behind the project. Composition over inheritance is a principle of using a instance of a class rather than inherit the parent class.
    I used composition throughout all class interactions to have a nicely integrated application.
    Instead of inheriting from the club class the bars are implemented as a list of bars that belong to the club.
    The 'has a' relationship makes much more sense in any context of inventory. an inventory item is not the same as an inventory but rather belongs to it.

    The part of my code that I feel exhibits best OO practices would be in the Inventory Class and the Bar Class.
    I use encapsulation heavily as well in the code with the use of private variables and public functions which allow for simplistic use of the class.
    An example of this would be in Inventory.ts(line 185)
    The function performs a slightly verbose and complex task in which it creates a brand new drink and then adds it to the inventory but the caller does not see what is inside the function.

    Getters and setters are implemented all across the 5 typescript classes in the classes folder.

    Assertions are used through typescripts built in variable signatures where by defining variables and function returns it automatically does type assertions and throws errors if the proper types are not used. Example Inventory.ts(Line 171)

  *New in A4*

    For A4 I focused on implementation of design patterns and fixing up the UI to prepare for the next step of the application.

    For the UI improvements. I made three different types of interfaces which act as three different types of users.
      * The Manager
          - Has access to all information on the bars and the back storage. Home.vue(Line 14)
          - Can restock the backroom with drinks by pressing the go shopping button. Home.vue (Line 22)
          - Can edit the bar names and delete bars. Bar.ts(Line 30)
          - Can edit the required and current stock there is within the system at each location. Home.vue(Line 58)
      * The Bartender
          - Has access to one bar at a time to simulate the managing of one bar. Bartender.vue(line 4)
          - Can only alter the current stock at the bar. Bartender.vue(line 15)
      * The Barback
          - Has access to see what each bar requires and he can restock the bar with as much as there is in the backroom.

  *Design Patterns*

    - Private Class Data (Structural Pattern)

        The private class data design pattern seeks to reduce exposure of attributes by limiting their visibility.
        It reduces the number of class attributes by encapsulating them in single Data object. It allows the class designer to remove write privilege of attributes that are intended to be set only during construction, even from methods of the target class.

        The classes that make use of this design pattern are the Inventory class(main class) and the InventoryItem class(data class).
        The Inventory class is only made up of some logic and acts as an intermediate but all data is contained within the InventoryItem class.

    - Singleton ()
        The singleton design pattern ensures a class has only one instance, and provide a global point of access to it.
        Encapsulated "just-in-time initialization" or "initialization on first use".

        This is used within the Club.ts class at the constructor and Instance method.
        The reason for the use of a singleton design pattern is that when running the program there is only ever one club that is being used
        I felt it was appropriate to make it so that it is certain that it is only initialized once.

  *Use of assertions(pre and post conditions).*

    To use assertions in Typescript I found within their documentation that it is build in with any type checking.
    You can find it on this page under Type Assertions:

    https://www.typescriptlang.org/docs/handbook/basic-types.html

    To create any type assertion one must simply define the type for any variable that is used.
    An example is in Inventory.ts(line 75) where the arguments and the return type are identified with their respective types.
    This allows typescript to throw an error if the wrong type is sent in to the code.
    NOTE: There are variables such as the one at Inventory.ts(line 123)

  *API Implementation*

    --SEE LIMITATIONS--
    My API was implemented on a home based server. It is running on a flask program in python.

    The file is included in the server/routerFinal.py

    The server is running at
    http://24.138.161.30:5000/
    --SEE LIMITATIONS--

    You can paste this into your browser to use the api yourself
    GET protocols
    --SEE LIMITATIONS--
    http://24.138.161.30:5000/locations
    http://24.138.161.30:5000/drinks
    http://24.138.161.30:5000/inventory
