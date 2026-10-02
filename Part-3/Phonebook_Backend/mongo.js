const mongoose = require("mongoose");
const persons = require("./index.js");
// Exercise 3.12. https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercise-3-12
/* 
Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

NB: Do not include the password in the file that you commit and push to GitHub!

The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:
`node mongo.js yourpassword Anna 040-1234556`

As a result, the application will print:
`added Anna number 040-1234556 to phonebook`

Then the program should display all of the entries in the phonebook:
```
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
```
* CHECK THE REST OF THE DETAIL IN THE COURSE...
*/
console.log("ARGV: ", process.argv);

if (process.argv.length < 3) {
  console.log(
    "give password as first argument / Name-of-contact / number-of-contact" // \n 5 arguments in total, [4] indexes
  );
  process.exit(1);
}
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

const Contact = mongoose.model("Contact", contactSchema); // MongoDB will change 'Contact' --> 'Contacs'

// ----- Create New Contact from CLI -----

const newContact = new Contact({
  name: nameContact,
  number: numberContact,
});

// ----- Save New Contact to DB -----
newContact.save().then((result) => {
  console.log("new contact saved!");
  console.log(`Added ${result.name} number: ${result.number} to phonebook`);
  mongoose.connection.close();
});

// ----- Fetch previous Contacts from ... -----
