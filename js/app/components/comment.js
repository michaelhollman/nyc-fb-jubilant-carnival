define(function(require) { 

  const Handlebars = require("handlebars"); 

  var source   = document.getElementById("comment-template").innerHTML;
  var template = Handlebars.compile(source);

  return { 
    add: function(theEvent) { 
      var dataFromEvent = JSON.parse(theEvent.data);
      var name = dataFromEvent.from ? dataFromEvent.from.name : ""; 
      var html = template({ 
        name: name, 
        comment: dataFromEvent.message
      });
      var containerElement = document.createElement("div"); 
      containerElement.innerHTML = html; 

      document.getElementById("theAreaOfBusiness").appendChild(containerElement);
      console.log(dataFromEvent);

      setTimeout(function(){ 
        containerElement.remove(); 
      }, 3000)
    }
  }
});