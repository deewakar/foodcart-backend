const fs = require('fs');
const DecisionTree = require('./DT');
const RandomForest = require('./RF');

function trimObject(obj, includeList) {
  let res = {};
  for(let k of includeList)
    res[k] = obj[k];
  return res;
}
// calculate the accuracy, precision, recall and f1-score given the actual data and the prediction data
function calc_measures(facts, prediction) {
  // calculate the values of True Positive, False Positive, False Negative and True Negative
  let tp = 0;
  let fp = 0;
  let fn = 0;
  let tn = 0;
  for(let i = 0; i < test_data.length; i++) {
    if(facts[i] == 'yes' && prediction[i] === 'yes') tp += 1;
    else if(facts[i] == 'yes' && prediction[i] === 'no') fn += 1;
    else if(facts[i] == 'no' && prediction[i] === 'no') tn += 1;
    else if(facts[i] == 'no' && prediction[i] === 'yes') fp += 1;
  }

// calculate the accuracy, precision, recall and f1-score for the decisiontree
  let accuracy = (tp + tn)/(tp + tn + fp + fn);
  let precision = tp / (tp + fp);
  let recall = tp / (tp + tn);
  let f1 = 2 * (precision * recall)/(precision + recall);

  return {'accuracy': accuracy,
          'precision': precision,
          'recall': recall,
          'f1': f1
         };
}

function testDT(training_data, test_data, categoryAttr, maxDepth) {
  const config = {
    trainingSet: training_data,
    categoryAttr: categoryAttr, 
    maxDepth: maxDepth
  };

  dt = new DecisionTree(config);
  dt.createDecisionTree();

  //console.log(JSON.stringify(dt.root, null, 4));

  let prediction = test_data.map(item => dt.predict(item));
  return prediction;
}

function testRF(training_data, test_data, categoryAttr, maxTrees) {
   const config = {
    trainingSet: training_data,
     categoryAttr: categoryAttr,
     maxTrees: maxTrees,
  };

  rf = new RandomForest(config);
  rf.buildForest();

  //for(let t of rf.trees)
  //  console.log(JSON.stringify(t.root, null, 4));

  let rf_prediction = test_data.map(item => rf.predict(item));
  let prediction = rf_prediction.map(item => item.yes > item.no ? 'yes' : 'no');
  return prediction;
}

function testAll(training_section, test_data, test_func, test_param){

  let totalAccuracy = 0;
  let totalPrecision = 0;
  let totalRecall = 0;
  let totalF1 = 0;
  let measures = null;
  
  // training for identifying 'versicolor' species
  let training_data_versicolor = training_section.map(item => {
    if(item.Species === 'versicolor')
      return {...item, 'Species': 'yes'};
    else
      return {...item, 'Species': 'no'};
  });

  let facts_versicolor = new Array(test_data.length).fill('yes', 10, 20);
  facts_versicolor.fill('no', 0, 10);
  facts_versicolor.fill('no', 20, 30);

  //console.log("facts for versicolor: ", facts_versicolor);
  let prediction_versicolor = test_func(training_data_versicolor, test_data, 'Species', test_param);
  //console.log("predictions for versicolor: ", prediction_versicolor);
  measures = calc_measures(facts_versicolor, prediction_versicolor);
  totalAccuracy += measures.accuracy;
  totalPrecision += measures.precision;
  totalRecall += measures.recall;
  totalF1 += measures.f1;
  console.log("For versicolor");
  console.log(`Accuracy: ${measures.accuracy} \nPrecision: ${measures.precision} \nRecall: ${measures.recall} \nF1-score: ${measures.f1}\n`);


// training for identifying 'virginica' species
  let training_data_virginica = training_section.map(item => {
    if(item.Species === 'virginica')
      return {...item, 'Species': 'yes'};
    else
      return {...item, 'Species': 'no'};
  });
  let facts_virginica = new Array(test_data.length).fill('yes', 20, 30);
  facts_virginica.fill('no', 0, 10);
  facts_virginica.fill('no', 10, 20);

  //console.log("facts for virginica: ", facts_virginica);
  let prediction_virginica = test_func(training_data_virginica, test_data, 'Species', test_param);
  //console.log("predictions for virginica: ", prediction_virginica);
  measures = calc_measures(facts_virginica, prediction_virginica);
  totalAccuracy += measures.accuracy;
  totalPrecision += measures.precision;
  totalRecall += measures.recall;
  totalF1 += measures.f1;

  console.log("For virginica");
  console.log(`Accuracy: ${measures.accuracy} \nPrecision: ${measures.precision} \nRecall: ${measures.recall} \nF1-score: ${measures.f1}\n`);

  // training for identifying 'setosa' species
  let training_data_setosa = training_section.map(item => {
    if(item.Species === 'setosa')
      return {...item, 'Species': 'yes'};
    else
      return {...item, 'Species': 'no'};
  });

  let facts_setosa = new Array(test_data.length).fill('yes', 0, 10);
  facts_setosa.fill('no', 10, 20);
  facts_setosa.fill('no', 20, 30);

  //console.log("facts for setosa: ", facts_setosa);
  let prediction_setosa = test_func(training_data_setosa, test_data, 'Species', test_param);
  //console.log("predictions for setosa: ", prediction_setosa);
  measures = calc_measures(facts_setosa, prediction_setosa);

  totalAccuracy += measures.accuracy;
  totalPrecision += measures.precision;
  totalRecall += measures.recall;
  totalF1 += measures.f1;

  console.log("For setosa");
  console.log(`Accuracy: ${measures.accuracy} \nPrecision: ${measures.precision} \nRecall: ${measures.recall} \nF1-score: ${measures.f1}\n`);


  let avg = {'accuracy': totalAccuracy/3, 'precision': totalPrecision/3, 'recall': totalRecall/3, 'f1': totalF1/3};
  // calculate average of all measures
  console.log(`Avg. Accuracy: ${totalAccuracy/3} \nAvg. Precision: ${totalPrecision/3} \nAvg. Recall: ${totalRecall/3} \nAvg. F1-score: ${totalF1/3}`);
  return avg;
}



function main(email) {


  // load the json file
  const data = require('./iris.json');
  let setosa = data.filter(item => item.Species === "setosa");
  let versicolor = data.filter(item => item.Species === "versicolor");
  let virginica = data.filter(item => item.Species === "virginica");

  let measures = null;

  // There are 50 of each of the species, we'll take 40 from each as training data and the rest as test data
  let training_section = [...setosa.slice(0,40), ...versicolor.slice(0,40), ...virginica.slice(0,40)];
  let testing_section =  [...setosa.slice(40), ...versicolor.slice(40), ...virginica.slice(40)];
  test_data = [];
  testing_section.map(item => {
    test_data.push(trimObject(item, ["SepalLength", "SepalWidth", "PetalLength", "PetalWidth"]));
  });

  
  console.log("Classification measures for ID3 algorithm implementation");
  testAll(training_section, test_data, testDT, 30);


  console.log("Classification measures for Random Forest algorithm implementation");
  let tree_nums = [3, 5, 7, 10, 13, 17, 20, 30, 50, 70, 100];
  let rf_res = [];

  for(let x of tree_nums){
    obj = testAll(training_section, test_data, testRF, x);
    obj.maxTrees = x;
    rf_res.push(obj);
  }

  fs.writeFile("graph.json", JSON.stringify(rf_res), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing to graph.json File.");
      return console.log(err);
    }
  });

  
}

main();
