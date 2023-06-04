
const Order = require('../models/Order');
const mongoose = require('mongoose');
require('dotenv').config();

const Recommendation = require('../models/Recommendation');

const DecisionTree = require("../recommender/DT");
const RandomForest = require("../recommender/RF");

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

function trimObject(obj, includeList) {
  let res = {};
  for(let k of includeList)
    res[k] = obj[k];
  return res;
}
async function dt_classifier(freq_data) {
  // get all meal items
  //let conn = await mongoose.connect(mongoURI, {useNewUrlParser: true});
  const all_docs = await mongoose.connection.db.collection("food_items");
  const items = await all_docs.find({}).toArray();

  // build a training dataset using the freq_data, meal_items that have qty >= 2, put 'preference' = true else put false
  let preferred_items = items.filter((item) => freq_data[item._id.toString()] >= 2);
  //console.log(preferred_items);
  let training_data = preferred_items.map((item) => {
    let item_copy = trimObject(item, ['CategoryName', '_price', '_source']);
    item_copy.preference = 'yes';
    return item_copy;
  });
  //console.log(training_data);
  // add equal amount of objects to training_data with preference = false
  // these objects should not be in preferred_items
  const length = training_data.length;
  for(let i=0, j=0; j < items.length && i < length;j++){
    if(freq_data[items[j]._id.toString()] === undefined) {
      let item_copy = trimObject(items[j], ['CategoryName', '_price', '_source']);
      item_copy.preference = 'no';
      training_data.push(item_copy);
      i++;
    }
    }
  //console.log(training_data);
  
    let config = {
      trainingSet: training_data,
      categoryAttr: 'preference',
      maxTrees: 3,
    };
  
  //let dt = new DecisionTree(config);
  //dt.createDecisionTree();
  //console.log(JSON.stringify(dt.root,null, 4));

  let randomForest = new RandomForest(config);
  randomForest.buildForest();

  //for (let t of randomForest.trees)
  //console.log(JSON.stringify(t.root, null, 4));
  

  let documents = [];
  // for each item, find the value for class 'preference'
  // if 'preference = yes' vote is greater than 'preference = no', add it to recommendations for the user
  items.map((item) => {
    let test_item = trimObject(item, ['CategoryName', '_price', '_source']);
    //let res = decisionTree.predict(item);
    //console.log("random forest: "+JSON.stringify(randomForest.predict(item)));
    let prediction = randomForest.predict(test_item);

    if(prediction['yes'] > prediction['no'])
      documents.push(item);
  });

  //console.log(documents);
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

  try {
    // only save at most eight items
    foodItems = foodItems.slice(0,8); 

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
  
  return foodItems;
}

if(process.argv[2])
  createRecommendations(process.argv[2]);

module.exports = createRecommendations;
