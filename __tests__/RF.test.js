const RandomForest = require('../recommender/RF');

const DataSet1 = [
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

 
test('creates a forest with distinct decision tree', () => {
  config = {
    trainingSet: DataSet1,
    categoryAttr: 'play_tennis',
    maxTrees: 3
  }

  rf = new RandomForest(config);
  rf.buildForest();
  trees = rf.trees.map(t => t.root);
  expect(JSON.stringify(trees[0])).not.toEqual(JSON.stringify(trees[1]));
  expect(JSON.stringify(trees[0])).not.toEqual(JSON.stringify(trees[3]));
  expect(JSON.stringify(trees[1])).not.toEqual(JSON.stringify(trees[3]));
});

test('gives a valid prediction', () => {
  config = {
    trainingSet: DataSet1,
    categoryAttr: 'play_tennis',
    maxTrees: 3
  }

  rf = new RandomForest(config);
  rf.buildForest();
  testObj = {'category': 'Pizza', 'price': 'low', 'source': 'bhaktapur'};
  prediction = rf.predict(testObj);
  // for this test data, 'no' should have more voting that 'yes'
  expect(prediction['no']).toBeGreaterThan(prediction['yes']);
});

