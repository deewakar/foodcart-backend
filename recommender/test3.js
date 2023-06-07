const DecisionTree = require('./DT');
const RandomForest = require('./RF');

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


  const config = {
    trainingSet: DataSet2,
    categoryAttr: 'preference'
  }

//dt = new DecisionTree(config);
//dt.createDecisionTree();

//console.log(JSON.stringify(dt.root, null, 4))
//var testObj1 = {'outlook': 'sunny', 'temp': 'hot', 'humidity': 'high', 'wind': 'strong'};
var testObj2 = {'category': 'Pizza', 'price': 'low', 'source': 'bhaktapur'};

//console.log("Prediction: ", dt.predict(testObj2));
rf = new RandomForest(config);
rf.test(testObj2);
//console.log(JSON.stringify(rf.trees, null, 4))

