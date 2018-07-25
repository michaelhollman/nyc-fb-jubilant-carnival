define(function(require) {
  const Handlebars = require('handlebars');

  const source = document.getElementById('reaction-template').innerHTML;
  const template = Handlebars.compile(source);
  const allReactionTypes = [
    'LIKE',
    'LOVE',
    'WOW',
    'HAHA',
    'SAD',
    'ANGRY',
    'THANKFUL',
    'PRIDE',
  ];

  let lastState = undefined;

  return {
    add: function(theEvent) {
      const data = JSON.parse(theEvent.data);
      const newState = data.reaction_stream.reduce((accum, reaction) => {
        accum[reaction.key] = reaction.value;
        return accum;
      }, {});

      let delta = {};
      allReactionTypes.forEach(reactionType => {
        const last = lastState && lastState[reactionType];
        const nnew = newState[reactionType];
        const diff = nnew - (last || 0);
        if (lastState && nnew && diff > 0) {
          delta[reactionType] = diff;
        }
      });
      lastState = newState;

      Object.keys(delta).forEach(reactionType => {
        console.log(reactionType + ' ' + delta[reactionType]);
        const html = template({
          reaction: reactionType.toLocaleLowerCase(),
        });

        const containerElement = document.createElement('div');
        containerElement.innerHTML = html;
        document
          .getElementById('theAreaOfBusiness')
          .appendChild(containerElement);

        setTimeout(function() {
          containerElement.remove();
        }, 3000);
      });
    },
  };
});
