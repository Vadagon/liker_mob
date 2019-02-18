a.tool = {
  likeIt: function(id, cb){
    a.requests.push($.ajax({
        url: 'https://www.instagram.com/web/likes/'+id+'/like/',
        type: 'post',
        headers: {
          'x-csrftoken': data.user.csrf_token
        }
    }).always(function(e) {
      cb(catcher(function(){
        return e.status == 'ok';
      }))
    }));
  },
  getPost: function(id, cb){
    a.requests.push($.ajax({
        url: 'https://www.instagram.com/graphql/query/',
        type: 'get',
        data: {
          query_hash: data.user.post,
          variables: `{"shortcode":"${id}","child_comment_count":3,"fetch_comment_count":40,"parent_comment_count":24,"has_threaded_comments":false}`
        },
        headers: {
          'x-instagram-gis': '2ea69d1677baf9e1d21d4f65f04c16e0'
        }
    }).always(function(e) {
      // console.log(e)
        cb(e)
    }));
  },
  getRecentTags: function(tag, cb){
    a.requests.push($.get('https://www.instagram.com/explore/tags/'+tag+'/?__a=1').done(function(e){
      cb(catcher(function(){
        return e.graphql.hashtag.edge_hashtag_to_media.edges;
      }))
    }).fail(a.init.bind(!0)))
  },
  getRecentLocations: function(tag, cb) {
    a.requests.push($.get('https://www.instagram.com/explore/locations/'+tag.pk+'/'+tag.slug+'/?__a=1').done(function(e){
      cb(catcher(function(){
        return e.graphql.location.edge_location_to_media.edges;
      }))
    }).fail(a.init.bind(!0)))

  },
  getFeed: function(cb) {
    a.requests.push($.ajax({
        url: 'https://www.instagram.com/graphql/query/',
        type: 'get',
        data: {
          query_hash: data.user.feed,
          variables: `{"fetch_media_item_count":12,"fetch_media_item_cursor":"${a.myFeed.end_cursor}","fetch_comment_count":4,"fetch_like":3,"has_stories":false}`
        }
    }).done(function(e){
      cb(catcher(function(){
        a.myFeed.end_cursor = e.data.user.edge_web_feed_timeline.page_info.end_cursor;
        a.myFeed.posts.push(...e.data.user.edge_web_feed_timeline.edges);
        return e.data.user.edge_web_feed_timeline.edges;
      }))
    }).fail(a.init.bind(!0)))
  },
  search: function(tag, cb){
    a.requests.push($.get('https://www.instagram.com/web/search/topsearch/?context=blended&query='+tag+'&rank_token=0.806776188138403&include_reel=true').done(function(e){
      cb(catcher(function(){
        console.log(e);
        return e.places[0].place.location;
      }))
    }).fail(a.init.bind(!0)))
  }
}
