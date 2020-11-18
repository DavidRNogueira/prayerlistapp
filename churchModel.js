const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prayerSchema = new Schema ({
    reporter : String , 
    description: String , 
    date_posted: String, 
    prayerCount: [String]
})

const churchSchema = new Schema({
    churchName : String ,
    churchParams : String ,
    prayerRequests : [prayerSchema]
})

const churchModel = mongoose.model('church' , churchSchema);

module.exports = churchModel;