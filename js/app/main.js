define(function(require) { 
  const comment = require("app/components/comment");
  const reaction = require("app/components/reaction");
  const urlParams = new URLSearchParams(window.location.search);
  const liveVideoId = urlParams.get('vid')
  const accessToken = urlParams.get('access_token');

  function LoggingTheEvent(theEvent) { 
    console.log(theEvent);
  }
  
  function startReactionServerEvents() { 
    var source = new EventSource("https://streaming-graph.facebook.com/" + liveVideoId + "/live_reactions?access_token=" + accessToken + "&fields=reaction_stream");
    source.onmessage = LoggingTheEvent; 
  }
  
  function startCommentServerEvents() { 
    var source = new EventSource("https://streaming-graph.facebook.com/" + liveVideoId + "/live_comments?access_token=" + accessToken + "&comment_rate=one_hundred_per_second&fields=from{name,id},message");
    source.onmessage = comment.add; 
  }

  startReactionServerEvents();
  startCommentServerEvents();
  
});