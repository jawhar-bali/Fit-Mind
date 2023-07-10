const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Gym,validate} = require('../models/gym');
const Subscription = require('../models/subscription');
const Offer = require('../models/offer');
const upload = require('../config/multerConfig');
const path = require('path');
const { default: Stripe } = require('stripe');
const Joi = require("joi");


const twilio = require('twilio');






const stripe = require('stripe')('sk_test_51MqwXKLtZDUJknUFE722lacEc8I0b1kyH9OJyfQOIqDbnlX143oZCABQXWMheTwAaKptkpaXOxyTWzJzXAN72EHj00B8ej4W5b');




router.post("/stripe/:idg/:idu/:ido",async(req,res)=>{
	const {idg,idu,ido}=req.params;
	let {amount , id}=req.body;
	try{
		const Payment=await stripe.paymentIntents.create({
			amount:amount,
			currency: 'EUR',
			description: 'Monthly subscription for access to our gym facilities',
			payment_method:id,
			confirm:true,
		});

		// Find the user's active subscriptions for that gym in order to avoid a double subscription
		const activeSubscriptions = await Subscription.find({
			user: idu,
			gym: idg,
			status: "active"
		});
		if (activeSubscriptions.length > 0) {
			return res.status(400).json({ message: "You already have an active subscription for this gym" });
		}

		const startDate=new Date();
		const endDate = new Date();
		endDate.setMonth(endDate.getMonth() + 1);
		const newSubscription = new Subscription({
			user:idu, // Assuming you are using passport and req.user contains the user object
			gym: idg,
			offer:ido,
			startDate: startDate,
			endDate: endDate,
			// stripeSubscriptionId: subscription.id,
		  });


		  const gyms1 = await Gym.findById(idg);
		  gyms1.participant = await gyms1.participant + 1;
		  gyms1.save();
		  console.log(gyms1.participant);

		await newSubscription.save();

		
		const phoneNumber = '+21628499722';
	
		const accountSid = 'AC9b7d1f01a2a2393e47097587ca0a19e7';
		const authToken = 'b4e950019e5d1ef9a0d6a17cf85798a6';
		const client = new twilio(accountSid, authToken);
		const message = `Thank you for subscribing to our gym. Your subscription is now active`;
    	await client.messages.create({ body: message, from: '+16232788531', to: phoneNumber });


		res.json({
			message:"Payment success ",
			success:true,
		})
	}catch(error){
		console.log("error...",error);
		res.json({
			message:"Payment failed ",
			success:false,
		})
	}
});



// Initialize Multer with desired configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   });
  
//   const upload = multer({ storage: storage }).array('photo',5);

  // Handle file upload request
// router.post('/upload',upload.array('photo', 5), function(req, res) {
//     res.send('File uploaded successfully');
// });
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));


