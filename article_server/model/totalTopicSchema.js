const mongoose = require("mongoose");


const totalTopicSchema = new mongoose.Schema({
        branch : {
            type : String,
            required: true
        },
        total_topics : [
            {
                type :String,
                require : true
            }
        ]
    // }]
})

const TotalTopics = new mongoose.model('news_portal_user_totalTopics', totalTopicSchema);

module.exports = TotalTopics;