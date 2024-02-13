const mongoose = require("mongoose");

const saveArticles = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    final_topic: [
        {
            topic:
            {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            language: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            urlToImage: {
                type: String,
                required: true
            },
            publishedAt: {
                type: String,
                required: true
            }
        }
    ]
});

const SavedArticle = new mongoose.model('news_portal_user_saved', saveArticles);

module.exports = SavedArticle;
