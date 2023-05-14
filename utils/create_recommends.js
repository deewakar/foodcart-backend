const Order = require('../models/Order');
const mongoose = require('mongoose');
require('dotenv').config();
const dt = require('decision-tree');

const Recommendation = require('../models/Recommendation');

const {DecisionTree, RandomForest} = require("../recommender/decision-tree");

const mongoURI = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.c34qtts.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


async function get_all_items (email) {
  const result = {};

  try {
    let userData = await Order.findOne({"email": email});
    userData.order_data.map((order) => {
      
      order.slice(1).map((item) => {
        result[item.id] = (result[item.id] ??  0 ) + parseInt(item.qty)});
    });

    return result;
  } catch(error) {
    console.log(error.message);
  }
}

async function dt_classifier(freq_data) {

  if (!freq_data)
    return []; 

  //console.log('frequency data:' +JSON.stringify(freq_data));

  // get all meal items
  //let conn = await mongoose.connect(mongoURI, {useNewUrlParser: true});
  const all_docs = await mongoose.connection.db.collection("meal_items");
  const items = await all_docs.find({}).toArray();

  // build a training dataset using the freq_data, meal_items that have qty >= 1, put 'preference' = true else put false
  let preferred_items = items.filter((item) => freq_data[item._id.toString()]);
  let training_data = preferred_items.map((item) => {
    let item_copy = {...item, 'preference': true};
    return item_copy;
  });
  // add equal amount of objects to training_data with preference = false
  // these objects should not be in preferred_items
  const length = training_data.length;
  for(let i=0, j=0; j < items.length && i < length;j++){
    if(freq_data[items[j]._id.toString()] === undefined) {
      let item_copy = {...items[j], 'preference': false};
      training_data.push(item_copy);
      i++;
    }
    }
  //console.log(recommended_items);
  //console.log('training data:' + JSON.stringify(training_data));

  
  // construct a decision tree using the training dataset 
  //let decisionTree = new dt("preference", ["name", "CategoryName"]);
  //decisionTree.train(training_data);

  let config = {
    trainingSet: training_data,
    categoryAttr: 'preference',
    ignoredAttributes: ['_id','img', 'description']
  };

  let decisionTree = new DecisionTree(config);
  let numberOfTrees = 3;
  let randomForest = new RandomForest(config, numberOfTrees);

  let documents = [];
  // for each meal item, find the value for class 'preference'
  //    if 'preference' is true, add it to recommendation object array
  items.map((item) => {
    //let res = decisionTree.predict(item);
    //console.log("random forest: "+JSON.stringify(randomForest.predict(item)));
    let prediction = randomForest.predict(item);

    if(prediction['true'] > prediction['false'])
      documents.push(item);
  });

  // return the array of objects (meal items) recommendation for the user
  return documents;

}


async function createRecommendations(email) {
  const conn = await mongoose.connect(mongoURI, {useNewUrlParser: true });
  let freq_data = await get_all_items(email);

  // send freq_data to decision tree classifier (DTC) function
  // DTC function should return an array of recommended meal_items object
  // convert it to a document for the given user email using a suitable model
  // add the document to the recommendations collection in the mongodb atlas
  //console.log(freq_data);
  let foodItems = await dt_classifier(freq_data);
  //console.log(foodItems);

  try {
    await Recommendation.findOneAndUpdate({email: email},
                                          {email: email,
                                           recommended_items: [foodItems] 
                                          },
                                          {new: true,
                                           upsert: true});
  } catch (err) {
      console.log(err.message);
    }

  if(foodItems)
    conn.disconnect();
}

if(process.argv[2])
  createRecommendations(process.argv[2]);

module.exports = createRecommendations;


