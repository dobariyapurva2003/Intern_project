const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/schema");
const FeedStore = require("../model/feedSchema");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth_m = require("../middleware/auth_m");
const admin_auth_m = require("../middleware/admin_auth_m");
const Admin = require("../model/adminSchema");
const SavedArticle = require("../model/saveArticles");
const TopicStore = require("../model/setTopicSchema");
const TotalTopics = require("../model/totalTopicSchema");

router.get('/', (req, res) => {
  res.send("hello hiya router");
});

router.get('/About', auth_m, (req, res) => {
  console.log("hello after authenticate");
  res.send(req.root_user);
});

router.get('/About_admin', admin_auth_m, (req, res) => {
  console.log("hello after authenticate admin");
  res.send(req.root_user);
});

router.post("/user", async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      res.status(200).json({ message: "User Verified!" });
    } else {
      res.status(422).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/fpassword", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.newpassword;
    console.log(password);
    const hashp = await bcrypt.hash(password, 10);

    const findUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { user_password: hashp } },
      { new: true }
    );
    if (findUser) {
      res.status(200).json({ message: "Password updated successful" });
    } else {
      res.status(422).json({ message: "password not updated" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/updateUser", async (req, res) => {
  try {
    const oldemail = req.body.oldemail;
    const { fullname, email, username, branch } = req.body;

    const userFind = await User.findOneAndUpdate(
      { email: oldemail },
      { fullname, email, username, branch },
      {
        new: true,
      }
    );
    if (userFind) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(422).json({ err: "not valid" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/favourites", async (req, res) => {
  try {
    const { email, title, topic, language } = req.body;
    console.log(title);
    console.log(email);
    console.log(language);
    const userEmail = await User.findOneAndUpdate(
      { email: email, favourites: { $not: { $elemMatch: { title: title } } } },
      { $push: { favourites: { title, topic, language } } },
      { new: true }
    );
    console.log(userEmail);
    if (userEmail) {
      res.status(200).json({ message: "title added successfully!" });
    } else {
      res.status(422).json({ message: "title already added" });
      console.log("hello");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/set_topics", async (req, res) => {
  try {
    const username = req.body.username;
    const branch = req.body.branchSent;
    const topic = req.body.topic;
    console.log(username);
    console.log(branch);
    console.log(topic);
    const userexist = await Admin.findOne({ username: username });
    if (userexist) {
      const branchExist = await TopicStore.findOne({ branch: branch });
      if (branchExist) {
        const updation = await TopicStore.findOneAndUpdate(
          { branch: branch , total_topics : {$nin : topic } },
          { $push: { total_topics: topic } },
          { new: true }
        );
        if (updation) {
          res.status(200).json({ message: "Topics Updated successfully!" });
        }
        else {
          res.status(422).json({ message: "Topics alredy exist for Users. Topic not updated!" });
        }
      }
      else {
        const newUpdate = new TopicStore({ branch, topic });
        await newUpdate.save();
        const updation = await TopicStore.findOneAndUpdate(
          { branch: branch ,  total_topics : {$nin : topic } },
          { $push: { total_topics: topic } },
          { new: true }
        );
        if (updation) {
          res.status(200).json({ message: "Topics created and Updated successfully!" });
        }
        else {
          res.status(422).json({ message: "Topics not created and updated!" });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/postTopic", async (req, res) => {
  try {
    const username = req.body.username;
    const branch = req.body.branchSent;
    const topic = req.body.topic;
    console.log(username);
    console.log(branch);
    console.log(topic);
    const userexist = await Admin.findOne({ username: username });
    if (userexist) {
      const branchExist = await TotalTopics.findOne({ branch: branch });
      if (branchExist) {
        const updation = await TotalTopics.findOneAndUpdate(
          { branch: branch , total_topics : {$nin : topic } },
          { $push: { total_topics: topic } },
          { new: true }
        );
        if (updation) {
          res.status(200).json({ message: "Topics Added successfully!" });
        }
        else {
          res.status(422).json({ message: "Topics not added!" });
        }
      }
      else {
        const newUpdate = new TotalTopics({ branch, topic });
        await newUpdate.save();
        const updation = await TotalTopics.findOneAndUpdate(
          { branch: branch, total_topics : {$nin : topic } },
          { $push: { total_topics: topic } },
          { new: true }
        );
        if (updation) {
          res.status(200).json({ message: "Topics created and Added successfully!" });
        }
        else {
          res.status(422).json({ message: "Topics not created and added!" });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/favourites", async (req, res) => {
  try {
    const { email, title, topic, language } = req.body;
    const findUser = await User.findOneAndUpdate(
      { email: email, favourites: { $elemMatch: { title: title } } },
      { $pull: { favourites: { title, topic, language } } },
      { new: true }
    );
    if (findUser) {
      res.status(200).json({ message: "Removed from favorites" });
    } else {
      res.status(422).json({ message: "Failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/removeTopic", async (req, res) => {
  try {
    const username = req.body.username;
    const branch = req.body.branchSent;
    const topic = req.body.topic;
    const userexist = await Admin.findOne({ username: username });
    if (userexist) {
      var findUser2;
      const findUser = await TotalTopics.findOneAndUpdate(
        { branch: branch },
        { $pull: { total_topics: topic } },
        { new: true }
      );
      if(findUser)
      {
          findUser2 = await TopicStore.findOneAndUpdate(
          { branch: branch },
          { $pull: { total_topics: topic } },
          { new: true }
        );
      }
      if (findUser && findUser2) {
        res.status(200).json({ message: "topic Removed from DB" });
      } else {
        res.status(422).json({ message: "Failed" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/removeTopicForUsers", async (req, res) => {
  try {
    const username = req.body.username;
    const branch = req.body.branchSent;
    const topic = req.body.topic;
    console.log(username);
    console.log(branch);
    console.log(topic);
    const userexist = await Admin.findOne({ username: username });
    if (userexist) {
      const findUser = await TopicStore.findOneAndUpdate(
        { branch: branch },
        { $pull: { total_topics: topic } },
        { new: true }
      );
      if (findUser) {
        res.status(200).json({ message: "topic Removed for Users" });
      } else {
        res.status(422).json({ message: "Failed" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/rmfeed", async (req, res) => {
  try {
    const feedBack = req.body.feedBack;
    const findUser = await FeedStore.findOneAndUpdate(
      { total_feedBack: { $elemMatch: { feedBack: feedBack } } },
      { $pull: { total_feedBack: { feedBack } } },
      { new: true }
    );
    if (findUser) {
      res.status(200).json({ message: "Removed from favorites" });
    } else {
      res.status(422).json({ message: "Failed" });
    }
  } catch (err) {
    console.log(err);
  }
});



router.patch("/rm_usr_acnt", async (req, res) => {
  try {
    const username = req.body.feedBack;
    const findUser = await User.findOneAndDelete(
      {
        username : username
      }
    )
    if (findUser) {
      res.status(200).json({ message: "Removed from User accounts" });
    } else {
      res.status(422).json({ message: "Failed" });
    }
  } catch (err) {
    console.log(err);
  }
});





router.patch("/removeArt", async (req, res) => {
  try {
    const { email, topic, title, language, description, content, url, image, publishedAt }
      = req.body;
    console.log(title);
    console.log(email);
    console.log(publishedAt);
    const findUser = await SavedArticle.findOneAndUpdate(
      { email: email, final_topic: { $elemMatch: { title: title } } },
      { $pull: { final_topic: { topic, title, language, description, content, url, image, publishedAt } } },
      { new: true }
    );
    if (findUser) {
      res.status(200).json({ message: "Article Removed from folder" });
    } else {
      res.status(422).json({ message: "Article not Removed from folder!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/signup', async (req, res) => {
  const { fullname, email, username, user_password, branch } = req.body;
  if (!fullname || !email || !username || !user_password || !branch) {
    return res.status(422).json({ error: "please fill the field properly" });
  }
  try {
    const userexist = await User.findOne({ email: email })
    if (userexist) {
      return res.status(422).json({ error: "Email is already exist" });
    }
    const user = new User({ fullname, email, username, user_password, branch });
    const token = await user.generateAuthToken();
    console.log(token);
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true
    });
    //console.log(cookie);
    await user.save();
    res.status(201).json({ message: "data stored successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/storeFeed", async (req, res) => {
  const email = req.body.email;
  const feedBack = req.body.feedBack;
  console.log(feedBack);
  console.log(email);
  if (!feedBack)
    return res.status(422).json({ error: "please fill the field properly" });
  try {
    const userexist = await FeedStore.findOne({ email: email })
    if (userexist) {
      const uexist = await FeedStore.findOneAndUpdate(
        { email: email, total_feedBack: { $not: { $elemMatch: { feedBack: feedBack } } } },
        { $push: { total_feedBack: { feedBack } } },
        { new: true }
      )
      if (uexist) {
        res.status(200).json({ message: "Feedback stored successfully" });
      }
      else {
        res.status(422).json({ message: "Feedback already exist" });
      }
    }
    else {
      const user = new FeedStore({ email, feedBack });
      await user.save();
      const uexist = await FeedStore.findOneAndUpdate(
        { email: email, total_feedBack: { $not: { $elemMatch: { feedBack: feedBack } } } },
        { $push: { total_feedBack: { feedBack } } },
        { new: true }
      )
      console.log(uexist);
      if (user) {
        res.status(200).json({ message: "Feedback stored successfully" });
      }
      else {
        res.status(422).json({ message: "Feedback already exist" });
      }
    }
  } catch (error) {
    console.log(error);
  }
})

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const user_password = req.body.user_password;
    if (!username || !user_password) {
      return res.status(400).json({ error: "plz fill it" });
    }
    const username_final = await User.findOne({ username: username });
    if (username_final) {
      const isMatch = await bcrypt.compare(
        user_password, username_final.user_password);
      const token = await username_final.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true
      });
      if (!isMatch) {
        console.log("e");
        res.status(400).json({ error: "Invalid" });
      } else {
        res.status(201).json({ message: "log in successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid details" });
    }
    //console.log(userename_final);
  } catch (err) {
    console.log(err);
  }
});

router.post("/loginForAdmin", async (req, res) => {
  try {
    const username = req.body.username;
    const user_password = req.body.user_password;
    if (!username || !user_password) {
      return res.status(400).json({ error: "plz fill it" });
    }
    const username_final = await Admin.findOne({ username: username });
    if (username_final) {
      const isMatch = await bcrypt.compare(
        user_password, username_final.user_password);
      const token = await username_final.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true
      });
      if (!isMatch) {
        console.log("e");
        res.status(400).json({ error: "Invalid" });
      } else {
        res.status(201).json({ message: "log in successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid details" });
    }
    //console.log(userename_final);
  } catch (err) {
    console.log(err);
  }
});


router.post("/disp_fev", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    const userFind = await User.findOne({ email: email });
    if (userFind) {
      res.status(200).send(userFind.favourites);
    } else {
      res.status(422).send("user not found");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/showTopic", async (req, res) => {
  const branch = req.body.branchSent;
  console.log(branch);
  try {
    const userFind = await TotalTopics.findOne({ branch: branch });
    if (userFind) {
      res.status(200).send(userFind.total_topics);
    } else {
      res.status(422).send("branch not found");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/showTopicForUsers", async (req, res) => {
  const branch = req.body.branchSent;
  console.log(branch);
  try {
    const userFind = await TopicStore.findOne({ branch: branch });
    if (userFind) {
      res.status(200).send(userFind.total_topics);
    } else {
      res.status(422).send("branch not found");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/disp_topics", async (req, res) => {
  const branch = req.body.branch;
  console.log(branch);
  try {
    const userFind = await TopicStore.findOne({ branch: branch });
    if (userFind) {
      res.status(200).send(userFind.total_topics);
    } else {
      res.status(422).send("Topics not found");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/disp_feed", async (req, res) => {
  const username = req.body.username;
  console.log(username);
  try {
    const userFind = await Admin.findOne({ username: username });
    if (userFind) {
      const disp = await FeedStore.find({});
      let data = [];
      for (let i = 0; i < disp.length; i++) {
        for (let j = 0; j < (disp[i].total_feedBack).length; j++) {
          console.log(disp[i].total_feedBack[j].feedBack);
          data.push(disp[i].total_feedBack[j].feedBack);
        }
      }
      res.status(200).send(data);
    } else {
      res.status(422).send("user not found");
    }
  } catch (err) {
    console.log(err);
  }
});




router.post("/disp_usr_acnt", async (req, res) => {
  const username = req.body.username;
  console.log(username);
  try {
    const userFind = await Admin.findOne({ username: username });
    if (userFind) {
      const disp = await User.find({});
      let data = [];
      for (let i = 0; i < disp.length; i++) {
        data.push(disp[i]);
      }
      res.status(200).send(data);
    } else {
      res.status(422).send("user not found");
    }
  } catch (err) {
    console.log(err);
  }
});






router.post("/saveArticle", async (req, res) => {
  try {
    const { email, topic, title, language, description, content, url, urlToImage, publishedAt }
      = req.body;
    console.log(title);
    console.log(email);
    console.log(publishedAt);
    const userexist = await SavedArticle.findOne({ email: email })
    if (userexist) {
      const uexist = await SavedArticle.findOneAndUpdate(
        { email: email, final_topic: { $not: { $elemMatch: { title: title } } } },
        { $push: { final_topic: { topic, title, language, description, content, url, urlToImage, publishedAt } } },
        { new: true }
      )
      if (uexist) {
        res.status(200).json({ message: "Article saved successfully" });
      }
      else {
        res.status(422).json({ message: "Article already saved" });
      }
    }
    else {
      const user = new SavedArticle({ email, topic, title, language, description, content, url, urlToImage, publishedAt });
      await user.save();
      const uexist = await SavedArticle.findOneAndUpdate(
        { email: email, final_topic: { $not: { $elemMatch: { title: title } } } },
        { $push: { final_topic: { topic, title, language, description, content, url, urlToImage, publishedAt } } },
        { new: true }
      )
      console.log(uexist);
      if (user) {
        res.status(200).json({ message: "Article stored successfully" });
      }
      else {
        res.status(422).json({ message: "Article already exist" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/disp_save", async (req, res) => {
  const email = req.body.email;
  const topic = req.body.topic;
  console.log(email);
  console.log(topic);
  let data = [];
  try {
    const userFind = await SavedArticle.findOne({ email: email });
    if (userFind) {
      const disp = await SavedArticle.findOne({ email: email });
      for (let i = 0; i < disp.final_topic.length; i++) {
        if (topic === disp.final_topic[i].topic) {
          data.push(disp.final_topic[i]);
        }
      }
      console.log(data);
      res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/get_save_topics", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  let data = [];
  try {
    const userFind = await SavedArticle.findOne({ email: email });
    if (userFind) {
      const disp = await SavedArticle.findOne({ email: email });
      for (let i = 0; i < disp.final_topic.length; i++) {
        data.push(disp.final_topic[i].topic);
      }
      data = data.filter((item, index) => data.indexOf(item) === index);
      console.log(data);
      res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/Logout', (req, res) => {
  console.log("hello after logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
  console.log("logout finish ");
});

module.exports = router;