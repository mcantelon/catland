window.onload = function() {
  var socket = io.connect();

  var catland = new Catland();
  catland.init();

  // set up key handling
  catland.grout.keypress(function(key) {
    var keycodeDirection = {
      37: 'left',
      39: 'right'
    }

    if (keycodeDirection[key] != undefined) {
      socket.emit('moveCatRequest', {'direction': keycodeDirection[key]});
    }
  });

  socket.on('addCat', function(characteristics) {
    catland.spawn(characteristics);
    catland.grout.draw_all();
  });

  socket.on('removeCat', function(catSpec) {
alert('delete ' + catSpec.cat_id);
    catland.grout.delete_sprite(catSpec.cat_id);
  });

  socket.on('moveCat', function(moveSpec) {
    catland.sprites[moveSpec.cat_id].offset_x = moveSpec.offset_x;
    catland.sprites[moveSpec.cat_id].offset_y = moveSpec.offset_y;
    catland.grout.draw_all();
  });
}
