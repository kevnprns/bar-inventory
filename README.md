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


=====================
# Running the Project
=====================

  - To run the project you will need to have npm installed
  - To run the project run the following commands:

          cd bar-inventory
          make

  - The app can be accessed through your browser with the localhost port that is specified in the make output

===================
# Finding The Code
===================

  * The most important file containing all the classes is  "src/classes/BarClasses.ts"
  * The main GUI functionality(GUI and Event Driven Programming) is within   "src/views/Home.vue"
    This types of files are a combination of both html and typescript for reactive rendering.
    The Components Folder holds two other files taht are
  * The GUI only has limited functionality as it isn't intended to be unbreakable

=========================
# Assignment Specs
=========================

  * Typescript does not allow method overloading so I could't include it.
  * To demonstrate polymorphism I used composition over inheritance as Inheritance couldn't quite fit into the idea
    This can be viewed in the BarClasses.ts file. Ex: a Club has a Bar
  * I did not have any use in my projects scope for class variables.
    This is the way to declare static variables:

      Class Person{
        static instances: number = 0;
      }

  * Encapsulation, accessors and mutators is demonstrated through all the private variables along with all the get and set methods.
  * Constructors are in every class
  * Instance Variables are used within Home.vue around line 227 when preloading values
  * Class Invariants are not used as it did not fit into the projects scope


=========================
# User Stories
=========================

  - I can create a Bar.
  - I can create a Drink in the Club inventory.
  - I can add a Drink to a Bar inventory.
  - I can set the current and the required stock for each Drink in the inventory.
  - I can edit the current bar stock.
  - I can restock the Bar inventory by taking from the Club inventory.
