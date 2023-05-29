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
    let res = [0, 0];
    data.map((row) => {
      if (row[attr] === value || attr === this.categoryAttr) {
        if (row[this.categoryAttr] === 'yes') res[0] += 1;
        else res[1] += 1;
      }
    });

    return res;
  }
  // calculate entropy of the given attribute
  // posNeg: [Number, Number] => Number
  entropy(posNeg) {
    let [pos, neg] = posNeg;
    let entropy =
      -(pos / (pos + neg)) * Math.log2(pos / (pos + neg)) -
      (neg / (pos + neg)) * Math.log2(neg / (pos + neg));
    // log2(0) might give NaN hence we need to handle that
    return isNaN(entropy) ? 0 : entropy;
  }

  // calculate the information gain for an attribute
  gain(data, initEntropy, attr) {
    let attrEntropy = 0;
    let vals = this.attrValues(attr);
    for (let val of vals) {
      let posNeg = this.countPosNeg(data, attr, val);
      attrEntropy +=
        ((posNeg[0] + posNeg[1]) / data.length) * this.entropy(posNeg);
    }
    return initEntropy - attrEntropy;
  }

  // return a pivot table from the given original table using the split aatribute and the pivot value
  createPivotTable(data, splitAttr, pivot) {
    return data
      .map((row) => {
        let res = {};
        for (let k of Object.keys(row)) {
          if (row[splitAttr] === pivot && k !== splitAttr) res[k] = row[k];
        }
        return res;
      })
      .filter((row) => Object.keys(row).length > 0);
  }

  // build the decisiontree and returns the root of the tree
  // data: the dataset
  // splitAttr : the attribute being used to split the table
  // pivot: the value of the splitAttr used to create the pivot table
  // depth: a number indicating the current depth of the tree, put zero at the start
  // for root node, the value of splitAttr is this.categoryAttr and pivot should be empty string
  // (data:Object, splitAttr:String, pivot:String) => Object
  buildTree(data, splitAttr, pivot, depth) {
    //console.log(`======= For Attribute: ${splitAttr} and Value: ${pivot} ========`);

    /* find initial entropy */
    let catPosNeg = this.countPosNeg(data, splitAttr, pivot);
    let initEntropy = this.entropy(catPosNeg);
    //console.log("[pos, neg] = ",catPosNeg);
    //console.log("initial entropy = ", initEntropy);

    if (depth > this.maxTreeDepth)
      return {
        attr: catPosNeg[0] > catPosNeg[1] ? 'yes' : 'no',
        children: null,
      };

    /* if initial entropy is zero, then we have a leaf node */
    /* return a subtree with children = null and attr = yes/no */
    if (initEntropy === 0) {
      let decision = catPosNeg[1] === 0 ? 'yes' : 'no';
      //console.log(`leaf node: ${decision}`);
      return {
        attr: decision,
        children: null,
      };
    }

    /* if pivot == '', then we are working on root node, else we need to generate the pivot table */
    if (pivot !== '') {
      //console.log('generating pivot table...');
      data = this.createPivotTable(data, splitAttr, pivot);
      //console.log('pivot table : ', data);
    }

    let maxGain = 0.0;
    let attrs = Object.keys(data[0]);
    for (let attr of attrs) {
      /* ignore the actual class attribute */
      if (attr === this.categoryAttr) continue;
      let gain = this.gain(data, initEntropy, attr);
      //console.log(`for ${attr}, gain = ${gain}`);
      if (gain > maxGain) {
        maxGain = gain;
        splitAttr = attr;
      }
    }
    //console.log(splitAttr + " has the max gain");

    depth += 1;

    let children = {};
    //console.log(`attr: ${splitAttr}, children: ${this.attrValues(splitAttr)}`);
    for (let val of this.attrValues(splitAttr)) {
      children[val] = this.buildTree(data, splitAttr, val, depth);
    }

    return {
      attr: splitAttr,
      children: children,
    };
  }

  createDecisionTree() {
    this.root = this.buildTree(this.trainingSet, this.categoryAttr, '', 0);
  }

  predict(testObject) {
    if (!this.root || !testObject) return 'Error';

    let root = this.root;

    while (true) {
      if(!root || root['attr'] === undefined)
        return 'no';
      let nodeAttr = root['attr'];
      let val = testObject[nodeAttr];
      if (root.children === null)
        return nodeAttr;
      root = root['children'][val];
    }
  }

  test() {
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
    //let tree = this.buildTree(this.trainingSet, this.categoryAttr,'');
    //console.log(JSON.stringify(tree, null, 4));
    //this.buildTree(this.trainingSet, 'outlook','sunny');
    //this.buildTree(this.trainingSet, 'outlook','overcast');
    //this.buildTree(newdata1, 'humidity','high');
    //this.buildTree(newdata1, 'humidity','normal');
    //this.buildTree(this.trainingSet, 'outlook','rain');
    //this.buildTree(newdata2, 'wind','strong');
    //this.buildTree(newdata2, 'wind','weak');

    this.createDecisionTree();
  }
}
module.exports = DecisionTree;
