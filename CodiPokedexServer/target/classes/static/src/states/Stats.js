var CodiPokedex = CodiPokedex || {};
CodiPokedex.Stats = function () { };

CodiPokedex.Stats = {

    preload: function(){
        this.load.image('pokemonImage', 'assets/pokemonImages/' + (pokemonSelected + 1)+ '.png');
    },

    create: function () {

        this.hideHTML();

        //Background
        var background = this.game.add.sprite(0, 0, 'statsBackground');
        background.width = windowWidth;
        background.height = windowHeight;
        background.fixedToCamera = true;

        //Middle part
        //Index
        var pokemonIndex = this.game.add.text(this.game.width / 2, 150, '#' + (pokemonSelected + 1), { font: 'bold 200px Arial', fill: '#fff' });
        pokemonIndex.anchor.setTo(0, 0.5);
        pokemonIndex.x = this.game.width / 2 - (pokemonIndex.width / 2) - 175;
        pokemonIndex.alpha = 0.6;
        //Pokeball Base
        var pokeball = this.game.add.sprite(windowWidth / 2, windowHeight / 2 + 75, 'pokeballBase');
        pokeball.anchor.setTo(0.5);
        pokeball.scale.setTo(0.5);
        //Pokemon name
        var pokemonName = this.game.add.text(this.game.width / 2, this.game.height / 2 + 250, pokemon[pokemonSelected].name, { font: 'bold 75px Arial', fill: '#fff' });
        pokemonName.anchor.setTo(0, 0.5);
        pokemonName.x = this.game.width / 2 - (pokemonName.width / 2) + 25;
        //Pokeball icon
        var pokeballIcon = this.game.add.sprite(pokemonName.x - 75, pokemonName.y, 'pokeballIcon');
        pokeballIcon.anchor.setTo(0.5);
        pokeballIcon.scale.setTo(0.4);
        //Pokemon image
        var pokemonImage = this.game.add.sprite(windowWidth / 2, windowHeight / 2 - 125, 'pokemonImage');
        pokemonImage.anchor.setTo(0.5);
        pokemonImage.scale.setTo(1.2);

        //Back button
        var button = this.game.add.button(10, 10, 'backButton', back, this, 2, 1, 0);
        button.width = 75;
        button.height = 75;

        //Types
        //Type icons   
        var typeText = this.game.add.text(this.game.width / 2 - 175, pokemonName.y + 100, 'Tipo: ', { font: 'bold 40px Arial', fill: '#fff' });
        var icons = this.getType();       
        var type1Icon = this.game.add.existing(icons[0]);
        type1Icon.x = typeText.x + 175;
        type1Icon.y = typeText.y + 30;
        type1Icon.anchor.setTo(0.5);
        type1Icon.scale.setTo(0.4);

        if (pokemon[pokemonSelected].type2 != "") {
            var type2Icon = this.game.add.existing(icons[1]);
            type2Icon.x = type1Icon.x + 120;
            type2Icon.y = type1Icon.y;
            type2Icon.anchor.setTo(0.5);
            type2Icon.scale.setTo(0.4);
    
        }       

        button.onInputOver.add(overButton, this);
        button.onInputOut.add(outButton, this);

        //Profile
        //Background
        var profileBG = this.game.add.sprite(70, 60, 'profileBG');
        profileBG.width = 550;
        profileBG.height = windowHeight - 140;
        //ProfileText
        var profileText = this.game.add.text(profileBG.x + 40, profileBG.y + 30, 'Perfil', { font: 'bold 70px Arial', fill: '#fff' });
        var japanese = this.game.add.text(profileText.x, profileText.y + 140, 'Nombre Japonés', { font: 'bold 35px Arial', fill: '#fff' });
        var height = this.game.add.text(japanese.x, japanese.y + 120, 'Altura', { font: 'bold 35px Arial', fill: '#fff' });
        var weight = this.game.add.text(height.x, height.y + 120, 'Peso', { font: 'bold 35px Arial', fill: '#fff' });
        var ability = this.game.add.text(weight.x, weight.y + 120, 'Habilidad', { font: 'bold 35px Arial', fill: '#fff' });

        this.game.add.text(japanese.x, japanese.y + 50, pokemon[pokemonSelected].japanese_name, { font: '45px Arial', fill: '#000' });
        this.game.add.text(height.x, height.y + 50, pokemon[pokemonSelected].height_m + ' m', { font: '45px Arial', fill: '#000' });
        this.game.add.text(weight.x, weight.y + 50, pokemon[pokemonSelected].weight_kg + ' kg', { font: '45px Arial', fill: '#000' });

        var a = pokemon[pokemonSelected].abilities;
        a = a.replace(/'/g, "");
        a = a.replace("[", "");
        a = a.replace("]", "");
        a = a.split(',');
        this.game.add.text(weight.x, ability.y + 50, a[0], { font: '45px Arial', fill: '#000' })
        this.game.add.text(weight.x - 11, ability.y + 100, a[1], { font: '45px Arial', fill: '#000' })

        //Stats
        var distanceX = 210;
        var distanceY = 70;

        var healthText = this.game.add.text(windowWidth / 2 + 350, 60, 'HP', { font: 'bold 35px Arial', fill: '#fff' })       
        var attackText = this.game.add.text(healthText.x, healthText.y + distanceY, 'Ataque', { font: 'bold 35px Arial', fill: '#fff' })
        var defenseText = this.game.add.text(attackText.x, attackText.y + distanceY, 'Defensa', { font: 'bold 35px Arial', fill: '#fff' })
        var spAttackText = this.game.add.text(defenseText.x, defenseText.y + distanceY, 'Atq Esp', { font: 'bold 35px Arial', fill: '#fff' })
        var spDefenseText = this.game.add.text(spAttackText.x, spAttackText.y + distanceY, 'Def Esp', { font: 'bold 35px Arial', fill: '#fff' })
        var speedText = this.game.add.text(spDefenseText.x, spDefenseText.y + distanceY, 'Velocidad', { font: 'bold 35px Arial', fill: '#fff' })

        //Bars
        var bars = [];
        var y = healthText.y;
        for (let i = 0; i < 6; i++) {
            var bar = this.game.add.sprite(healthText.x + 200, y, 'progressBar');
            bars.push(bar);
            bar.height = 40;
            y+=distanceY;
            
        }
        
        this.game.add.text(healthText.x + distanceX, healthText.y, pokemon[pokemonSelected].hp, { font: '35px Arial', fill: '#fff' });
        bars[0].width = this.calculateBarWidth(bars[0].width, pokemon[pokemonSelected].hp);
        this.game.add.text(attackText.x + distanceX, attackText.y, pokemon[pokemonSelected].attack, { font: '35px Arial', fill: '#fff' });
        bars[1].width = this.calculateBarWidth(bars[1].width, pokemon[pokemonSelected].attack);
        this.game.add.text(defenseText.x + distanceX, defenseText.y, pokemon[pokemonSelected].defense, { font: '35px Arial', fill: '#fff' });
        bars[2].width = this.calculateBarWidth(bars[2].width, pokemon[pokemonSelected].defense);
        this.game.add.text(spAttackText.x + distanceX, spAttackText.y, pokemon[pokemonSelected].sp_attack, { font: '35px Arial', fill: '#fff' });
        bars[3].width = this.calculateBarWidth(bars[3].width, pokemon[pokemonSelected].sp_attack);
        this.game.add.text(spDefenseText.x + distanceX, spDefenseText.y, pokemon[pokemonSelected].sp_defense, { font: '35px Arial', fill: '#fff' });
        bars[4].width = this.calculateBarWidth(bars[4].width, pokemon[pokemonSelected].sp_defense);
        this.game.add.text(speedText.x + distanceX, speedText.y, pokemon[pokemonSelected].speed, { font: '35px Arial', fill: '#fff' });
        bars[5].width = this.calculateBarWidth(bars[5].width, pokemon[pokemonSelected].speed);

        //Debilidades
        var debText = this.game.add.text(windowWidth * (3 / 4) + 120, windowHeight / 2 + 100, 'Débil contra', { font: 'bold 50px Arial', fill: '#fff' })       
        debText.anchor.setTo(0.5);

        var sprites = this.getFortalezas();
        var X = debText.x - 280;
        var xOff = 100;        
        var Y = debText.y + 50;

        for (let i = 0; i < sprites.length; i++) {
            var sprite = this.game.add.existing(sprites[i]);    
            sprite.scale.setTo(0.3);
            sprite.x = X;
            sprite.y = Y;    
            X += xOff;                    
        }

        var debText = this.game.add.text(windowWidth * (3 / 4) + 120, windowHeight / 2 + 300, 'Fuerte contra', { font: 'bold 50px Arial', fill: '#fff' })       
        debText.anchor.setTo(0.5);

        var spritesF = this.getDebilidades();
        var X = debText.x - 280;
        var xOff = 100;        
        var Y = debText.y + 50;

        for (let i = 0; i < spritesF.length; i++) {
            var sprite = this.game.add.existing(spritesF[i]);    
            sprite.scale.setTo(0.3);     
            sprite.x = X;
            sprite.y = Y;    
            X += xOff;                    
        }
    },

    hideHTML() {
        var x = document.getElementById("Busqueda");
        x.style.display = "none";

        x = document.getElementById("tipo1");
        x.style.display = "none";
    },

    calculateBarWidth(originalWidth, value){
        return value * originalWidth / 160;
    },

    getDebilidades(){
        var sprites = [];

        if(pokemon[pokemonSelected].against_bug == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'bugIcon'));
        }

        if(pokemon[pokemonSelected].against_dark == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'darkIcon'));
        }

        if(pokemon[pokemonSelected].against_dragon == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'dragonIcon'));
        }

        if(pokemon[pokemonSelected].against_electric == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'electricIcon'));
        }

        if(pokemon[pokemonSelected].against_fairy == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'flyingIcon'));
        }

        if(pokemon[pokemonSelected].against_fight == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'fuegoIcon'));
        }

        if(pokemon[pokemonSelected].against_fire == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'ghostIcon'));
        }

        if(pokemon[pokemonSelected].against_flying == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'grassIcon'));
        }

        if(pokemon[pokemonSelected].against_ghost == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'groundIcon'));
        }

        if(pokemon[pokemonSelected].against_grass == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'fairyIcon'));
        }

        if(pokemon[pokemonSelected].against_ground == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'iceIcon'));
        }

        if(pokemon[pokemonSelected].against_ice == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'luchaIcon'));
        }

        if(pokemon[pokemonSelected].against_normal == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'normalIcon'));
        }
        
        if(pokemon[pokemonSelected].against_poison == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'posionIcon'));
        }

        if(pokemon[pokemonSelected].against_psychic == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'psychicIcon'));
        }

        if(pokemon[pokemonSelected].against_rock == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'rockIcon'));
        }

        if(pokemon[pokemonSelected].against_steel == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'steelIcon'));
        }

        if(pokemon[pokemonSelected].against_water == 0.5){
            sprites.push(this.game.make.sprite(0, 0, 'waterIcon'));
        }

        return sprites;
    },

    getFortalezas(){
        var sprites = [];

        if(pokemon[pokemonSelected].against_bug == 2){
            sprites.push(this.game.make.sprite(0, 0, 'bugIcon'));
        }

        if(pokemon[pokemonSelected].against_dark == 2){
            sprites.push(this.game.make.sprite(0, 0, 'darkIcon'));
        }

        if(pokemon[pokemonSelected].against_dragon == 2){
            sprites.push(this.game.make.sprite(0, 0, 'dragonIcon'));
        }

        if(pokemon[pokemonSelected].against_electric == 2){
            sprites.push(this.game.make.sprite(0, 0, 'electricIcon'));
        }

        if(pokemon[pokemonSelected].against_fairy == 2){
            sprites.push(this.game.make.sprite(0, 0, 'flyingIcon'));
        }

        if(pokemon[pokemonSelected].against_fight == 2){
            sprites.push(this.game.make.sprite(0, 0, 'fuegoIcon'));
        }

        if(pokemon[pokemonSelected].against_fire == 2){
            sprites.push(this.game.make.sprite(0, 0, 'ghostIcon'));
        }

        if(pokemon[pokemonSelected].against_flying == 2){
            sprites.push(this.game.make.sprite(0, 0, 'grassIcon'));
        }

        if(pokemon[pokemonSelected].against_ghost == 2){
            sprites.push(this.game.make.sprite(0, 0, 'groundIcon'));
        }

        if(pokemon[pokemonSelected].against_grass == 2){
            sprites.push(this.game.make.sprite(0, 0, 'fairyIcon'));
        }

        if(pokemon[pokemonSelected].against_ground == 2){
            sprites.push(this.game.make.sprite(0, 0, 'iceIcon'));
        }

        if(pokemon[pokemonSelected].against_ice == 2){
            sprites.push(this.game.make.sprite(0, 0, 'luchaIcon'));
        }

        if(pokemon[pokemonSelected].against_normal == 2){
            sprites.push(this.game.make.sprite(0, 0, 'normalIcon'));
        }
        
        if(pokemon[pokemonSelected].against_poison == 2){
            sprites.push(this.game.make.sprite(0, 0, 'posionIcon'));
        }

        if(pokemon[pokemonSelected].against_psychic == 2){
            sprites.push(this.game.make.sprite(0, 0, 'psychicIcon'));
        }

        if(pokemon[pokemonSelected].against_rock == 2){
            sprites.push(this.game.make.sprite(0, 0, 'rockIcon'));
        }

        if(pokemon[pokemonSelected].against_steel == 2){
            sprites.push(this.game.make.sprite(0, 0, 'steelIcon'));
        }

        if(pokemon[pokemonSelected].against_water == 2){
            sprites.push(this.game.make.sprite(0, 0, 'waterIcon'));
        }

        return sprites;
    },

    getType(){
        var sprites = [];

        if(pokemon[pokemonSelected].type1 == "bug" ||  pokemon[pokemonSelected].type2 == "bug"){
            sprites.push(this.game.make.sprite(0, 0, 'bugIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "dark" ||  pokemon[pokemonSelected].type2 == "dark"){
            sprites.push(this.game.make.sprite(0, 0, 'bugIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "dragon" ||  pokemon[pokemonSelected].type2 == "dragon"){
            sprites.push(this.game.make.sprite(0, 0, 'bugIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "electric" ||  pokemon[pokemonSelected].type2 == "electric"){
            sprites.push(this.game.make.sprite(0, 0, 'electricIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "flying" ||  pokemon[pokemonSelected].type2 == "flying"){
            sprites.push(this.game.make.sprite(0, 0, 'flyingIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "fire" ||  pokemon[pokemonSelected].type2 == "fire"){
            sprites.push(this.game.make.sprite(0, 0, 'fuegoIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "ghost" ||  pokemon[pokemonSelected].type2 == "ghost"){
            sprites.push(this.game.make.sprite(0, 0, 'ghostIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "grass" ||  pokemon[pokemonSelected].type2 == "grass"){
            sprites.push(this.game.make.sprite(0, 0, 'grassIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "ground" ||  pokemon[pokemonSelected].type2 == "ground"){
            sprites.push(this.game.make.sprite(0, 0, 'groundIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "fairy" ||  pokemon[pokemonSelected].type2 == "fairy"){
            sprites.push(this.game.make.sprite(0, 0, 'fairyIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "ice" ||  pokemon[pokemonSelected].type2 == "ice"){
            sprites.push(this.game.make.sprite(0, 0, 'iceIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "fighting" ||  pokemon[pokemonSelected].type2 == "fighting"){
            sprites.push(this.game.make.sprite(0, 0, 'luchaIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "normal" ||  pokemon[pokemonSelected].type2 == "normal"){
            sprites.push(this.game.make.sprite(0, 0, 'normalIcon'));
        }
        
        if(pokemon[pokemonSelected].type1 == "poison" ||  pokemon[pokemonSelected].type2 == "poison"){
            sprites.push(this.game.make.sprite(0, 0, 'posionIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "psychic" ||  pokemon[pokemonSelected].type2 == "psychic"){
            sprites.push(this.game.make.sprite(0, 0, 'psychicIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "rock" ||  pokemon[pokemonSelected].type2 == "rock"){
            sprites.push(this.game.make.sprite(0, 0, 'rockIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "steel" ||  pokemon[pokemonSelected].type2 == "steel"){
            sprites.push(this.game.make.sprite(0, 0, 'steelIcon'));
        }

        if(pokemon[pokemonSelected].type1 == "water" ||  pokemon[pokemonSelected].type2 == "water"){
            sprites.push(this.game.make.sprite(0, 0, 'waterIcon'));
        }

        return sprites;
    }
}


function back() {
    CodiPokedex.game.state.start('Searcher');
}