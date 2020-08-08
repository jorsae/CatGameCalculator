/**
 * This class holds: name, floorNumber, all requirements for a floor
 */
export class Floor{
    constructor(name, floorNumber, requirements){
        this.name = name;
        this.floorNumber = floorNumber;
        this.requirements = requirements;
    }

    toString(){
        return this.floorNumber + ": " + this.name;
    }
}