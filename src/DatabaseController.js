let MongoClient = require('mongodb').MongoClient;

let url = "mongodb://heroku_44cpq9r3:vjrs67oas5rb5hc0v1im8mven4@ds145009.mlab.com:45009/heroku_44cpq9r3";
let dbName = "heroku_44cpq9r3";
let collectionName = "mailing-list-subscription";

module.exports = {
    storeSubscriptionData: function (firstName, lastName, email, faculty, year) {
        return new Promise(function (resolve, reject) {
            let data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                faculty: faculty,
                year: year
            };

            MongoClient.connect(url,  { useUnifiedTopology: true, useNewUrlParser: true })
                .then(function (client) {
                    client.db(dbName)
                        .collection(collectionName)
                        .insertOne(data)
                        .then(function () {
                            resolve();
                        })
                        .catch(function (err) {
                            console.log(err);
                            reject(err);
                        });
                })
                .catch(function (err) {
                    console.log(err);
                    reject(err);
                });
        });
    }
};
