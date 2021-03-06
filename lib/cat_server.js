var socketio = require('socket.io')
  , catCharacteristics = {};

exports.catWidthInTiles = 6;
exports.catHeightInTiles = 4;

exports.widthInTiles = exports.catWidthInTiles * 15;
exports.heightInTiles = exports.catHeightInTiles * 8;

exports.listen = function(server) {
  var io = socketio.listen(server);
  io.set('log level', 1);

  io.sockets.on('connection', function (socket) {
    // describe existing cats to new user
    for(var id in catCharacteristics) {
      socket.emit('addCat', catCharacteristics[id]);
    }

    // generate cat for new user and let all clients know
    catCharacteristics[socket.id] = exports.randomCatCharacteristics();
    catCharacteristics[socket.id].socket_id = socket.id;
    socket.broadcast.emit('addCat', catCharacteristics[socket.id]);
    socket.emit('addCat', catCharacteristics[socket.id]);

    socket.on('moveCatRequest', function(moveData) {
      switch(moveData.direction) {
        case 'left':
          if (catCharacteristics[socket.id].offset_x > 0) {
            catCharacteristics[socket.id].offset_x--;
          }
          break;
        case 'right':
          if (catCharacteristics[socket.id].offset_x < (exports.widthInTiles - exports.catWidthInTiles)) {
            catCharacteristics[socket.id].offset_x++;
          }
          break;
        case 'up':
          if (catCharacteristics[socket.id].offset_y > 0) {
            catCharacteristics[socket.id].offset_y--;
          }
          break;
        case 'down':
          if (catCharacteristics[socket.id].offset_y < (exports.heightInTiles - exports.catHeightInTiles)) {
            catCharacteristics[socket.id].offset_y++;
          }
          break;
      }

      // broadcast movement to all
      var moveSpec = {
        'cat_id':   socket.id,
        'offset_x': catCharacteristics[socket.id].offset_x,
        'offset_y': catCharacteristics[socket.id].offset_y
      };
      socket.broadcast.emit('moveCat', moveSpec);
      socket.emit('moveCat', moveSpec);
    });

    socket.on('disconnect', function() {
      delete catCharacteristics[socket.id];
      socket.broadcast.emit('removeCat', {'cat_id': socket.id});
    });
  });
};

exports.randomCatCharacteristics = function() {
    var catColours = [
      'brown',
      'black'
    ];

    return {
      'offset_x': Math.floor(Math.random(1) * (exports.widthInTiles - exports.catWidthInTiles)),
      'offset_y': Math.floor(Math.random(1) * (exports.heightInTiles - exports.catHeightInTiles)),
      'colour': catColours[Math.floor(Math.random(1) * catColours.length)]
    };
};
