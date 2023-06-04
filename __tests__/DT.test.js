const DecisionTree = require('../recommender/DT');

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

const DataSet2 = [
  {
  "category": "Pizza",
    "price": "medium",
    "source": "kathmandu",
  "preference": "yes"
},
  {
    "category": "Burger",
    "price" : "low",
    "source": "lalitpur",
    "preference": "yes"
  },
  {
    "category": "Salad",
    "price": "low",
    "source": "kathmandu",
    "preference": "no",
  },
  {
    "category": "Sandwich",
    "price": "low",
    "source": "lalitpur",
    "preference": "yes"
  },
  {
    "category": "Dessert",
    "price": "low",
    "source": "bhaktapur",
    "preference": "yes"
  },
  {
    "category": "Pasta",
    "price": "low",
    "source": "lalitpur",
    "preference": "no"
  },
  {
    "category": "Soup",
    "price": "low",
    "source": "kathmandu",
    "preference": "yes"
  },
  {
    "category": "Breakfast",
    "price": "low",
    "source": "bhaktapur",
    "preference": "no",
  },
  {
    "category": "Biryani/Rice",
    "price": "medium",
    "source": "bhaktapur",
    "preference": "yes"
  },
  {
    "category": "Pizza",
    "price": "high",
    "source": "kathmandu",
    "preference": "no"
  },
  {
    "category": "Burger",
    "price": "low",
    "source": "bhaktapur",
    "preference": "yes"
  },
  {
    "category": "Salad",
    "price": "medium",
    "source": "lalitpur",
    "preference": "no"
  },
  {
    "category": "Sandwich",
    "price": "low",
    "source": "kathmandu",
    "preference": "yes"
  },
  {
    "category": "Dessert",
    "price": "high",
    "source": "kathmandu",
    "preference": "yes"
  },
  {
    "category": "Pasta",
    "price": "medium",
    "source": "kathmandu",
    "preference": "no"
  },
  {
    "category": "Soup",
    "price": "low",
    "source": "bhaktapur",
    "preference": "no",
  },
  {
    "category": "Breakfast",
    "price": "low",
    "source": "kathmandu",
    "preference": "yes",
  },
  {
    "category": "Biryani/Rice",
    "price": "medium",
    "source": "lalitpur",
    "preference": "no"
  },
  {
    "category": "Pizza",
    "price": "high",
    "source": "kathmandu",
    "preference": "yes"
  }
  ]

const tree2 = '{"attr":"category","children":{"Pizza":{"attr":"price","children":{"medium":{"attr":"yes","children":null},"low":{"attr":"yes","children":null},"high":{"attr":"price","children":{"medium":{"attr":"yes","children":null},"low":{"attr":"yes","children":null},"high":{"attr":"yes","children":null}}}}},"Burger":{"attr":"yes","children":null},"Salad":{"attr":"no","children":null},"Sandwich":{"attr":"yes","children":null},"Dessert":{"attr":"yes","children":null},"Pasta":{"attr":"no","children":null},"Soup":{"attr":"source","children":{"kathmandu":{"attr":"yes","children":null},"lalitpur":{"attr":"yes","children":null},"bhaktapur":{"attr":"no","children":null}}},"Breakfast":{"attr":"source","children":{"kathmandu":{"attr":"yes","children":null},"lalitpur":{"attr":"yes","children":null},"bhaktapur":{"attr":"no","children":null}}},"Biryani/Rice":{"attr":"source","children":{"kathmandu":{"attr":"yes","children":null},"lalitpur":{"attr":"no","children":null},"bhaktapur":{"attr":"yes","children":null}}}}}'

 
test('creates a valid decision tree', () => {
 config = {
    trainingSet: DataSet2,
    categoryAttr: 'preference'
  }

  dt = new DecisionTree(config);
  dt.createDecisionTree();
  expect(JSON.stringify(dt.root)).toEqual(tree2);
});

test('properly predicts a class for a decision tree', () => {
   config = {
    trainingSet: DataSet2,
    categoryAttr: 'preference'
  }

  dt = new DecisionTree(config);
  dt.createDecisionTree();
  testObj = {'category': 'Pizza', 'price': 'low', 'source': 'bhaktapur'};

  expect((dt.predict(testObj))).toEqual('yes');
});



