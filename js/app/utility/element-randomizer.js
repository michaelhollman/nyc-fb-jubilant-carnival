define(function(require) { 
  const quadrants = [
    { top: 0, left: 0, bottom: 540, right: 960 },
    { top: 0, left: 960, bottom: 540, right: 1920 },
    { top: 540, left: 0, bottom: 1080, right: 960 },
    { top: 540, left: 960, bottom: 1080, right: 1920 }
  ]; 

  function randomNumber(x, y) {
    var length = y - x + 1; 
    return Math.floor((Math.random() * length) + x); 
  }

  return function(element) {
    const quadrantNum = randomNumber(0, quadrants.length - 1);
    const quadrant = quadrants[quadrantNum];
    var xPosition = randomNumber(quadrant.left, quadrant.right); 
    var yPosition = randomNumber(quadrant.top, quadrant.bottom); 

    if (quadrantNum === 1 || quadrantNum === 3) { 
      xPosition -= element.clientWidth - 100; 
    } else if (xPosition < 100) { 
      xPosition = 100;
    }

    if (quadrantNum === 2 || quadrantNum === 3) { 
      yPosition -= element.clientHeight - 100; 
    } else if (yPosition < 100) { 
      yPosition = 100; 
    }

    element.style.position = "absolute";
    element.style.top = yPosition + "px"; 
    element.style.left = xPosition + "px";

    console.log({ 
      xPosition, 
      yPosition
    });

  }
});