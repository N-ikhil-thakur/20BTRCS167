const Train = require('../models/Train');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllTrains = async (req, res) => {
    const d = new Date();
    const t = (d.getHours() * 3600 + d.getMinutes()*60 + d.getSeconds() + 30*60)*1000;

    const trains = await Train.find({})
    res.status(StatusCodes.OK).json(trains);
}


const getTrain = async (req, res) => {
    const { trainNumber } = req.params;

    const train = await Train.findOne({
        trainNumber
    })

    if(!train){
        throw new NotFoundError(`Train not found.`);
    }

    res.status(StatusCodes.OK).json(train);
}



module.exports = {
    getAllTrains,
    getTrain,
}