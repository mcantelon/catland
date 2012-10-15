window.onload = function() {
  var catNames = {}
    , socket = io.connect();

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
    catNames[characteristics.socket_id] = catland.spawn(characteristics);
    catland.grout.draw_all();
  });

  socket.on('removeCat', function(catSpec) {
    var catName = catNames[catSpec.cat_id];
    catland.grout.delete_sprite(catName);
    catland.grout.draw_all();
  });

  socket.on('moveCat', function(moveSpec) {
console.log(catland.grout.sprites);
    catland.grout.sprites[moveSpec.cat_id].offset_x = moveSpec.offset_x;
    catland.grout.sprites[moveSpec.cat_id].offset_y = moveSpec.offset_y;
    catland.grout.draw_all();
  });
}
