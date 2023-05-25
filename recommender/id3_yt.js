const {DecisionTree, RandomForest} = require("./decision-tree");

// Training set
var data = 
    [
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

// Configuration
var config = {
    trainingSet: data, 
    categoryAttr: 'play_tennis', 
    ignoredAttributes: []
};

// Building Decision Tree
var decisionTree = new DecisionTree(config);

// Building Random Forest
var numberOfTrees = 3;
var randomForest = new RandomForest(config, numberOfTrees);

// Testing Decision Tree and Random Forest
var comic = {'outlook': 'rain', 'temp': 'hot', 'humidity': 'high', 'wind': 'weak'};

console.log("Decision Tree Prediction: "+ decisionTree.predict(comic));

console.log("Random Forest Prediction: "+ JSON.stringify(randomForest.predict(comic)));
