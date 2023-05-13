const {DecisionTree, RandomForest} = require("./decision-tree");
const DTree = require('decision-tree');

// Training set
var data = [
  {
  "CategoryName": "Pizza",
  "name": "Margherita Pizza",
  "options": [
    {
      "regular": "150",
      "medium": "250",
      "large": "350"
    }
  ],
  "preference": true,
  "description": "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil leaves."
},
            {
              "CategoryName": "Burger",
              "name": "Cheeseburger",
              "options": [
                {
                  "single": "150",
                  "double": "200"
                }
              ],
              "preference": true,
              "description": "Classic cheeseburger with melted cheddar cheese, lettuce, tomato, and pickles."
            },
            {
              "CategoryName": "Salad",
              "name": "Caesar Salad",
              "options": [
                {
                  "regular": "120",
                  "large": "180"
                }
              ],
              "preference": false,
              "description": "Fresh romaine lettuce, parmesan cheese, croutons, and Caesar dressing."
            },
            {
              "CategoryName": "Sandwich",
              "name": "Grilled Cheese Sandwich",
              "options": [
                {
                  "regular": "100",
                  "toasted": "120"
                }
              ],
              "preference": true,
              "description": "Classic grilled cheese sandwich with melted cheese between crispy toasted bread slices."
            },
            {
              "CategoryName": "Dessert",
              "name": "Chocolate Brownie",
              "options": [
                {
                  "regular": "80",
                  "with ice cream": "120"
                }
              ],
              "preference": true,
              "description": "Rich and fudgy chocolate brownie served with a scoop of vanilla ice cream."
            },
            {
              "CategoryName": "Pasta",
              "name": "Spaghetti Bolognese",
              "options": [
                {
                  "regular": "140",
                  "large": "200"
                }
              ],
              "preference": false,
              "description": "Classic spaghetti pasta with meaty Bolognese sauce and grated parmesan cheese."
            },
            {
              "CategoryName": "Soup",
              "name": "Tomato Soup",
              "options": [
                {
                  "regular": "90",
                  "large": "140"
                }
              ],
              "preference": true,
              "description": "Hot and tangy tomato soup with a hint of herbs and spices."
            },
            {
              "CategoryName": "Breakfast",
              "name": "Egg Omelette",
              "options": [
                {
                  "plain": "60",
                  "with veggies": "80",
                  "with cheese": "100"
                }
              ],
              "preference": false,
              "description": "Fluffy omelette made with farm-fresh eggs, cooked to perfection."
            },
            {
              "CategoryName": "Biryani/Rice",
              "name": "Veg Biryani",
              "options": [
                {
                  "regular": "150",
                  "large": "250"
                }
              ],
              "preference": true,
              "description": "Flavorful rice dish cooked with a mix of aromatic spices and vegetables."
            },
            {
              "CategoryName": "Pizza",
              "name": "Pepperoni Pizza",
              "options": [
                {
                  "regular": "180",
                  "medium": "280",
                  "large": "380"
                }
              ],
              "preference": true,
              "description": "Classic pizza topped with delicious pepperoni slices and melted cheese."
            },
            {
              "CategoryName": "Burger",
              "name": "Veggie Burger",
              "options": [
                {
                  "single": "120",
                  "double": "180"
                }
              ],
              "preference": true,
              "description": "Delicious veggie patty burger with lettuce, tomato, and special sauce."
            },
            {
              "CategoryName": "Salad",
              "name": "Greek Salad",
              "options": [
                {
                  "regular": "130",
                  "large": "200"
                }
              ],
              "preference": false,
              "description": "Refreshing salad with cucumbers, tomatoes, olives, feta cheese, and Greek dressing."
            },
            {
              "CategoryName": "Sandwich",
              "name": "Club Sandwich",
              "options": [
                {
                  "regular": "140",
                  "toasted": "160"
                }
              ],
              "preference": true,
              "description": "Triple-layered sandwich with turkey, bacon, lettuce, tomato, and mayonnaise."
            },
            {
              "CategoryName": "Dessert",
              "name": "Strawberry Cheesecake",
              "options": [
                {
                  "slice": "120",
                  "whole": "500"
                }
              ],
              "preference": true,
              "description": "Creamy cheesecake with a sweet strawberry topping and a buttery graham cracker crust."
            },
            {
              "CategoryName": "Pasta",
              "name": "Penne Alfredo",
              "options": [
                {
                  "regular": "130",
                  "large": "200"
                }
              ],
              "preference": false,
              "description": "Pasta dish with penne noodles tossed in a creamy Alfredo sauce and sprinkled with parmesan cheese."
            },
            {
              "CategoryName": "Soup",
              "name": "Chicken Noodle Soup",
              "options": [
                {
                  "regular": "100",
                  "large": "150"
                }
              ],
              "preference": true,
              "description": "Comforting soup with tender chicken, noodles, vegetables, and flavorful broth."
            },
            {
              "CategoryName": "Breakfast",
              "name": "Pancakes",
              "options": [
                {
                  "plain": "80",
                  "with berries": "100",
                  "with maple syrup": "120"
                }
              ],
              "preference": false,
              "description": "Fluffy pancakes served with butter and a choice of toppings."
            },
            {
              "CategoryName": "Biryani/Rice",
              "name": "Shrimp Biryani",
              "options": [
                {
                  "regular": "180",
                  "large": "280"
                }
              ],
              "preference": true,
              "description": "Flavorful rice dish cooked with aromatic spices and succulent shrimp."
            },
            {
              "CategoryName": "Pizza",
              "name": "Hawaiian Pizza",
              "options": [
                {
                  "regular": "160",
                  "medium": "260",
                  "large": "360"
                }
              ],
              "preference": true,
              "description": "Pizza topped with ham, pineapple chunks, and melted cheese for a sweet and savory combination."
            },
            {
              "CategoryName": "Burger",
              "name": "Mushroom Swiss Burger",
              "options": [
                {
                  "single": "140",
                  "double": "200"
                }
              ],
              "preference": true,
              "description": "Juicy beef patty topped with sautéed mushrooms, Swiss cheese, lettuce, and mayo."
            },
            {
              "CategoryName": "Salad",
              "name": "Cobb Salad",
              "options": [
                {
                  "regular": "150",
                  "large": "220"
                }
              ],
              "preference": false,
              "description": "Hearty salad with grilled chicken, bacon, avocado, hard-boiled eggs, tomatoes, and blue cheese crumbles."
            },
            {
              "CategoryName": "Sandwich",
              "name": "Tuna Salad Sandwich",
              "options": [
                {
                  "regular": "110",
                  "toasted": "130"
                }
              ],
              "preference": true,
              "description": "Delicious sandwich filled with tuna salad, lettuce, tomato, and pickles."
            },
            {
              "CategoryName": "Dessert",
              "name": "Apple Pie",
              "options": [
                {
                  "slice": "100",
                  "whole": "400"
                }
              ],
              "preference": true,
              "description": "Classic apple pie with a flaky crust and warm cinnamon-spiced apple filling."
            },
            {
              "CategoryName": "Pasta",
              "name": "Lemon Garlic Shrimp Pasta",
              "options": [
                {
                  "regular": "160",
                  "large": "240"
                }
              ],
              "preference": false,
              "description": "Pasta dish with tender shrimp, lemon-garlic sauce, and a sprinkle of parmesan cheese."
            },
            {
              "CategoryName": "Soup",
              "name": "Butternut Squash Soup",
              "options": [
                {
                  "regular": "110",
                  "large": "160"
                }
              ],
              "preference": true,
              "description": "Creamy soup made with roasted butternut squash, spices, and a touch of cream."
            },
            {
              "CategoryName": "Breakfast",
              "name": "French Toast",
              "options": [
                {
                  "plain": "90",
                  "with berries": "110",
                  "with maple syrup": "130"
                }
              ],
              "preference": false,
              "description": "Thick slices of bread soaked in a mixture of eggs and milk, cooked until golden brown, and served with butter and syrup."
            }
           ];


