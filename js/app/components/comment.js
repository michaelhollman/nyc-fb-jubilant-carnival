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
      containerElement.className = "right-floater";
      //

      document.getElementById("theAreaOfBusiness").appendChild(containerElement);
      console.log(dataFromEvent);

      setTimeout(function() { 
        elementRandomizer(containerElement);
        containerElement.className += " trigger-floater";
        containerElement.addEventListener("transitionend", function(ev) { 
          if (ev.propertyName === "opacity") { 
            containerElement.remove(); 
          }
        })
        //ment.className = containerElement.className + " trigger-floater";
      }, 300)

      // containerElement.firstElementChild().addEventListener("transitionend", function() { 
      //   containerElement.remove(); 
      // })
    }
  }
});