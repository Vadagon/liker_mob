angular.module('main', ["ngRoute"])
.controller('AppCtrl', function($scope,$location) {
    $scope.openInstagram = function(){
      console.log(12312132);
      window.browserIn = cordova.InAppBrowser.open('https://www.instagram.com/', '_blank', 'location=yes');
      window.browserIn.addEventListener('loadstop', function() {
        $('body > div:last-child').css('z-index', '100000');
      });
    }
    $scope.instagramLogData = {
      username: '',
      password: ''
    }
    $scope.loading = true;
    $scope.showingAgreement = !1;
    $scope.acceptedAgreement = storage.getItem('acceptedAgreement');
    if(!$scope.acceptedAgreement){
      $scope.acceptedAgreement = !1;
    }
    window.setLoading = function setLoading(e){
      $scope.loading = e;
    }
    $scope.acceptAgreement = function() {
      $scope.acceptedAgreement = !0;
      storage.setItem('acceptedAgreement', $scope.acceptedAgreement);
    }
    $scope.showAgreement = function(e){
      $scope.showingAgreement = !e;
    }
    $scope.data = {
        tasks: [],
        feed: [],
        status: 'Sleeping'
    }
    var blankTask = {
        isEnabled: !0,
        type: 'hashtag',
        textarea: ''
    }
    $scope.window = window;
    $scope.document = document;
    $scope.ap = {
        showError1: !1,
        showError2: !1,
        showError3: !1,
        taskFunc: 'add'
    };
    $scope.newTask = blankTask;
    $scope.instagramLogn = function(){
      console.log(data.user.csrf_token);
      $.ajax({
          url: 'https://www.instagram.com/accounts/login/ajax/',
          type: 'post',
          data: {
            username: $scope.instagramLogData.username,
            password: $scope.instagramLogData.password,
            queryParams: {}
          },
          headers: {
            'x-csrftoken': data.user.csrf_token,
            'x-requested-with': 'XMLHttpRequest'
          }
      }).always(function(e) {
        // console.log(e)
      });
    }
	// window.location.href = '#!task';
    $scope.theme = function(e){
      setTimeout(function () {
        $('select.dropdown').dropdown({onChange:function(val){
          $scope.newTask.type = val;
          $scope.ap.showError2 = $scope.ap.showError3 = false;
          if((/(feed|location)/ig).test(val) && !$scope.data.user.isMember)  $scope.ap.showError2 = true;
          if((/follow/ig).test(val) && !$scope.data.user.isMember)  $scope.ap.showError2 = true;
          if((/follow/ig).test(val) && $scope.data.user.isMember)  $scope.ap.showError3 = true;
          if($scope.ap.showError2 || $scope.ap.showError3){
            $('.dropdown .menu > div').removeClass('active selected')
            $('.dropdown .menu > div[data-value="hashtag"]').addClass('active selected')
            $('.dropdown .text').text($('.dropdown .menu > div[data-value="hashtag"]').text())
            $scope.newTask.type = 'hashtag';
          }
          $scope.$apply()
        }})
      }, 100);

        $('.ui.checkbox').checkbox({
          onChecked: function() {
            console.log(!0);
            $scope.newTask.isEnabled = !0;
            $scope.$apply()
          },
          onUnchecked: function() {
            console.log(!1);
            $scope.newTask.isEnabled = !1;
            $scope.$apply()
          }
        })
        if(e){
            // $('html, body').css('width', '420px')
        }else{
            // $('html, body').css('width', '320px')
        }
        $('.indicating.progress').progress({
            label: 'ratio',
            value: $scope.data.feed.length,
            total: $scope.data.user.limitTo,
            text: {
                success : 'Daily quota reached!'
            }
        });
    }
    $scope.taskFunc = function(e){
        $scope.ap.taskFunc = e;
        if(e !== 'add'){
          console.log($scope.ap.taskFunc);
          $scope.newTask = angular.copy($scope.data.tasks[$scope.ap.taskFunc])
          console.log($scope.newTask);
        }else{
          $scope.newTask = angular.copy(blankTask)
        }
        window.location.href = '#!task';
    }

    $scope.get = function(cb){
        chrome.runtime.sendMessage({why: "getData"}, function(response) {
            if(!cb){
                console.log(response)
                $scope.data = response;
                $scope.data.feed = $scope.data.feed.reverse();
                if(!$scope.data.tasks.length) window.location.href = '#!task';
                // $scope.$apply();
                $scope.theme(1);
                $($scope.data.user.form).insertAfter('.main_container').css('display', 'none').attr('target', '_blank')
            }else{
                cb(response)
            }
        });
    }
    $scope.get();
    $scope.save = function(){
        if($scope.ap.taskFunc == 'add'){
            $scope.data.tasks.push(angular.copy($scope.newTask))
        }else{
            $scope.data.tasks[$scope.ap.taskFunc] = angular.copy($scope.newTask);
        }
        $scope.newTask = blankTask;
        chrome.runtime.sendMessage({why: "setData", data: angular.copy($scope.data)});
        window.location.href = '#!home';
    }
    $scope.cancel = function(){
      $scope.newTask = blankTask;
      window.location.href = '#!home';
    }
    setInterval(function() {
        $scope.get(function(e){
            console.log(e);
            if($scope.data.feed.length !== e.feed.length) {
                $scope.data.feed.unshift(e.feed.pop())
                // $scope.data.feed = e.feed;
                // $('.leftSide').css('margin-top', '0');
                $('.leftSide').css('margin-top', '-84px');
                // $('.leftSide').css('margin-top', '0px');
                setTimeout(function () {
                  $( ".leftSide" ).animate({ marginTop: "0" }, 400)
                }, 300);
                $('.indicating.progress').progress('increment');
            }
            $scope.data.status = e.status;
            $scope.$apply();
        })
    }, 5000);


    $scope.pay = function(){
        chrome.runtime.sendMessage({why: "popup", what: 'clicked on payement button'}, function(){
          $('form').submit();
        });
    }

})
.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})
.filter('join', function() {
    return function(input) {
      return input.join(', ');
    }
})
.config(function($routeProvider) {
    $routeProvider
    .when("/task", {
        templateUrl : "../popup/parts/task.html"
    })
    .when("/home", {
        templateUrl : "../popup/parts/home.html"
    })
    .when("/info", {
        templateUrl : "../popup/parts/info.html"
    })
    .when("/plus", {
        templateUrl : "../popup/parts/plus.html"
    })
    .otherwise({
        redirectTo: "/home"
    });
});
