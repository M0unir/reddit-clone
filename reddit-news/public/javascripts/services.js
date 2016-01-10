app.factory('PostsService', function ($http) {
  var Obj = {
    posts: []
  };

  Obj.getAll = function () {
    return $http.get('/posts').success(function (data) {
      angular.copy(data, Obj.posts);
    });
  };

  Obj.createPost = function (post) {
    return $http.post('/posts', post).success(function (data) {
      Obj.posts.push(data);
    });
  };

  Obj.upvotePost = function (post) {
    console.log(post);
    return $http.put('/posts/' + post._id + '/upvote').success(function (data) {
      post.upvotes += 1;
    });
  };



  return Obj;
});
