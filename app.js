const urlParams = new URLSearchParams(window.location.search);
const liveVideoId = urlParams.get('vid')
const accessToken = urlParams.get('access_token');

var source = new EventSource(
  'https://streaming-graph.facebook.com/' +
    liveVideoId +
    '/live_comments?access_token=' +
    accessToken +
    '&comment_rate=one_per_two_seconds&fields=from{name,id},message'
);
source.onmessage = function(event) {
  var statusEl = document.getElementById('statusElement');
  var data = JSON.parse(event.data);
  statusEl.innerText = data.message;
};
