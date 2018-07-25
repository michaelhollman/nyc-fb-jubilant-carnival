define(function(require) { 

  const Handlebars = require("handlebars"); 
  const elementRandomizer = require("app/utility/element-randomizer");

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

      elementRandomizer(containerElement);

      document.getElementById("theAreaOfBusiness").appendChild(containerElement);
      console.log(dataFromEvent);

      containerElement.firstElementChild().addEventListener("transitionend", function() { 
        containerElement.remove(); 
      })
    }
  }
});