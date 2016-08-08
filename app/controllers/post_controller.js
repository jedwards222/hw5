import Post from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags, content: post.content };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.save()
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    console.log(error);
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  // use find
  Post.find()
  .then(result => {
    res.json(cleanPosts(result));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deletePost = (req, res) => {
  // use findByIdAndDelete
  Post.findByIdAndRemove(req.params.id)
  .then(result => {
    res.json({ result });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }
    if (req.body.tags) {
      post.tags = req.body.tags;
    }

    return post.save();
  })
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    console.log(error);
    res.json({ error });
  });

  // Post.findByIdAndUpdate(req.params.id,
  //   { title: req.body.title }, { content: req.body.content }, { tags: req.body.tags })
  // .then(result => {
  //   res.json({ message: result });
  // })
  // .catch(error => {
  //   res.json({ error });
  // });
};
