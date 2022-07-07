const { Router } = require('express');
const userRoute = Router();

const User = require('./models/UserModel');
const Profile = require('./models/ProfileModel');
const Post = require('./models/PostModel');


// post request 

userRoute.post('/addUser', async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result)
  } catch (error) {
    console.log(error)
  }
})

userRoute.post('/profile/:ObjectId', async (req, res) => {
  try {
    const _id = req.params.ObjectId;
    const { title, address, phone, post } = req.body;
    const profile = new Profile({
      title,
      address,
      phone,
      post,
      user: _id
    })

    const result = await profile.save();
    const updateDoc = await User.findOneAndUpdate({ _id }, { $set: { profile: result._id } })
    res.send(updateDoc);

  } catch (error) {
    res.send(error)
  }

})

userRoute.post('/posts/:profileId', async (req, res) => {
  try {
    const _id = req.params.profileId;
    const { title, body } = req.body;

    const post = new Post({
      title,
      body,
      profile: _id
    })

    const r = await post.save()
    const doc = await Profile.findOneAndUpdate({ _id }, { $push: { posts: r._id } });
    res.send(doc)

  } catch (error) {
    res.send(error)
  }
})

// get request

userRoute.get('/', async (req, res) => {
  try {
    const result = await User.find({}).populate('profile')
    for (let doc of result) {
      await Profile.populate(doc.profile, { path: 'posts' })
    }
    res.send(result)

  } catch (error) {
    res.send(error)
  }
})


module.exports = userRoute