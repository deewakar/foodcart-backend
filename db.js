const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.c34qtts.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const mongoDB = async () => {
  mongoose.connect(mongoURI,{useNewUrlParser: true }).then(
    async () => {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection("meal_items");
      fetched_data.find({}).toArray(async (err, data) => {
        if(err) console.log(err);
        else {
          const fetched_categories = await mongoose.connection.db.collection("foodCategory");
          fetched_categories.find({}).toArray((err, cdata) => {
            if (err) console.log(err)
            else {
              global.all_items = data;
              global.categories = cdata; 
            }
          });
        }
      })

    },
    err => {console.log("Error: ", err);}
  );
};

module.exports = mongoDB;
