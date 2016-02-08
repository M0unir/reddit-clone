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
      })
      .state('register', {
        url: '/register',
        templateUrl: '/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'AuthService', function($state, AuthService){
          if (AuthService.isLoggedIn()){
            $state.go('home');
          }
        }]
      })
      .state('login', {
        url: '/login',
        templateUrl: '/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'AuthService', function($state, AuthService){
          if (AuthService.isLoggedIn()){
            $state.go('home');
          }
        }]
      });

    $urlRouterProvider.otherwise('home');
  }
]);

app.filter('capitalize', function () {
  return function (s) {
    return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
  }

});

app.filter("linkFilter", function () {
  return function (link) {
      if (!link) {return;}
      var result;
      var startingUrl = "http://";
      var httpsStartingUrl = "https://"; 

      if(link.startWith(startingUrl) || link.startWith(httpsStartingUrl)){
          result = link;
      }
      else {
      result = startingUrl + link;
      }
      return result;
  }
  });
  
  String.prototype.startWith = function (str) {
  return this.indexOf(str) == 0;
};


