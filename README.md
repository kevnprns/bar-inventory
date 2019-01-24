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

  - I can create a Bar.
  - I can create a Drink in the Club inventory.
  - I can add a Drink to a Bar inventory.
  - I can set the current and the required stock for each Drink in the inventory.
  - I can edit the current bar stock.
  - I can restock the Bar inventory by taking from the Club inventory.

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
# Assignment Specs
=========================

  * I did not have any use in my project's scope for method overloading.
    Method overloading is different in typescript than most OO languages.
    Proof of concept:

        public myFunction(myString: string): string;
        public myFunction(myNumber: number): number;

        public myFunction(stringOrNumber: string | number): string | number {
          if(typeof stringOrArray === "string"){
            //do something with the string
            return stringOrNumber
          } else {
            //do something with the number
            return stringOrNumber
          }
        }

  * I did not have any use in my project's scope for class variables.
    Proof of concept:

        Class Person{
          static instances: number = 0;
        }

  * Constructors are in every class
  * Encapsulation, accessors and mutators is demonstrated through all the private instance variables. All private variables are denoted by using an underscore in front of the variable.
    An example of the use of private variables can be found in 'classes/Club.ts'

    Typescript accessor and mutators are used in the following way:

        myName = myClub.name; // use of accessor
        myClub.name = 'Rebel'; // use of mutator

  * To demonstrate polymorphism I used composition over inheritance as Inheritance couldn't quite fit into the idea
    This can be viewed in the BarClasses.ts file. Ex: a Club has a Bar
  * Abstraction is used in functions such as stockBar() in (Bar.ts:39).
    The UI only needs to call one function that holds a lot of functionality. The function is abstract in the sense that you cannot see what it does.
  * Instance Variables are used within Home.vue around line 224 when preloading values
  * Class Invariants are not used as it did not fit into the projects scope

  * The Vue files are used as the View with the embedded typescript being the Controller for the application.
  
