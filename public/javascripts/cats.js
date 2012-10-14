function Catland() {}

Catland.prototype = {

  tileSize: 8,
  catId: 1,
  widthInTiles: 0,
  heightInTiles: 0,
  catWidthInTiles: 0,
  catHeightInTiles: 0,

  init: function() {
    // determine sizing
    this.catWidthInTiles = 6;
    this.catHeightInTiles = 5;
    this.widthInTiles = this.catWidthInTiles * 15;
    this.heightInTiles = this.catHeightInTiles * 8;

    // initialize Grout
    this.grout = new Grout({
      'width':  this.widthInTiles,
      'height': this.heightInTiles,
      'tile_width':  this.tileSize,
      'tile_height': this.tileSize,
      'render_mode': 'sharp',
      'canvas_id': 'grout'
    });

    // spawn cats
    for(var i = 0; i < 10; i++) {
      var cat = this.spawn();
    }

    // draw everything
    this.grout.draw_all()
  },

  randomCatCharacteristics: function() {
    var catColours = [
      'brown',
      'black'
    ];

    return {
      'offset_x': Math.floor(Math.random(1) * (this.widthInTiles - this.catWidthInTiles)),
      'offset_y': Math.floor(Math.random(1) * (this.heightInTiles - this.catHeightInTiles)),
      'colour': catColours[Math.floor(Math.random(1) * catColours.length)]
    };
  },

  spawn: function() {
    var characteristics = this.randomCatCharacteristics();

    this.catId++;

    var cat = this.grout.sprite(
      this.catId, {
        'tile_width': this.tileSize,
        'tile_height': this.tileSize
      }
    );

    cat.make_sprite(" \
      A...AA \
      A...AA \
      AAAAA. \
      A...A. \
    ", {'A': characteristics.colour});

    cat.offset_x = characteristics.offset_x;
    cat.offset_y = characteristics.offset_y;

    return cat;
  }
}
