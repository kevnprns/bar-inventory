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

  - User data is stored in between sessions to be able to leave off on where the user was.
  - User data is accessible from many computer devices as it pulls its data from a database
  - Admin can export a list of items so an employee can stock those Items.
  - The portability of every object in the system allows scalability to other users on a partnering application(employees, stockers, barManagers, etc...)
  - User can edit the current and required bar stock and have it persist in the data.

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
  * The GUI only has limited functionality as it is not in.

=========================
# Limitations
=========================

  * The application runs well with the database but it currently has a bug that I have not been able to solve with cors that kills the python code for the api.
  * I will be trying to keep making sure its up and running but if you cant see the data on the screen it means that it must be off.

=========================
# Assignment Specs
=========================

  *How is the general OO design of the program?*

    The classes are implemented with getters and setters properly and all variables are encapsulated.
    Methods are designed to do one thing and one thing only.
    I did not include any overloaded methods in my project as it did not fit the scope
    All duplicate code has been eliminated

  *Is persistence implemented effectively within the program?*

    Persistence is implemented through a homebased mysqldatabase. It is running on a flask program in python.
    The file is included in the server/routerFinal.py

    The server is running at
    http://24.138.161.30:5000/

    You can paste this into your browser to use the api yourself
    http://24.138.161.30:5000/locations
    http://24.138.161.30:5000/drinks
    http://24.138.161.30:5000/inventory


  *Is persistence used to realize a user story that could not be accomplished without persistence?*

    No The user stories could not have been accomplished without persistence

  *Does the user story contribute to the overall application and make sense within the program as a whole?*

    The user stories are small steps to scaling the application for different users.

  *Is the program able to save and load persistent data?*

    All data is saved runtime to the database on the server with API calls using axios.
    Example: App.vue: line 72

  *Is portability implemented effectively within the program?*

    Portability is included in the restock bar buttons when it exports the stocking information for that bar.
    This is good to be portable as it can be sent to other users in the program for example a employee who does stocking during the day could recieve this list on his phone.
    The program prints the portable JSON object out to the screen in an alert.


  * The Vue files are used as the View with the embedded typescript being the Controller for the application.
