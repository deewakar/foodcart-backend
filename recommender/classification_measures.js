const Order = require('../models/Order');
const mongoose = require('mongoose');
require('dotenv').config();

const obtain_recommendations = require('../utils/recommender.js');

const mongoURI = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.c34qtts.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

function trimObject(obj, includeList) {
  let res = {};
  for(let k of includeList)
    res[k] = obj[k];
  return res;
}

async function get_user_items (email) {
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


async function main(email) {
  const conn = await mongoose.connect(mongoURI, {useNewUrlParser: true });
  // pull in all the order for a user and calculate the frequency table
  let freq_data = await get_user_items(email);

  const all_docs = await mongoose.connection.db.collection("food_items");
  const all_items = await all_docs.find({}).toArray();

  // take all orders having frequency >= 2 and save them as 'positive' values
  let test_items = all_items.filter((item) => freq_data[item._id.toString()] >= 2);
  let facts = test_items.map((item) => 'yes');
  
  // take the same number of food_items that are not in the above list as save them as 'negative' values
  const length = test_items.length;
  for(let i=0, j=0; j < all_items.length && i < length;j++){
    if(test_items[all_items[j]._id.toString()] === undefined) {
      test_items.push(all_items[j]);
      facts.push('no');
      i++;
    }
  }


  let recommended_items = await obtain_recommendations(email);
  let recommended_ids = recommended_items.map(item => item._id.toString());

// calculate the values of True Positive, False Positive, False Negative and True Negative
  let tp = 0;
  let fp = 0;
  let fn = 0;
  let tn = 0;
  for(let i = 0; i < test_items.length; i++) {
    if(recommended_items[test_items[i]._id.toString()] !== undefined){
      if(facts[i] == 'yes') tp += 1;
      else if(facts[i] == 'no') fn += 1;

    } else {
      if(facts[i] == 'no') tn += 1;
      else if(facts[i] == 'yes') fp += 1;
    }

  }

  console.log(`tp: ${tp}, fp: ${fp}, fn: ${fn}, tn: ${tn}`);

// calculate the accuracy, precision, recall and f1-score for the decisiontree
  let accuracy = (tp + tn)/(tp + tn + fp + fn);
  let precision = tp / (tp + fp);
  let recall = tp / (tp + tn);
  let f1 = 2 * (precision * recall)/(precision + recall);

  console.log(`Accuracy: ${accuracy} \nPrecision: ${precision} \nRecall: ${recall} \nF1-score: ${f1}`);
}



// construct a random forest for the user and generate a predictions table
// calculate the values of True Positive, False Positive, False Negative and True Negative

// calculate the accuracy, precision, recall and f1-score for the random forest 


main('vikas77@gmail.com');
/*
const facts = [
  const config = {
    trainingSet: dataset,
    categoryAttr: 'preference'
  }

  dt = new DecisionTree(config);
  dt.createDecisionTree();

  */
