function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", function(){
  var liveVideoId = "1802474376526831"; 

  var source = new EventSource("https://streaming-graph.facebook.com/" + liveVideoId + "/live_comments?access_token=" + accessToken + "&comment_rate=one_per_two_seconds&fields=from{name,id},message");
  source.onmessage = function(event) {
    var statusEl = document.getElementById("statusElement"); 
    var data = JSON.parse(event.data);
    statusEl.innerText = data.message; 
  };
});