const test_data =  [
  {
    "CategoryName": "Biryani/Rice",
    "name": "Chicken Biryani",
    "img": "https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg",
    "options": [
      {
        "half": "170",
        "full": "300"
      }
    ],
    "preference": false,
    "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
    "CategoryName": "Biryani/Rice",
    "name": "Veg Biryani",
    "img": "https://media.istockphoto.com/photos/veg-biryani-picture-id1363306527?b=1&k=20&m=1363306527&s=170667a&w=0&h=VCbro7CX8nq2kruynWOCO2GbMGCea2dDJy6O6ebCKD0=",
    "options": [
      {
        "half": "150",
        "full": "260"
      }
    ],
    "preference": true,
    "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
    "CategoryName": "Biryani/Rice",
    "name": "Chicken Fried Rice",
    "img": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "options": [
      {
        "half": "130",
        "full": "220"
      }
    ],
    
    "preference": false,
    "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
  },
  {
    "CategoryName": "Pizza",
    "name": "Mix Veg Pizza",
    "img": "https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=",
    "options": [
      {
        "regular": "100",
        "medium": "200",
        "large": "300"
      }
    ],
    "preference": true,
    "description": "This Hot cheesy pizza is made with the combination of delicious vegetables like broccoli, onion, capsicum, carrot, mushroom and cauliflower."
  }
];

// Configuration
var config = {
  trainingSet: data, 
  categoryAttr: 'preference',
  ignoredAttributes: []
};

// Building Decision Tree
var decisionTree = new DecisionTree(config);

var dt = new DTree("preference", ["name", "CategoryName", "options"]);
dt.train(data);

// Building Random Forest
var numberOfTrees = 3;
var randomForest = new RandomForest(config, numberOfTrees);

// Testing Decision Tree and Random Forest
var item1 = {name: 'Chicken Salad', CategoryName: "Salad",
             options: [
               {
                 "half": "150",
                 "full": "290"
               }],
    description: "This family favorite chicken salad is made with celery, bell pepper, green olives, apple, lettuce, and mayo."

            }

var item2 = {name: 'Square Pizza', CategoryName: "Pizza",
             options: [
               {
                 "half": "350",
                 "full": "650"
               }],
    description: "Rectangular pizza topped with brick cheese, pepperoni, and red sauce, and a lacy, crispy cheese crust all the way around the edges."

            }

console.log("Decision Tree Prediction: "+ decisionTree.predict(item1));
console.log("Decision Tree Prediction: "+ decisionTree.predict(item2));

console.log("DTree Prediction: "+ dt.predict(item1));
console.log("DTree Prediction: "+ dt.predict(item2));


//console.log("accuracy: " + dt.evaluate(test_data));

console.log("Random Forest Prediction: "+ JSON.stringify(randomForest.predict(item1)));
console.log("Random Forest Prediction: "+ JSON.stringify(randomForest.predict(item2)));
