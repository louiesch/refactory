///////////////////////////////////////////////////////////// Vendor Information /////////////////////////////////////////
/*
{

  Vendor object expects x,y value on creation
  Vendor object has a fuel value and properties with a buy, sell, and quantity object.
  Entering an item and a player inventory object into the sell or buy funtion as an argument will check the players
  currency and vendor stock if purchasing or the player inventory object if selling. Items will be sold one at time.

}
*/

export class Vendor {
  constructor(x,y) {
    this.fuel = 0;
    this.wood = {sell: 2, buy: 5, quantity: 5};
    this.copperIngot = {sell: 5, buy: 10, quantity: 5};
    this.ironIngot = {sell: 8, buy: 15, quantity: 5};
    this.goldIngot = {sell: 10, buy: 20, quantity: 0};
    this.x = x;
    this.y = y;
  }
  sell(item, inventoryObj) {
		if (inventoryObj[item] > 0) {
    	inventoryObj.currency += this[item].sell;
      inventoryObj[item] -= 1;
      this[item].quantity += 1;
    } else {
    	alert(`Not Enough ${item}`);
    }
  }
  buy(item, inventoryObj) {
    if (inventoryObj.currency >= this[item].buy) {
      this[item].quantity -= 1;
      inventoryObj.currency -= this[item].buy;
      inventoryObj[item] += 1;
    } else {
    	alert('Not Enough Money');
    }
  }
};

////////////////////////////////////////////////////Mining Machine Notes//////////////////////////////////////////////////////
/*
{

  MiningMachine object expects x,y value on creation
  miningMachine.mineNode((GAME WORLD OBJECT HERE))
  if gameworld object returns false the intervall is stopped and no more code is executed
  the value of the machine is returned via player interaction with withdrawl (not final);

}
*/

export class MiningMachine {
  constructor(x,y) {
    this.fuel = 500;
    this.storage = ['', 0];
    this.miningPower = 1;
    this.x = x;
    this.y = y;
  }
  withdrawal(inventoryObj) {
    const [type, value] = this.storage;
    inventoryObj[type] += value;
    this.storage = [type, 0];
  }
  mineNode(gameworld){
    const interval = setInterval(() => {
      const returnValue = gameworld.mine( this.x, this.y, miningPower);
      if (returnValue === false) {
        clearInterval(interval);
        throw alert('no value')
      }
      const [type, value] = returnValue;
      this.storage[0] = type;
      this.storage[1] += value;
      this.fuel -= 1;
    }, 10000)
  }
};
/////////////////////////////////////////////////////// Smelter Info //////////////////////////////////////////////////////////////
/*
{

  Smelter object expects x,y value on creation
  When interacting with the smelter object it checks the inventory object value of the given argument.
  if enough items are found the semlter will remove the inventory items from the inventory object and return the "upgraded" item
  The inventory object should have a value of 0 by default for all items before using this class

}
*/
export class Smelter {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.fuel = 5;
    this.conversion = 3;
  }
  smelt(type, inventoryObj) {
    const objectReturn = {
      wood: () => 'coal',
      copper: () => 'copperIngot',
      iron: () => 'ironIngot',
      gold: () => 'goldIngot',
      default: () => false
    }
    if (this.fuel > 0 && inventoryObj[type] >= this.conversion) {
      const isValid = (objectReturn[type] || objectReturn['default'])()
      if (isValid) {
        inventoryObj[type] -= this.conversion;
        inventoryObj[isValid]++
        this.fuel--;
      }
    }
  }
};

//////////////////////////////////////////////////////////Refuel Info ///////////////////////////////////////////////////////////
/*
{

  Refuel is a simple object made to refuel given objects through  arguments with static classes
  Do not Create a Refuel object as an instance "new Refuel()"
  instead use Refuel object as such : Refuel.woodRefuel("current object to refuel here");

}
*/

export class Refuel {
  static woodRefuel(object) {
    object.fuel++;
  }
  static coalRefuel(object) {
    object.fuel += 5;
  }
};