const mongoose = require("mongoose");


const setTopicSchema = new mongoose.Schema({
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

const TopicStore = new mongoose.model('news_portal_user_setTopics', setTopicSchema);

module.exports = TopicStore;