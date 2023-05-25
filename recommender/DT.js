class DecisionTree {
  constructor(config) {
    this.trainingSet = config.trainingSet;
    this.categoryAttr = config.categoryAttr;
    this.minItemsCount = config.minItemsCount || 1;
    this.entropyThreshold = config.entropyThreshold || 0.01;
    this.maxTreeDepth = config.maxTreeDepth || 20;
    this.root = null;
  }

  // list all the possible values for given attribute
  // attr : String => [String, ...]
  attrValues(attr) {
    let res = new Set();
    this.trainingSet.map((row) => {
      res.add(row[attr]);
    });
    return Array.from(res);
  }
                        

  // calculate the number of rows that have positive (yes) and negative (no) for the given anttribute
  // for find PosNeg for the categoryAttr we put categoryattr as the first parameter and an empty string as the second parameter 
  // returns a pair of numbers: positive count and negative count
  // (attr:String, value:String) => [Number, Number]
  countPosNeg(data, attr, value) {
    let res = [0,0];
    data.map((row) => {
      if(row[attr] === value || attr === this.categoryAttr){
        if(row[this.categoryAttr] === 'yes')
          res[0] += 1;
        else
          res[1] += 1;
      }
        
    });

    return res;
  }
  // calculate entropy of the given attribute
  // posNeg: [Number, Number] => Number
  entropy(posNeg) {
    let [pos, neg] = posNeg;
    let entropy = -(pos/(pos+neg)) * Math.log2(pos/(pos+neg)) - (neg/(pos+neg)) * Math.log2(neg/(pos+neg));
    // log2(0) might give NaN hence we need to handle that
    return (isNaN(entropy) ? 0 : entropy);
  }

  // calculate the information gain for an attribute
  gain(data, initEntropy, attr) {
    let attrEntropy = 0;
    let vals = this.attrValues(attr);
    for(let val of vals) {
      let posNeg = this.countPosNeg(data, attr, val);
      attrEntropy += ((posNeg[0]+posNeg[1])/data.length) * this.entropy(posNeg);
    }
    return initEntropy - attrEntropy;

  }

  // build the decisiontree and returns the root of the tree
  // splitAttr : the attribute being used to split the table
  // pivot: the value of the splitAttr used to create the pivot table
  // for root node, the value of splitAttr is this.categoryAttr and pivot should be empty string
  // (splitAttr:String, pivot:String) => Object
  buildTree(data, catPosNeg, splitAttr, pivot) {
    const assocAttr = splitAttr;
    //const catPosNeg = this.countPosNeg(data, splitAttr, pivot); 
    let initEntropy = this.entropy(catPosNeg);
    console.log(catPosNeg);
    console.log(initEntropy);
    let maxGain = 0.0;
    let attrs = Object.keys(data[0]);
    for(let attr of attrs) {
      if(attr === this.categoryAttr) continue;
      let gain = this.gain(data, initEntropy, attr);
      console.log(`for ${attr}, gain = ${gain}`);
      if(gain > maxGain){
        maxGain = gain;
        splitAttr = attr;
      }
    }
    console.log(splitAttr + " has the max gain");
    /*
    let children = {};
    for(let val of this.attrValues(splitAttr))
      children[val] = {'attr': splitAttr, 'pivot': val};
    console.log(children);

      return {
        'attr': assocAttr,
        'children': children 
      };
      */
  }

  createPivotTable(data, splitAttr, pivot)
  {
    return data.map(row => {
      let res = {};
      for(let k of Object.keys(row)) {
        if(row[splitAttr] === pivot && k !== splitAttr)
          res[k] = row[k];
      }
      return res; 
    }).filter(row => Object.keys(row).length > 0);
  }

  test(){
    /* testing PosNeg and entropy */
    //console.log(this.countPosNeg(this.trainingSet, 'outlook', 'sunny'));
    //console.log(this.entropy(this.countPosNeg(this.trainingSet, 'outlook', 'sunny')));

    //console.log(this.countPosNeg(this.trainingSet, 'outlook', 'overcast'));
    //console.log(this.entropy(this.countPosNeg(this.trainingSet, 'outlook', 'overcast')));

    //console.log(this.countPosNeg(this.trainingSet, 'outlook', 'rain'));
    //console.log(this.entropy(this.countPosNeg(this.trainingSet, 'outlook', 'rain')));

    /* testing gain function */
    //let catPosNeg = this.countPosNeg(this.trainingSet, this.categoryAttr, '');
    //let iEntropy = this.entropy(catPosNeg);
    //console.log(this.gain(this.trainingSet, iEntropy, 'outlook'));
    //console.log(this.gain(this.trainingSet, iEntropy, 'temp'));
    //console.log(this.gain(this.trainingSet, iEntropy, 'humidity'));
    //console.log(this.gain(this.trainingSet, iEntropy, 'wind'));

    let newdata1 = this.createPivotTable(this.trainingSet, 'outlook', 'sunny');
    let newdata2 = this.createPivotTable(this.trainingSet, 'outlook', 'rain');

    /*
    console.log(this.entropy(this.countPosNeg(newdata, 'temp', 'hot')));
    console.log(this.entropy(this.countPosNeg(newdata, 'temp', 'mild')));
    console.log(this.entropy(this.countPosNeg(newdata, 'temp', 'cool')));
    */
    let posNeg1 = this.countPosNeg(this.trainingSet, 'outlook', 'sunny');
    let posNeg2 = this.countPosNeg(this.trainingSet, 'outlook', 'rain');
    this.buildTree(this.trainingSet, [9,5], this.categoryAttr,'');
    this.buildTree(newdata1, posNeg1, 'outlook','sunny');
    this.buildTree(newdata2, posNeg2, 'outlook','rain');

  }
}

