const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51KZkqRJEK8PYFT8TdUX7r4BYuKqALGShwTnqDh8Y29UkXG1FHCISbV0Ja99S27rPPSRVzoqroBMWOjtj3OqUdR4400VyhZMDO6');
//CHANGE
const app = express();




// Setup app dependencies

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment total: ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, 
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
exports.api = functions.https.onRequest(app);

var admin = require("firebase-admin");

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clone-cd832-default-rtdb.firebaseio.com"
});


const db = admin.firestore();

//use app to create route with request (req) and response (res)
// Basic test route
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World! and better');
});

app.get('/',  (req, res) => {
  return res.status(200).send('Welcome to the Fennel API system! Your options are /api/create, /api/read/:id, /api/read, /api/read, /api/update/:id, and /api/delete/:id!');
});

// Create
app.post('/api/create', (req, res) => {
  (async () => {
      try {
          await db.collection('Products').doc('/' + req.body.id + '/')
              .create({
                  title: req.body.name,
                  descr: req.body.descr,
                  manufacturingPrice: req.body.manufacturingPrice,
                  manufacturer: req.body.manufacturer,
                  price: req.body.price,
                  category: req.body.category,
                  rating: req.body.rating,
                  image: req.body.image,
                 
              })

          return res.status(200).send();
      }
      catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});


// Read item
app.get('/api/read/:id', (req, res) => {
  (async () => 
  {
      try 
      {
          const document = db.collection('Products').doc(req.params.id); 
          let product = await document.get();
          const selectedItem = {
            id: product.id,
            title: product.data().title,
            descr: product.data().descr,
            manufacturer: product.data().manufacturer,
            manufacturingPrice: product.data().manufacturingPrice,
            price: product.data().price,
            category: product.data().category,
            rating: product.data().rating,
            image: product.data().image
        };
          let response = selectedItem;
          return res.status(200).send(response);
      }
      catch (error) 
      {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

// Get if profit high or low
app.get('/api/profit/:id', (req, res) => {
  (async () => 
  {
      try 
      {
          const document = db.collection('Products').doc(req.params.id); 
          let product = await document.get();
          const selectedItem = {
            id: product.id,
            title: product.data().title,
            descr: product.data().descr,
            manufacturer: product.data().manufacturer,
            manufacturingPrice: product.data().manufacturingPrice,
            price: product.data().price,
            category: product.data().category,
            rating: product.data().rating,
            image: product.data().image
        };
          
          const profit = ((req.body.manufacturingPrice/req.body.price)*100);
          
          if (profit >= 80) {
            return res.status(200).send('Regular Price!');
          } else {
            return res.status(200).send('Low Profit!');
          }


      }
      catch (error) 
      {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});


// Read all
app.get('/api/read', (req, res) => {
  (async () => {
      try {
          let query = db.collection('Products');
          let response = [];
          await query.get().then(querySnapshot => {
              let docs = querySnapshot.docs; //the result of our query
              for (let doc of docs) { //add each doc to our JSON response
                  const selectedItem = {
                      id: doc.id,
                      title: doc.data().title,
                      descr: doc.data().descr,
                      manufacturer: doc.data().manufacturer,
                      manufacturingPrice: doc.data().manufacturingPrice,
                      price: doc.data().price,
                      category: doc.data().category,
                      rating: doc.data().rating,
                      image: doc.data().image
                  };
                  response.push(selectedItem);
              }
              return response; //each then should return a value
          });
          return res.status(200).send(response); //end of async function should return a value
      }
      catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});


// Update
app.put('/api/update/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Products').doc(req.params.id);
          await document.update({
            id: doc.id,
            title: doc.data().title,
            descr: doc.data().descr,
            manufacturer: doc.data().manufacturer,
            manufacturingPrice: doc.data().manufacturingPrice,
            price: doc.data().price,
            category: doc.data().category,
            rating: doc.data().rating,
            image: doc.data().image
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});


// Delete
app.get('/api/delete/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Products').doc(req.params.id);
          await document.delete();
          return res.status(200).send('Product with the ID ' + req.params.id + ' has been deleted!' );
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })(); 
});

//Expose our CRUD app as a single Cloud Function
exports.app = functions.https.onRequest(app);


