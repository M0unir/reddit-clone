var app = angular.module('RedditNews', []);

app.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.heading = 'Reddit Clone';

  $scope.posts = [{
    title: 'post 1',
    upvotes: 5
  }, {
    title: 'post 2',
    upvotes: 2
  }, {
    title: 'post 3',
    upvotes: 15
  }, {
    title: 'post 4',
    upvotes: 9
  }, {
    title: 'post 5',
    upvotes: 4
  }];

  //Add Post
  $scope.addPost = function () {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0
    });
    $scope.title = '';
    $scope.link = '';
  };

  //Increment upvotes
  $scope.incrementUpvotes = function (post) {
    post.upvotes += 1;
  }

}]);

app.filter('capitalize', function() {
    return function(s) {
      return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
    }

});
