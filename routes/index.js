var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var jwt = require('express-jwt');

// Middleware for authentication (default userProperty:'user' && use ENV['****'] for prod)
var auth = jwt({ secret: 'SECRET', userProperty: 'payload', algorithms: ['HS256'] });

// Preloading post object
router.param('post', function (req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post) {
    if (err) {
      return next(err);
    }
    if (!post) {
      return next(new Error('can\'t find post'));
    }
    req.post = post;
    return next();
  });
});

// Preloading comment object
router.param('comment', function (req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error('can\'t find comment'));
    }
    req.comment = comment;
    return next();
  });
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET all posts. */
router.get('/posts', function (req, res, next) {
  Post.find(function (err, posts) {
    if (err) {
      return next(err);
    }
    res.json(posts);

  })
});

/* POST a post. */
router.post('/posts', auth, function (req, res, next) {
  var post = new Post(req.body);
  // Get the author name from token payload
  post.author = req.payload.username;

  post.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  })
})

/* Get a single post. */
router.get('/posts/:post', function (req, res) {
  req.post.populate('comments', function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

/* Upvote a post. */
router.put('/posts/:post/upvote', auth, function (req, res, next) {
  req.post.upvote(function (err, post) {
    if (err) {
      return next(err);
    }

    res.json(post);
  });
});

/* POST a comment. */
router.post('/posts/:post/comments', auth, function (req, res, next) {
  var comment = new Comment(req.body);
  // ref of post obj in our comment
  comment.post = req.post;
  comment.author = req.payload.username;
  comment.save(function (err, comment) {
    if (err) {
      return next(err);
    }

    req.post.comments.push(comment);
    req.post.save(function (err, post) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    })
  })
});

/* Upvote a comment. */
router.put('/posts/:post/comments/:comment/upvote', auth, function (req, res, next) {
  req.comment.upvote(function (err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

module.exports = router;
