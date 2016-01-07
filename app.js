var app = angular.module('RedditNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }
]);


app.controller('MainCtrl', ['$scope', 'PostsService', function ($scope, PostsService) {
  $scope.heading = 'Reddit Clone';

  $scope.posts = PostsService.posts;

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

app.filter('capitalize', function () {
  return function (s) {
    return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
  }

});

app.factory('PostsService', [function () {
  var Obj = {
    posts: [{
      title: 'Changing in the world economy!',
      upvotes: 5
    }, {
      title: 'Best gaming convention happening today',
      upvotes: 2
    }, {
      title: 'Africa, leader and pioneer of today\'s trendiest tech',
      upvotes: 15
    }, {
      title: 'Change the way you are with these few easy steps',
      upvotes: 9
    }, {
      title: 'Learn to understand yourself',
      upvotes: 4
    }]
  };
  return Obj;
}]);