const trainingData = [
      {'outlook': 'sunny', 'temp': 'hot', 'humidity': 'high', 'wind': 'weak', 'play_tennis': 'no'},
      {'outlook': 'sunny', 'temp': 'hot', 'humidity': 'high', 'wind': 'strong', 'play_tennis': 'no'},
      {'outlook': 'overcast', 'temp': 'hot', 'humidity': 'high', 'wind': 'weak', 'play_tennis': 'yes'},
      {'outlook': 'rain', 'temp': 'mild', 'humidity': 'high', 'wind': 'weak', 'play_tennis': 'yes'},
      {'outlook': 'rain', 'temp': 'cool', 'humidity': 'normal', 'wind': 'weak', 'play_tennis': 'yes'},
      {'outlook': 'rain', 'temp': 'cool', 'humidity': 'normal', 'wind': 'strong', 'play_tennis': 'no'},
      {'outlook': 'overcast', 'temp': 'cool', 'humidity': 'normal', 'wind': 'strong', 'play_tennis': 'yes'},
      {'outlook': 'sunny', 'temp': 'mild', 'humidity': 'high', 'wind': 'weak', 'play_tennis': 'no'},
      {'outlook': 'sunny', 'temp': 'cool', 'humidity': 'normal', 'wind': 'weak', 'play_tennis': 'yes'},
      {'outlook': 'rain', 'temp': 'mild', 'humidity': 'normal', 'wind': 'weak', 'play_tennis': 'yes'},
      {'outlook': 'sunny', 'temp': 'mild', 'humidity': 'normal', 'wind': 'strong', 'play_tennis': 'yes'},
      {'outlook': 'overcast', 'temp': 'mild', 'humidity': 'high', 'wind': 'strong', 'play_tennis': 'yes'},
      {'outlook': 'overcast', 'temp': 'hot', 'humidity': 'normal', 'wind': 'weak', 'play_tennis': 'yes'},
      {'outlook': 'rain', 'temp': 'mild', 'humidity': 'high', 'wind': 'strong', 'play_tennis': 'no'},
    ];

const config = {
  trainingSet: trainingData,
  categoryAttr: 'play_tennis'
}

dt = new DecisionTree(config);

// testing
  dt.test();
