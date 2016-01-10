var app = angular.module('RedditNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['PostsService', function(PostsService){
            return PostsService.getAll();
          }]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          postPromise: ['$stateParams', 'PostsService', function($stateParams, PostsService){
            return PostsService.getPost($stateParams.id)
          }]
        }
      });

    $urlRouterProvider.otherwise('home');
  }
]);



app.filter('capitalize', function () {
  return function (s) {
    return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
  }

});


