const mongoose = require("mongoose");
const persons = require("./index.js");
// https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-13-3-14
/* 
Change the fetching of all phonebook entries so that the data is fetched from the database.

Verify that the frontend works after the changes have been made.
*/
console.log("ARGV: ", process.argv);

// if (process.argv.length < 3) {
//   console.log(
//     "give password as first argument / Name-of-contact / number-of-contact" // \n 5 arguments in total, [4] indexes
//   );
//   process.exit(1);
// }

// ----- argument values -----
const password = process.argv[2]; // the first argument in cli after "node mongo.js ..here.."
const nameContact = process.argv[3];
const numberContact = process.argv[4];

// ----- URL String -----
const url_string = `mongodb://informaticpc07_db_user:${password}@ac-dkgb2no-shard-00-00.mpqrvw6.mongodb.net:27017,ac-dkgb2no-shard-00-01.mpqrvw6.mongodb.net:27017,ac-dkgb2no-shard-00-02.mpqrvw6.mongodb.net:27017/contacts?ssl=true&replicaSet=atlas-mrs4mx-shard-0&authSource=admin&appName=Cluster0`;

// ----- Connect to DB -----
mongoose.set("strictQuery", false);
mongoose.connect(url_string, { family: 4 });

// ----- Create Schema -----
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema); // MongoDB will change 'Contact' --> 'contacts'

// ----- Create New Contact from CLI -----

const newContact = new Contact({
  name: nameContact,
  number: numberContact,
});

// ----- Save New Contact to DB -----
if (!nameContact || !numberContact) {
  console.log("No contact added");
} else {
  newContact.save().then((result) => {
    console.log("new contact saved!");
    console.log(`Added ${result.name} number: ${result.number} to phonebook`);
  });
}
// ----- Delete empty Contacts from DB -----
// Contact.deleteOne({ name: undefined }).then((contact) => {
//   console.log("empty contact deleted-->", contact);
// }); //<-- it workd if you don't close() the connection in code... dunno which one is the workflow, seems that delete method is the one that takes longer to execute and I close the connection before deletion is over, so where should I put the close()method to be execute at the end of everything?***
// ----- Fetch previous Contacts from DB -----

Contact.find({})
  .then((persons) => {
    console.log("PHONEBOOK:⬇️");
    // persons.forEach((contact) => {
    //   console.log(contact);
    // });
    console.log(persons);
  })
  .finally((res, err) => {
    if (err) {
      console.log("SHOW ERR: ", err);
    }
    mongoose.connection.close();
  }); // <-- If I don't do the finally method, I get error that connection is finished before finishing to fetch all the contacts. Even placing the **mongoose.connection.close()** inside **.then(){...here}** method. :/
