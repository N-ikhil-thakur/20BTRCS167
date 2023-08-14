const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
	trainName: {
		type: String,
		required: true
	},
	trainNumber: {
		type: String,
		required: true
	},
	departureTime: {
		Hours: {
			type: Number,
			required: true,
		},
		Minutes: {
			type: Number,
			required: true,
		},
		Seconds:{
			type: Number,
			required: true,
		}
	},
	seatsAvailable: {
		Sleeper: {
			type: Number,
			required: true,
		},
		AC: {
			type: Number,
			required: true,
		}
	},
	price: {
		Sleeper: {
			type: Number,
			required: true,
		},
		AC: {
			type: Number,
			required: true,
		}
	},
	delayedBy: {
		type: Number,
		required: true,
	}
})

TrainSchema.methods.time = function(){
	return (this.departureTime.Hours*3600 + this.departureTime.Minutes*60 + this.departureTime.Seconds + this.delayedBy*60)*1000;
}

module.exports = mongoose.model('Train', TrainSchema);
