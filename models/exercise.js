import mongoose from 'mongoose';

const exerciseSchema = mongoose.Schema({
    title :String,
    weight :Number,
    sets :Number,
    reps :String,
    notes: String,
    creator: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: [String]
});

const ExerciseModel = mongoose.model('ExerciseModel', exerciseSchema);

export default ExerciseModel;