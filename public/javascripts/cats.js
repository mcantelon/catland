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
    this.catHeightInTiles = 4;
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

    // draw everything
    this.grout.draw_all()
  },

  spawn: function(characteristics) {
    this.catId++;

    var name = 'cat_' + this.catId,
        cat = this.grout.sprite(
          name, {
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

    return name;
  }
}
