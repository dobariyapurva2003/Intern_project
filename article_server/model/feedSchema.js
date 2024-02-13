const mongoose = require("mongoose");


const feedSchema = new mongoose.Schema({
    // total_FeedBack: [{
        email : {
            type : String,
            required: true
        },
        total_feedBack: [
            {
                feedBack: {
                      type: String,
                      required: true
                        }
            }
        ]
    // }]
})

const FeedStore = new mongoose.model('news_portal_user_feedback', feedSchema);

module.exports = FeedStore;