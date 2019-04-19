import {questionDef,questionMatrix,objectGenStructure } from './Questions.js';

// Constants
const LIMIT_INDEX = 1;
const LEVEL_INDEX = 0;
const START_PRIME = 1;
/** 
  * @desc this class will hold functions that act on numbers
  * examples 
  * @author Shashi Siva
  * @required
*/
class helperFunctions {
   
   // Functions available in this Class
  /** 
  * @desc Given an upperlimit, 
  *       this function populates an array of numbers from 1 - limit
  * examples 
  * @author Shashi Siva
  * @required upper limit
  */
   populateAvailableNumbers(limit) {
    var availableNumbers = [];

    for (var i = 0; i < limit; i++)
        availableNumbers[i] = i+1;
    
    return availableNumbers;
  }

  /** 
  * @desc Given an array find the numerical limit for the level
  * examples 
  * @author Shashi Siva
  * @required level and array 
  */
   findLimit(level, array){
     var tempArray;
     
     for(var i = 0 ; i<= array.length; i++){
       tempArray = array[i];
      
       if(tempArray[LEVEL_INDEX]==level)
        return tempArray[LIMIT_INDEX];
      else
        continue;
     }
   } 
  /** 
  * @desc Given an upperlimit generate a list of prime numbers
  * examples 
  * @author Shashi Siva
  * @required limit 
  */
  genPrime(limit) {
    var numArray = [],
      primeArray = [],
      start = START_PRIME,
      end = limit;
    for (var i = 0; i < end; i++) {
      var divisArray = [];
      numArray.push(i);
      [].forEach.call(numArray, function(num) {
        if (i % num === 0) {
          divisArray.push(num);
        }
      });
      if (i >= start && divisArray.length <= 2) {
        primeArray.push(i);
      }
    }
    
    return primeArray;
  }

 /** 
  * @desc genPrimeFactors
  * examples 
  * @author Shashi Siva
  * @required
  */
  genPrimeFactors(num)
  {
   
   var primeFactors = [];
    while (num % 2 === 0) {
        primeFactors.push(2);
        num = num / 2;
    }
    
    var sqrtNum = Math.sqrt(num);
    for (var i = 3; i <= sqrtNum; i++) {
        while (num % i === 0) {
            primeFactors.push(i);
            num = num / i;
        }
    }

    if (num > 2) {
        primeFactors.push(num);
    }

    return primeFactors.length;
  }


/** 
  * @desc genAllFactors
  * examples 
  * @author Shashi Siva
  * @required
  */
 

  genAllFactors(num) {
    const isEven = num % 2 === 0;
    let inc = isEven ? 1 : 2;
    let factors = [1, num];

  for (let curFactor = isEven ? 2 : 3; Math.pow(curFactor, 2) <= num; curFactor += inc) {
    if (num % curFactor !== 0) continue;
      factors.push(curFactor);
    let compliment = num / curFactor;
    if (compliment !== curFactor) factors.push(compliment);
  }
  return factors.length;
}

  /** 
  * @desc checkPrime
  * examples 
  * @author Shashi Siva
  * @required
  */
  checkPrime(value, primeArray) {
    if (primeArray.includes(value)) 
      return true;
    else
       return false;
  }
 
  /** 
  * @desc checkPrime
  * examples 
  * @author Shashi Siva
  * @required
  */
  genAvergareTries(limit) {
    var avgTries = 0;
    var power = 1;
    var powerValue = 1;

    for ( power = 1; power<= 10; power++ ){
      powerValue =  Math.pow(2, power);
      if( powerValue > limit){
          avgTries = avgTries + 1;
          break;
      }
      avgTries = avgTries + 1;
    }
    avgTries = avgTries + 1;
    return avgTries;

   
  }
  /** 
  * @desc createNumberDropDownArray
  * examples 
  * @author Shashi Siva
  * @required
  */
  createNumberDropDownArray(limit) {
    var dropdownArray = [];
    var dropdownElement = new objectGenStructure();

    for (var i = 0; i < limit; i++) {
      dropdownElement = new objectGenStructure();
      dropdownElement.label = String(i + 1);
      dropdownElement.value = String(i + 1);
      dropdownArray[i] = dropdownElement;
    }
    return dropdownArray;
  }

}

// Export the class
module.exports = {
  helperFunctions : helperFunctions,
}




