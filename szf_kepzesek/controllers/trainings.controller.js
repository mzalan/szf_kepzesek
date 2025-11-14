const Training = require('../models/Training')

exports.createTraining = async (req, res, next) => {
    console.log("createTraining");
    try {
        const training = await Training.create(req.body);
        res.status(201).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}

exports.getAllTraining = async (req, res, next) => {
    console.log("getAllTraining");
    try {
        let query;
        let queryStr = JSON.stringify(req.query)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const startIndex = (page - 1) * limit
        const endIndex = page * limit;
        const total = await Training.countDocuments();

        query = Training.find(JSON.parse(queryStr));
        query = query.skip(startIndex).limit(limit);
        const pagination = {};
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }

        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields)
        }
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        const trainings = await query;
        res.status(200).json({ success: true, count: trainings.length, pagination, data: trainings });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}

exports.getTraining = async (req, res, next) => {
    console.log("getTraining");
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' });
        }
        res.status(200).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};