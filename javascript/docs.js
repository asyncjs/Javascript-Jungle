jj.createCreature('docs', function (layer) {
  // we don't need layer for this as it's provided.
  layer.el.remove();
  layer.data({background: true;});
  jj.bind('midnight',function() {
    jj.get('chat').trigger('log','View <a href="https://github.com/asyncjs/Javascript-Jungle/wiki/api">documentation</a>');
  });
});