require("dotenv").config();
const Train = require("./models/Train")
const connectDB = require("./db/connect")


const trains = [
	{
		trainName: "Delhi Door Hai Exp",
		trainNumber: "2343",
		departureTime: {
			Hours: 9,
			Minutes: 45,
			Seconds:0
		},
		seatsAvailable: {
			Sleeper: 32,
			AC: 1,
		},
		price: {
			Sleeper: 400,
			AC: 1000,	
		},
		delayedBy: 3
	},
	{
		trainName: "Chennai Exp",
		trainNumber: "2344",
		departureTime: {
			Hours: 21,
			Minutes: 35,
			Seconds:0
		},
		seatsAvailable: {
			Sleeper: 3,
			AC: 1,
		},
		price: {
			Sleeper: 450,
			AC: 1200,	
		},
		delayedBy: 15
	},
	{
		trainName: "Hyderabad Exp",
		trainNumber: "2341",
		departureTime: {
			Hours: 23,
			Minutes: 55,
			Seconds:0
		},
		seatsAvailable: {
			Sleeper: 6,
			AC: 7,
		},
		price: {
			Sleeper: 550,
			AC: 1820,	
		},
		delayedBy: 30
	}
]



async function create () {

	try {
		await connectDB(process.env.DATABASE_URL);
		trains.forEach(async function(train){
			await Train.create({...train});
		})
	} catch(err){
		console.log(err);
	}

};

create();