//add new gym
router.post("/add/:idu", upload.array('photo', 5), async (req, res) => {
	try {
		const {idu} = req.params ;
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let gymExist = await Gym.findOne({ name: req.body.name });
		if (gymExist)
			return res
				.status(409)
				.send({ message: "Gym already Exist!" });
        const gym=new Gym({
            name: req.body.name,
            description: req.body.description,
            services: req.body.services,
            photo: req.files.map(file =>file.filename),
            localisation: req.body.localisation,
			user : idu

        });

		await gym.save();
		res.status(201)
			.send({ message: "Gym added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


//getAll
router.get("/getAll", async (req, res) => {
    try {
      const gyms = await Gym.find();
      res.status(200).send(gyms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


//getById
router.get("/:id",async (req, res) => {
	try {
		const data=await Gym.findById(req.params.id);
		res.json(data);
		//res.status(200).send(data);
	} catch (err) {
		res.send(err)
	}
});


//find by localisation

  router.get("/findbyloc/:localisation", async (req, res) => {
	const localisation = req.params.localisation;
	const filteredGyms = await Gym.find({ localisation: localisation }).exec();
	res.json(filteredGyms);
  });

  


/*find by name
 router.get("/findbyName/:name", async (req, res) => {
	const name = req.params.name;
	const filteredGyms = await Gym.find({ name: name }).exec();
	res.json(filteredGyms);
  });*/

 /* //find by service
  router.get("/findbyService/:services", async (req, res) => {
	const services = req.params.services;
	const filteredGyms = await Gym.find({ services: services }).exec();
	res.json(filteredGyms);
  });*/

//delete

router.delete("/:id", async (req, res) => {
	try {
	  const gym = await Gym.findById(req.params.id);
	  if (!gym)
		return res.status(404).send({ message: "Gym not found" });
  
	  await gym.remove();
  
	  res.status(200).send({ message: "Gym deleted successfully" });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  }); 




  
// update
router.put("/update/:id", upload.array('photo', 5),async (req,res)=>{
	
	try{
		const { error } = validate(req.body);
	
		if (error)
			return res.status(400).send({ message: error.details[0].message });
			
		const updatedFields = {
			name: req.body.name,
			description: req.body.description,
			services: req.body.services,
			photo: req.files.map(file =>file.filename),
			localisation: req.body.localisation,
		};	
		await Gym.findByIdAndUpdate(req.params.id,updatedFields,{new:true});
		res.status(201).send("updated successfully");

	}catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});



// Route to update gym rating
// router.put('/rating/:id', async (req, res) => {
// 	try {
//         const {rating}=req.body;
// 		await Gym.findByIdAndUpdate(req.params.id,{rating},{new:true});
// 	  // Return the updated gym object
// 	    res.status(201).send("rated successfully");

// 	} catch (err) {
// 	  console.error(err.message);
// 	  res.status(500).send('Server Error');
// 	}
// });

router.put('/rating/:id/:idu', async (req, res) => {
	try {
	  const { rating } = req.body;
	  const userId=req.params.idu;

	 

	  const gym = await Gym.findById(req.params.id);
	  if (gym.ratedBy.includes(userId)) {
		// The user has already rated this gym
		return res.status(400).json({ message: 'You have already rated this gym' });
	  }
  
	  const updatedGym = await Gym.findByIdAndUpdate(req.params.id,{$push:{ ratings:req.body.rating },$addToSet: { ratedBy: userId}}, { new: true });
  
	  // Calculate the average rating
	  const ratings = updatedGym.ratings;
	  const avgRating = Math.round((ratings.reduce((acc, cur) => acc + cur, 0) + rating) / (ratings.length + 1));
  
	  // Update the average rating of the gym
	  updatedGym.rating = avgRating;
	  await updatedGym.save();
  
	  res.send("rated successfully");
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: 'Server Error' });
	}
  });





//add an offer and associate it to a gym
router.post('/:gymId/offers', async (req, res) => {
	const { name, type, price } = req.body;
	const gymId = req.params.gymId;
  
	try {
	  // Validate offer details
	  if (!name || !type || !price) {
		return res.status(400).json({ error: 'Please provide name, type, and price for the offer' });
	  }
	  const createdAt=new Date();
	  const updatedAt = new Date();
  
	  // Create new offer object
	  const offer = new Offer({
		name:name,
		type:type,
		price:price,
		gym:gymId,
		createdAt:createdAt,
		updatedAt:updatedAt,

	  });
  
	  // Associate the offer with the gym
	  const updatedGym = await Gym.findByIdAndUpdate(gymId, { $push: { offers: offer } }, { new: true });
  
	  if (!updatedGym) {
		return res.status(404).json({ error: 'Gym not found' });
	  }
  
	  offer.save();
	  res.json({ offer });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
});


// GET gym offer by ID
router.get('/:gymId/offer/:offerId', async (req, res) => {
	try {
	  const { gymId, offerId } = req.params;
	  const gym = await Gym.findById(gymId);
	  if (!gym) {
		return res.status(404).json({ error: 'Gym not found' });
	  }
	  const offer = gym.offers.find(offer => offer._id.toString() === offerId);
	  if (!offer) {
		return res.status(404).json({ error: 'Offer not found' });
	  }
	  res.json(offer);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server error');
	}
  });

  //get offer by its id
  router.get('/offers/:id', async (req, res) => {
	try {
	  const offer = await Offer.findById(req.params.id);
	  if (!offer) {
		return res.status(404).json({ message: 'Offer not found' });
	  }
	  res.json(offer);
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Server Error');
	}
});


//get offer by id Gym
router.get('/getOffersByGym/:id', async (req, res) => {
	try {
	  const offer = await Offer.find({gym:req.params.id});
	  if (!offer) {
		return res.status(404).json({ message: 'There is no offer' });
	  }
	  res.json(offer);
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Server Error');
	}
});



  
router.get('/rating/r',async (req,res) => {
	try{
	const gym = await Gym.findOne().sort('-rating').limit(1); 
	res.json(gym) ;

	}
	catch(err){
console.error(err) ;
res.status(500).send('Server Error');
	}
  } 
) ;



router.get('/getGymsByManager/:id', async (req, res) => {
    try {
      const gym = await Gym.find({user:req.params.id});
      res.status(200).send(gym);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});



router.get('/subscription/getByUser/:id', async (req, res) => {
    try {
      const subscriptions = await Subscription.find({user:req.params.id}).populate('gym').populate('offer');
      res.status(200).send(subscriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});





router.get('/sort/:sortOrder', async (req, res) => {
	const sortOrder = req.params.sortOrder;
	const gyms = await Gym.find();
	let sortedGyms;
  
	switch (sortOrder) {
	  case 'highest-rated':
		sortedGyms = gyms.sort((a, b) => b.rating - a.rating);
		break;
	  case 'lowest-rated':
		sortedGyms = gyms.sort((a, b) => a.rating - b.rating);
		break;
	  default:
		sortedGyms = gyms;
		break;
	}
  
	res.json(sortedGyms);
  });


  // Filter gyms by rating
router.get('/filter/:rating', async (req, res) => {
	const rating = req.params.rating;
	const gyms = await Gym.find({ rating: { $gte: rating } });
	res.json(gyms);
  });




router.get('/search/:name', async (req, res) => {
	const { name } = req.params;
  
	try {
	  const gyms = await Gym.find({ name: { $regex: new RegExp(name, 'i') } });
	  res.json(gyms);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server error');
	}
});




router.get('/searchBy/:searchBy/:term', async (req, res) => {
	const { searchBy,term } = req.params;
  
	try {
		if (searchBy === 'name') {
			const gyms = await Gym.find({ name: { $regex: new RegExp(term, 'i') } });
			res.json(gyms);

		}
		if (searchBy === 'localisation') {
			const gyms = await Gym.find({ localisation: { $regex: new RegExp(term, 'i') } });
			res.json(gyms);

		}
	 
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server error');
	}
});

router.get('/gym-performance/:id',async (req, res) => {

	const gym = await Gym.findById(req.params.id);

  const creationDate = await gym.date ; 
  const today = await new Date();

  const numberOfParticipants = await gym.participant; 
  
  const daysSinceCreation = await Math.round((today - creationDate) / (1000 * 60 * 60 * 24)); 

  //let performance;
  if ( daysSinceCreation > numberOfParticipants ) {
    gym.performance = 'bad';
	gym.days = daysSinceCreation;
	gym.save();
  } else if ( daysSinceCreation === numberOfParticipants ) {
    gym.performance = 'normal';
	gym.days = daysSinceCreation;
	gym.save();
  } else {
    gym.performance = 'good'; 
	gym.days = daysSinceCreation;
	gym.save();
  }


  console.log(creationDate)
  console.log(gym.performance)
  res.json({
    performance,
    creationDate,
    today,
    numberOfParticipants,
	daysSinceCreation,
	
  });
});

  
// router.get('/recommend/:loc/:ser/:rat', async (req, res) => {
// 	const { loc,ser,rat } = req.params;
  
// 	try {
		
// 			const gyms = await Gym.find(
// 				{
// 					 localisation: { $regex: new RegExp(loc, 'i') },
// 					 services: { $regex: new RegExp(ser, 'i') },
// 					 rating: { $gte: rat }
// 				 }
// 			);
// 			res.json(gyms);
		
	 
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send('Server error');
// 	}
// });





// Define route for gym recommendations
router.get('/recommend/:loc/:ser/:rat', async (req, res) => {
	const { loc, ser, rat } = req.params;
  
	try {
	  // Query the gyms data from the database
	  const gyms = await Gym.find();
  
	  // Preprocess the data using the user input
	  const gymData = preprocessGyms(gyms, loc, ser, rat);
  
	  // Build and train a recommendation model using the preprocessed data
	  // Content-based filtering example:
	  const cbModel = new ContentBasedFiltering();
	  cbModel.fit(gymData);
  
	  // Generate recommendations for the user based on their input
	  const recommendations = cbModel.predict();
  
	  // Send the recommendations back to the client-side
	  res.json(recommendations);
	} catch (error) {
	  console.error(error.message);
	  res.status(500).send('Server error');
	}
  });
  
  // Define function to preprocess gym data
  function preprocessGyms(gyms, userLocation, userService, userRating) {
	// Filter gyms by location
	gyms = gyms.filter(gym => gym.localisation === userLocation);
  
	// Filter gyms by services
	gyms = gyms.filter(gym => gym.services.includes(userService));
  
	// Filter gyms by rating
	gyms = gyms.filter(gym => gym.rating >= userRating);
  
	// Transform gyms into a suitable format for modeling
	const gymData = gyms.map(gym => ({
	  name: gym.name,
	  services: gym.services.join(','),
	  rating: gym.rating
	}));
  
	return gymData;
  }
  
  class ContentBasedFiltering {
	constructor() {
	  this.gymData = [];
	  this.recommendations = {};
	}
  
	// Fit the recommendation model using the preprocessed data
	fit(gymData) {
	  this.gymData = gymData;
	}
  
	// Generate recommendations for the user based on their input
	predict() {
	  // Extract the user input
	  const userInput = {
		localisation:req.params.loc.split(' '),
		services: req.params.ser.split(','),
		rating: parseInt(req.params.rat)
	  };
  
	  // Compute the similarity scores between each gym and the user input
	  const similarityScores = {};
	  this.gymData.forEach(gym => {
		let score = 0;
		let weight = 0;
		Object.keys(userInput).forEach(key => {
		  if (gym[key]) {
			score += gym[key] * userInput[key];
			weight += userInput[key];
		  }
		});
		similarityScores[gym.name] = weight > 0 ? score / weight : 0;
	  });
  
	  //Sort the gyms by their similarity scores
  
	  // Sort the gyms by their similarity scores
	  const sortedGyms = Object.keys(similarityScores)
		.sort((a, b) => similarityScores[b] - similarityScores[a])
		.slice(0, 10);
  
	  // Create a dictionary of recommendations
	  sortedGyms.forEach(gymName => {
		const gym = this.gymData.find(gym => gym.name === gymName);
		if (gym) {
		  this.recommendations[gymName] = gym;
		}
	  });
  
	  return this.recommendations;
	}
  }



router.get('/popular/pop', async (req, res) => {
	try {
	  const gyms = await Gym.find().sort('-visits').limit(3);
  
	  res.json(gyms);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server error');
	}
  });
  
  



  
  // Preprocess the user input
  const preprocess = (text) => {
	// Convert the text to lowercase
	text = text.toLowerCase();
  
	// Remove punctuation marks and numbers //.replace(/\d+/g, '') for numbers
	text = text.replace(/[^\w\s]/gi, '');
	
  
	// Remove stop words
	const stopWords = ['the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is', 'are', 'am'];
	text = text.split(' ').filter((word) => !stopWords.includes(word)).join(' ');
  
	
	return text;
  };
  // Extract named entities and key phrases from the preprocessed text
  const extractEntitiesAndPhrases = (preprocessedText) => {
	// Define regular expressions to match gym services, locations, and ratings
	const serviceRegex = /(musculation|natation|cardio|yoga|pilates|spinning|crossfit|weightlifting|zumbie|dance|salsa|body-building|coaching)/g;
	const locationRegex = /(bardo|tunis|ariana|manouba|ben arous|bizerte|nabeul|beja|siliana|gasserine|jendouba|kef|kairaouen|sidi bouzid|sfax|gafsa|mednine|tataouin|jerba|tozeur|ben guerdan|sousse|monastir|mahdia|mourouj|megrine)/g;
	const ratingRegex = /\d+(\.\d+)?/g;

  
	// Match the regular expressions against the preprocessed text
	const services = preprocessedText.match(serviceRegex) || [];
	const location = preprocessedText.match(locationRegex) || [];
	const ratingMatch = preprocessedText.match(ratingRegex);
	const rating = ratingMatch ? parseFloat(ratingMatch[0]) : null;
  
	return { services, location, rating };
  };
  
  
  

  const recommendGyms = async (services, locations, rating) => {
	// Create a regular expression for the services and locations
	const servicesRegex = new RegExp(services.join('|'), 'i');
	const locationsRegex = new RegExp(locations.join('|'), 'i');
  
	// Define the query conditions
	const conditions = [
	  { localisation: { $regex: locationsRegex } },
	  { services: { $regex: servicesRegex } },
	];
  
	// Add the rating condition if a rating was specified
	if (rating !== null) {
	  conditions.push({ rating: { $gte: rating } });
	}
  
	// Search for gyms that match the query
	const gyms = await Gym.find({ $and: conditions }).sort({ rating: -1 });

	// Create a message based on the search criteria
	let message = `Recommended gyms for services: ${services.join(', ')}, locations: ${locations.join(', ')}`;
	if (rating !== null) {
	  message += `, and rating >= ${rating}`;
	}
	
  
	// Return the recommended gyms
	return {message,gyms};
  };
  
  
  
  // Create an endpoint for gym recommendation
  router.post('/recommendation', async (req, res) => {
	try {
	  // Get the user input from the request body
	  const { text } = req.body;
  
	  // Preprocess the input
	  const preprocessedText = preprocess(text);
  

		// Extract services and location from the user input
		const { services, location,rating } = extractEntitiesAndPhrases (preprocessedText);

		// Recommend gyms based on the services and location
		const recommendedGyms = await recommendGyms(services, location,rating);


		// recommendedGyms.gyms.forEach(gym => gym.recommend++);


		// Return the recommended gyms as a response
		res.json(recommendedGyms);
			} catch (err) {
			console.error(err);
			res.status(500).send(err.message);
			}
  });
  
///////////////////////////////////////////////////////////////////


// Train the NLP model
// manager.addDocument('en', 'I\'m looking for a gym with a musculation and natation near Bardo with rating 2', 'search');
// manager.addDocument('en', 'I\'m looking for a gym with a musculation and natation near Bardo', 'search');
// manager.addDocument('en', 'I\'m looking for a gym with a musculation and natation', 'search');
// manager.addDocument('en', 'I\'m looking for a gym near Bardo with rating 4', 'search');
// manager.addDocument('en', 'I\'m looking for a gym near Bardo', 'search');
// manager.addDocument('en', 'I\'m looking for a gym with rating 4', 'search');
// manager.addDocument('en', 'I\'m looking for a gym', 'search');
// manager.addDocument('en', 'What are the gyms near Bardo with musculation and natation?', 'search');
// manager.addDocument('en', 'What are the gyms near Bardo?', 'search');
// manager.addDocument('en', 'What are the gyms with musculation and natation?', 'search');
// manager.addDocument('en', 'What are the gyms?', 'search');

// manager.addDocument('en', 'musculation', 'service');
// manager.addDocument('en', 'natation', 'service');
// manager.addDocument('en', 'cardio', 'service');
// manager.addDocument('en', 'yoga', 'service');
// manager.addDocument('en', 'pilates', 'service');
// manager.addDocument('en', 'spinning', 'service');
// manager.addDocument('en', 'crossfit', 'service');
// manager.addDocument('en', 'weightlifting', 'service');
// manager.addDocument('en', 'zumbie', 'service');
// manager.addDocument('en', 'dance', 'service');
// manager.addDocument('en', 'salsa', 'service');
// manager.addDocument('en', 'body-building', 'service');
// manager.addDocument('en', 'coaching', 'service');

// manager.addDocument('en', 'Bardo', 'location');
// manager.addDocument('en', 'Tunis', 'location');
// manager.addDocument('en', 'Ariana', 'location');
// manager.addDocument('en', 'Manouba', 'location');
// manager.addDocument('en', 'Ben Arous', 'location');
// manager.addDocument('en', 'What is the rating of the gym?', 'rating');
// manager.addDocument('en', 'What are the ratings of the gyms near Bardo?', 'rating');
// manager.addDocument('en', '1', 'rating');
// manager.addDocument('en', '2', 'rating');
// manager.addDocument('en', '3', 'rating');
// manager.addDocument('en', '4', 'rating');
// manager.addDocument('en', '5', 'rating');

// Add entities to the manager
// manager.addNamedEntityText('service', 'musculation', ['en'], ['musculation']);
// manager.addNamedEntityText('service', 'natation', ['en'], ['natation']);
// manager.addNamedEntityText('location', 'Bardo', ['en'], ['Bardo']);
// manager.addNamedEntityText('location', 'Tunis', ['en'], ['Tunis']);
// manager.addNamedEntityText('location', 'Ariana', ['en'], ['Ariana']);
// manager.addNamedEntityText('location', 'Manouba', ['en'], ['Manouba']);
// manager.addNamedEntityText('location', 'Ben Arous', ['en'], ['Ben Arous']);
// manager.addNamedEntityText('rating', '1', ['en'], ['1']);
// manager.addNamedEntityText('rating', '2', ['en'], ['2']);
// manager.addNamedEntityText('rating', '3', ['en'], ['3']);
// manager.addNamedEntityText('rating', '4', ['en'], ['4']);
// manager.addNamedEntityText('rating', '5', ['en'], ['5']);



// (async () => {
// 	await manager.train();
// 	// manager.save('model.nlp');
	
//   })();

 


// Define API endpoint for handling POST requests
// router.post('/nlp', async (req, res) => {
// 	try {

// 	  const response = await manager.process('en', req.body.message);
	 
	 
	  
//     //   console.log(entities);
// 	//   res.json(response);
	   
// 		// const { location, services, rating } = response.entities;

//   // search for gyms based on the extracted information
// //   const gyms = await Gym.find();
// //   const results = gyms.filter(gym => {
// //     if (location && !gym.location.includes(location.value)) return false;
// //     if (services && !services.some(service => gym.services.includes(service.value))) return false;
// //     if (rating && gym.rating < rating.value) return false;
// //     return true;
// //   });

//   // return the list of recommended gyms in the response
//   res.send(response);
// 	} catch (err) {
// 	  console.error(err);
// 	  res.status(500).send(err.message);
// 	}
//   });
/////////////////////////////////////////////////////////////////////////////////////////////////

// router.post('/emotion-detection', async (req, res) => {
// 	try {
// 		const options = {
// 			method: 'POST',
// 			url: 'https://emotion-detection2.p.rapidapi.com/emotion-detection',
// 			headers: {
// 			  'content-type': 'application/json',
// 			  'X-RapidAPI-Key': '2bb533d755msh6703454301f93efp125d13jsn79c286c442a8',
// 			  'X-RapidAPI-Host': 'emotion-detection2.p.rapidapi.com'
// 			},
// 			data: {
// 			  url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
// 			}
// 		  };
		  
		  
// 			  const response = await axios.request(options);
// 			  res.send(response.data);
// 	} catch (err) {
// 	  console.error(err);
// 	  res.status(500).send(err.message);
// 	}
//   });

// router.get('/exercice', async (req, res) => {
// 	try {
// 		const options = {
// 			method: 'GET',
// 			url: 'https://exerciseapi3.p.rapidapi.com/search/muscles/',
// 			headers: {
// 			  'X-RapidAPI-Key': '2bb533d755msh6703454301f93efp125d13jsn79c286c442a8',
// 			  'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
// 			}
// 		  };
		  
		 
// 			  const response = await axios.request(options);
// 			  res.send(response.data);
// 	} catch (err) {
// 	  console.error(err);
// 	  res.status(500).send(err.message);
// 	}
//   });

  
  
  
    


module.exports = router;