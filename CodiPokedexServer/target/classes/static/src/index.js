var CodiPokedex = CodiPokedex || {};
CodiPokedex.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');

//States
CodiPokedex.game.state.add('Boot', CodiPokedex.Boot);
CodiPokedex.game.state.add('Preload', CodiPokedex.Preload);
CodiPokedex.game.state.add('Searcher', CodiPokedex.Searcher);
CodiPokedex.game.state.add('Stats', CodiPokedex.Stats);
CodiPokedex.game.state.add('Creator', CodiPokedex.Creator);
CodiPokedex.game.state.add('Deleter', CodiPokedex.Deleter);

CodiPokedex.game.state.start('Boot');


