window.onload = function() {
  var catNames = {}
    , socket = io.connect();

  var catland = new Catland();
  catland.init();

  // set up key handling
  catland.grout.keypress(function(key) {
console.log(key);
    var keycodeDirection = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
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
    var catName = catNames[moveSpec.cat_id];
    catland.grout.sprites[catName].offset_x = moveSpec.offset_x;
    catland.grout.sprites[catName].offset_y = moveSpec.offset_y;
    catland.grout.draw_all();
  });
}
