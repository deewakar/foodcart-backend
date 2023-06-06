const DecisionTree = require('./DT');

class RandomForest {
  constructor(config) {
    this.trainingSet = config.trainingSet;
    this.categoryAttr = config.categoryAttr;
    this.maxTrees = config.maxTrees || 3;
    this.trees = [];
  }

  buildForest(){
    let items = this.trainingSet;
    
    // creating training sets for each tree
    let trainingSets = [];
    for (let t = 0; t < this.maxTrees; t++) {
      trainingSets[t] = [];
      for (let i = items.length - 1; i >= 0 ; i--) {
        // assigning items to training sets of each tree using 'random sampling with replacement' strategy
        let random_idx = Math.floor(Math.random() * items.length);
        trainingSets[t].push(items[random_idx]);
      }
    }

    // building decision trees
    let forest = [];
    for (let t = 0; t < this.maxTrees; t++) {
      let treeconfig = {
        trainingSet : trainingSets[t],
        categoryAttr: this.categoryAttr
      }


      let tree = new DecisionTree(treeconfig);
      tree.createDecisionTree();

      forest.push(tree);
    }
    this.trees = forest;
  }

  /* predict a class by counting the 'yes' and 'no' votes */
  predict(testObject) {
    let res = {'yes': 0, 'no': 0};
    for(let tree of this.trees) {
      if(tree.predict(testObject) === 'yes')
        res.yes += 1;
      else
        res.no += 1;
    }
    return res;
  }
}

module.exports = RandomForest;
