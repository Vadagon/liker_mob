/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function log(e){
  console.log(e);
}
log(12223)
var ddd = 0;
// function openInstagram(){
//   console.log(12312132);
//   window.browserIn = cordova.InAppBrowser.open('https://www.instagram.com/', '_blank', 'location=yes');
//   window.browserIn.addEventListener('loadstop', function() {
//     $('body > div:last-child').css('z-index', '100000');
//   });
// }
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // cordova.InAppBrowser.open('https://www.instagram.com/', '_blank', 'location=yes');
        a.readyUp();
        // window.BackgroundService.start(
        //   function(fn) { dosometing(), fn && fn() },
        //   function() {
        //     cordova.plugins.notification.local.schedule({
        //       title: 'err'+(ddd++),
        //       text: 'err...'+(ddd++),
        //       foreground: true
        //     });
        //   }
        // )

        // getData(e=>{
        //   if(e){
        //     log(data.user.username);
        //     $.get('https://www.instagram.com/explore/tags/damnshit/?__a=1')
        //     .done(function(e){
        //       $.ajax({
        //           url: 'https://www.instagram.com/web/likes/'+e.graphql.hashtag.edge_hashtag_to_media.edges[0].node.id+'/like/',
        //           type: 'post',
        //           headers: {
        //               'x-csrftoken': data.user.csrf_token
        //             }
        //         })
        //     })
        //     // $('h1').text(data.user.username);
        //     // $('.event.received').text(data.user.id);
        //   }else{
        //     log("No data");
        //     // $('h1').text('No data');
        //     // $('.event.received').text("bred2");
        //   }
        // })


        // window.BackgroundService.start(
        //   function(fn) {
        //
        //     log('getData start');
        //     $('h1').text('No data');
        //     $('.event.received').text("bred1");
            // setInterval(function () {
            // }, 4000);
        //
        //
        //   },
        //   function() { log('err') }
        // )
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        //
        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


// var data = {
//   user: {}
// }
// var getData = function(cb) {
//   $.get('https://www.instagram.com')
//   .fail(e=>{
//     cb(!1);
//   })
//   .done(function(e){
//     var p = $('<div/>').append(e)
//     var p = p.find('script').map(function(el){
//       if( $(this).html().includes('window._sharedData = ')){
//         var e = JSON.parse( $(this).html().replace('window._sharedData = ', '').slice(0, -1) ) ;
//         catcher(function(){
//           data.user.csrf_token = e.config.csrf_token
//           data.user.username = e.config.viewer.username
//           data.user.id = e.config.viewer.id
//           cb(!0)
//         });
//       }
//     });
//   });
// }

// function dosometing() {
//   console.log(123);
//   cordova.plugins.notification.local.schedule({
//     title: 'dosometing'+(ddd++),
//     text: 'dosometing...'+(ddd++),
//     foreground: true
//   });
// }
// function fn(){
//   console.log(124);
//   cordova.plugins.notification.local.schedule({
//     title: 'fn'+(ddd++),
//     text: 'fn...'+(ddd++),
//     foreground: true
//   });
// }
