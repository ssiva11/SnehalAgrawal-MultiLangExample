import { Alert } from 'react-native';

class objectGenStructure {
    label: '1'
    value: '1' 
}
class questionDef {
    question : ""
    levels : []
    key : ""
    funcName : "" 
    numOfArg : 0
    outputType : "Y"
    points : 0
}
class questionMatrix {
      list : [] 
      constructor() {
        this.populateQuestions;
      }

  populateQuestions(level) {

    var questionsList = [
      [ 'Is it a prime number?',[1,3,4,5], "prime", "checkPrime", "0", "Y"],
      ['Is it an even number?',[1,3,4], "even", "isFactor", "1", "Y"],
      ['Is it is divisble by ?',[1,2,3,4,5], "factor", "isFactor", "1", "Y"],
      ['Is it between ?',[1,2,3,4,5], "range", "range", "2", "Y"],
      ['Is it equal to ?',[1,2,4,5], "equal", "checkEqual", "0", "Y"],
      ['Number of prime factors?',[2,3,4,5], "pfactor","getPrimeFactor","0","M"],
      ['Number of  factors?',[2,3,4,5], "allFactors","genAllFactors","0","M"],
 
    ];
    var newList = [];
    var levelsList = [];
    var question = new questionDef();

    for (var i = 0; i < questionsList.length; i++) {
      
      question = new questionDef();
      levelsList = questionsList[i][1];
      
      if(levelsList.includes(level))
      {
          question.levels = levelsList;
          question.question = questionsList[i][0];
          question.levels = questionsList[i][1];
          question.key = questionsList[i][2];
          question.funcName = questionsList[i][3];
          question.numOfArg = questionsList[i][4];
          question.outputType = questionsList[i][5];
          newList.push(question);
      }
    }
    this.list = newList;
  } 
}

module.exports = {
  objectGenStructure: objectGenStructure,
  questionDef: questionDef,
  questionMatrix: questionMatrix,
}