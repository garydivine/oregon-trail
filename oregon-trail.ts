(function(){

    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        hunt(): number;

        eat(): boolean;


    }

    //interface describing attributes and methods a wagon should have
    interface IWagon{
        capacity: number;
        passengerArray: Traveler[];

        addPassenger(traveler: Traveler): string;

        isQuarantined(): boolean;

        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        constructor(food: number, name: string, isHealthy: boolean ) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt() {
            if (Math.random() > 0.5) {
                this.food = this.food + 100
            }

            return this.food;
            
        }


        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat() {
            if (this.food >= 20) {
                this.food = this.food - 20;
            } else {
                this.isHealthy = false;
            }

            return this.isHealthy;
            
        }
    }

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity: number;
        passengerArray: Traveler[];

        constructor (capacity: number, passengerArray: Traveler[]) {
            this.capacity = capacity;
            this.passengerArray = passengerArray;
        }

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler) {
            if (this.capacity != 0) {
                this.passengerArray.push(traveler);
                this.capacity = this.capacity - 1;
                return "added";
            } else {
                return "sorry";
            }
        }

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined() {
            let quarantined = false;

            for (let passenger of this.passengerArray) {
                if (passenger.isHealthy == false) {
                    quarantined = true;
                }
            }

            return quarantined;

        }

        //Return the total amount of food among all passengers of the wagon.
        getFood() {
             let totalFoodAmount = 0;

            for (let passenger of this.passengerArray) {
                totalFoodAmount = totalFoodAmount + passenger.food;
            }


            return totalFoodAmount;
        }
    }

    /*
    * Play the game
    *
    * X Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    *
    * X Create wagon with an empty passenger list and a capacity of 4.
    *
    * X Make 3 of 5 the travelers eat by calling their eat methods
    *
    * X Make the remaining 2 travelers hunt
    *
    * X Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    *
    * X Run the isQuarantined method for the wagon
    *
    * X Run the getFood method for the wagon
    *
    * X the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects 
    *
    */

    let traveler1 = new Traveler(10, "Gary", true);
    let traveler2 = new Traveler(50, "Katie", true);
    let traveler3 = new Traveler(40, "John", true);
    let traveler4 = new Traveler(100, "Greg", true);
    let traveler5 = new Traveler(30, "Megan", true);

    let wagon = new Wagon(4, []);

    console.log("Result of first three travelers eating:");
    console.log(traveler1.eat());
    console.log(traveler2.eat());
    console.log(traveler3.eat());
    console.log(" ");

    console.log("Result of last two travelers hunting:");
    console.log(traveler4.hunt());
    console.log(traveler5.hunt());
    console.log(" ");

    let travelers = new Array<Traveler>();
    travelers.push(traveler1);
    travelers.push(traveler2);
    travelers.push(traveler3);
    travelers.push(traveler4);
    travelers.push(traveler5);

    console.log("50% chance of being added to wagon:");
    for (let travler of travelers) {
        console.log(`${travler.name} tries to board the wagon`);
        if (Math.random() > 0.5) {
            console.log("Verdict:")
            console.log(wagon.addPassenger(travler));
        } else {
            console.log(`${travler.name} not permitted to board`);
        }
    }
    console.log(" ");

    console.log("Is the wagon quarantined?")
    console.log(wagon.isQuarantined());
    console.log(" ");

    console.log("Total amount of food among all passengers of the wagon:")
    console.log(wagon.getFood());


})();

