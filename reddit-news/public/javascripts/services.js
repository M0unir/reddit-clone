app.factory('PostsService', function ($http) {
  var Obj = {
    posts: []
  };

    Obj.getAll = function() {
      return $http.get('/posts').success(function(data){
        angular.copy(data, Obj.posts);
      });
    };

    Obj.createPost = function(post) {
      return $http.post('/posts', post).success(function(data){
        Obj.posts.push(data);
      });
    };




  return Obj;
});