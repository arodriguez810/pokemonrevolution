function playvars($scope) {
    $scope.personCheck = function (text, move, pokemon) {
        var textFinal = text.split('$amigo').join($scope.session.name);
        if (move) textFinal = textFinal.split('$move').join(move);
        if (pokemon) textFinal = textFinal.split('$pokemon').join(pokemon);
        return textFinal;
    };
    $scope.personalities = {
        "Grunon": {
            "intro":
                [
                    "Vamos a hacer esto de una vez",
                    "Vamos a resolver esto de inmediato",
                    "Rápido tengo que entrenar mis pokemones",
                    "Rápido no me estés mirando, empecemos",
                    "Amigo rápido o quieres tener una batalla real en vez de pokemon?"
                ],
            "perdiendo":
                [
                    "Que demonios es lo que estás haciendo $amigo?",
                    "Que pasa que mueren tan rapido que fastidio.",
                    "$pokemon tienes que hacer algo!",
                    "Ponganse a esto rápido $pokemon",
                    "$pokemon reacciona no quiero perder"
                ],
            "perdiendomal":
                [
                    "Qué demonios está pasando?",
                    "Ya mátamelos a todos $amigo.",
                    "$pokemon, rápido tira $move",
                    "DEMONIOS!",
                    "QUE PASAAAAA GRRRR!"
                ],
            "ganando":
                [
                    "Termina más rápido $pokemon!",
                    "Más fuerte $pokemon!",
                    "Yo ganaré ríndete rápido.",
                    "No peleaste bien insecto.",
                    "Así no se hace"
                ],
            "ganandofacil":
                [
                    "Pero eres muy lento $amigo",
                    "Pero eres un debilucho $amigo",
                    "Pero ponte en esto rápido!",
                    "$amigo, vas a perder rápido",
                    "Acaso no entrenas?"
                ],
            "alganar":
                [
                    "Era de esperarse, adiós",
                    "Ese era el resultado, adiós",
                    "Vete",
                    "Adiós",
                    "No vuelvas"
                ],
            "alperder":
                [
                    "No te quiero ver más",
                    "Piérdete",
                    "Lárgate",
                    "Te odio $amigo",
                    "No quiero volver a verte por ahora $amigo"
                ],
        },
        "Amable": {
            "intro":
                [
                    "Hola $amigo, espero que este bien",
                    "Hola $amigo, tomemos un tiempo para competir",
                    "Hola $amigo, te ayudaré a entrenar tus pokemones",
                    "Hola $amigo, gracias por mirarme",
                    "$amigo, que gusto verte por aquí"
                ],
            "perdiendo":
                [
                    "Eres un entrenador muy bueno te admiro",
                    "Me da gusto competir contigo espero ser tu amigo",
                    "$pokemon no te esfuerces mucho",
                    "haz tu mejor esfuerzo $pokemon",
                    "$pokemon gracias por prestarme tu fuerza"
                ],
            "perdiendomal":
                [
                    "Estas muy preparado $amigo",
                    "Estas haciendo un buen trabajo $amigo",
                    "$pokemon, ayúdame con $move",
                    "Eres demasiado bueno $amigo!",
                    "Eres un súper entrenador!"
                ],
            "ganando":
                [
                    "Te lo agradezco mucho $pokemon!",
                    "Gracias por luchar tan bien $pokemon",
                    "Espero que no te enoje que yo gane por que quiero ser tu amigo.",
                    "No te preocupes sé que serás mucho mejor",
                    "Eres bueno todos podemos mejorar"
                ],
            "ganandofacil":
                [
                    "Yo estoy dispuesto a enseñarte $amigo",
                    "No te sientas triste la próxima será mejor",
                    "Espero que estés bien con este combate",
                    "$amigo, todos podemos mejorar no te preocupes",
                    "Solo tienes que entrenar más eres muy bueno?"
                ],
            "alganar":
                [
                    "Muy buena batalla ten buen resto del día",
                    "Muy bueno resultado podrás mejorar",
                    "Espero verte pronto",
                    "Nos vemos en otra ocasión, cuídate mucho",
                    "Espero volver a verte amigo"
                ],
            "alperder":
                [
                    "Eres demasiado bueno",
                    "Eres de lo mejor",
                    "Feliz resto del día amigo",
                    "Te admiro $amigo",
                    "Quiero volver a verte $amigo"
                ],
        },
        "Presumido": {
            "intro":
                [
                    "Con que pokemon quieres perder?",
                    "Esto será muy fácil",
                    "Hola $amigo, vas a perder mi tiempo",
                    "Hola $amigo, miraste y ya perderás",
                    "Obvio que yo seré el ganador"
                ],
            "perdiendo":
                [
                    "La suerte te favorece demasiado, solo eso",
                    "Estas seguro que no tienes esteroides?",
                    "$pokemon vamos pelea como siempre!",
                    "No puedes dar un golpe crítico $pokemon?",
                    "$pokemon no luchaste como siempre, eso pasa"
                ],
            "perdiendomal":
                [
                    "Espera estoy un poco distraído $amigo",
                    "La suerte está de tu lado y aun así doy batalla",
                    "$pokemon, tira $move a ver si tengo suerte como $amigo",
                    "Eres demasiado suertudo, así no puedo $amigo!",
                    "Eso es mentira!"
                ],
            "ganando":
                [
                    "Mi victoria es de esperarse!",
                    "Mi $pokemon es normal, lo que pasa que no sabes combatir",
                    "Espero que desinstales desde que termines esta batalla.",
                    "Eso es todo?",
                    "Que obvio!"
                ],
            "ganandofacil":
                [
                    "Wow, mejor juego con la maquina $amigo, me harás perder poder",
                    "Es obvio que nunca podrás ganarme",
                    "Ay Dios mío!, desintalaaaaa",
                    "$amigo, todos podemos mejorar pero creo que tu no",
                    "Mi nivel es muy alto para ti?"
                ],
            "alganar":
                [
                    "Fue una batalla obvia",
                    "Fue muy fácil",
                    "Viste que ibas a perder",
                    "Yo tú y ni paso de cerca por aquí",
                    "La próxima por lo menos hazme sudar"
                ],
            "alperder":
                [
                    "Este ambiente no me favorece",
                    "La suerte tuvo de tu lado",
                    "Esto no pasa siempre, seguro es un error",
                    "Sabes que yo gane como quiera $amigo, verdad?",
                    "Yo te mate algunos aunque seas abusivo"
                ],
        },
        "Modesto": {
            "intro":
                [
                    "Vamos a combatir normal?",
                    "Que sea lo que sea",
                    "Hola $amigo, vamos a combatir",
                    "Hola $amigo, ven",
                    "Cualquiera puede ganar"
                ],
            "perdiendo":
                [
                    "Es normal cualquiera pierde o gana",
                    "Muy bien?",
                    "$pokemon tu puedes!",
                    "Eso $pokemon?",
                    "$pokemon luchaste normal"
                ],
            "perdiendomal":
                [
                    "Es normal que ganes $amigo",
                    "Alguien debe perder aunque sea yo",
                    "$pokemon, prueba $move a ver",
                    "normal $amigo!",
                    "Es normal!"
                ],
            "ganando":
                [
                    "No es que haya hecho nada extraordinario!",
                    "Mi $pokemon es normal, también puede perder",
                    "Un día se gana y otro se pierde",
                    "No hay que preocuparse mucho",
                    "Muy bien!"
                ],
            "ganandofacil":
                [
                    "No es nada del otro mundo",
                    "Seguro me ganas después",
                    "Piensa un poco más",
                    "$amigo, todos podemos mejorar",
                    "Puedes entrenar eso es normal"
                ],
            "alganar":
                [
                    "Fue una batalla normal $amigo",
                    "Fue bien",
                    "Todo muy bien en ambos",
                    "Un día se gana y otro se pierde",
                    "La próxima será normal también"
                ],
            "alperder":
                [
                    "Todo puede pasar",
                    "Muy bien $amigo",
                    "Esto pasa siempre, un día se gana y otro se pierde",
                    "Pudo haber ganado cualquiera",
                    "Todo fluye"
                ],
        },
        "Agresivo": {
            "intro":
                [
                    "batallemos de una vez",
                    "ven de inmediato!",
                    "O entreno o dejo esto",
                    "Deja de mirar o le doy otro uso a la pokebola",
                    "Ven a batallar y cállate?"
                ],
            "perdiendo":
                [
                    "Maldita sea!",
                    "Estos pokemones los voy a abandonar luego de pelear.",
                    "$pokemon has algo o te cambio!",
                    "Ponte rápido $pokemon",
                    "$pokemon si pierdes estas fuera"
                ],
            "perdiendomal":
                [
                    "Que abuso es, te voy a caer a golpes?",
                    "Ningunos sirven voy a cambiar.",
                    "$pokemon, tira $move y cuidado si fallas",
                    "Luego de esta batalla pelearemos!",
                    "QUE PASAAAAA GRRRR!"
                ],
            "ganando":
                [
                    "Ya termina rápido $pokemon!",
                    "Daleeee $pokemon!",
                    "Ríndete ya o necesitas más.",
                    "No vas a reparar eso, ni a los puños.",
                    "Así no se hace"
                ],
            "ganandofacil":
                [
                    "Pero eres muy idiota $amigo",
                    "Pero eres un debilucho $amigo",
                    "Pero ponte en esto rápido!",
                    "$amigo, vas a perder rápido",
                    "Quieres golpe también?"
                ],
            "alganar":
                [
                    "Desaparece sino quieres sufrir",
                    "Ese era el resultado, adiós",
                    "Aléjate de mi vista",
                    "Arranca",
                    "No vuelvas"
                ],
            "alperder":
                [
                    "Si te veo de nuevo te doy",
                    "Piérdete",
                    "Aléjate",
                    "Te pego $amigo",
                    "No quiero volver a verte por ahora $amigo"
                ],
        },
        "Tranquilo": {
            "intro":
                [
                    "Hola $amigo",
                    "$amigo, ven"
                ],
            "perdiendo":
                [
                    "Eres bueno",
                    "Me da gustó",
                    "$pokemon dale",
                    "normal $pokemon",
                    "$pokemon préstame fuerza"
                ],
            "perdiendomal":
                [
                    "Estas muy preparado $amigo",
                    "Estas haciendo un buen trabajo $amigo",
                    "$pokemon, ayúdame con $move",
                    "Eres bueno",
                    "Súper!"
                ],
            "ganando":
                [
                    "bien, $pokemon!",
                    "Gracias $pokemon",
                    "Nítido",
                    "No te preocupes",
                    "Eres bueno aún"
                ],
            "ganandofacil":
                [
                    "$amigo",
                    "Para la próxima",
                    "Estas bien?",
                    "$amigo, todo bien?",
                    "Solo entrena"
                ],
            "alganar":
                [
                    "Bien la batalla",
                    "Gracias",
                    "Nítido",
                    "Adiós",
                    "Nos vemos"
                ],
            "alperder":
                [
                    "Eres bueno",
                    "El mejor",
                    "Adiós",
                    "Nos vemos $amigo",
                    "Siguiente"
                ],
        },
        "Divertido": {
            "intro":
                [
                    "Hola $amigo, esto será divertido vamos!",
                    "Hola $amigo, siiiiii",
                    "Hola $amigo, vamos a divertirnos con nuestros pokemones",
                    "Hola $amigo, me miraste! OMG",
                    "$amigo, que ultra genial verte por aquí!"
                ],
            "perdiendo":
                [
                    "Eres un entrenador demasiado bueno Dios dame tu autógrafo!",
                    "Es demasiado divertidillo contigo espero volver a repetir",
                    "$pokemon daleee que tu puedeees!",
                    "diviértete en tu próximo ataque $pokemon!",
                    "$pokemon eso es gracias!"
                ],
            "perdiendomal":
                [
                    "Estas demasiado preparado pones esto más divertido preparado $amigo",
                    "El trabajo que estás haciendo es divertido $amigo!",
                    "$pokemon, diviérteme con $move!",
                    "Eres el mejor te amo $amigo!",
                    "Eres un súper entrenador!"
                ],
            "ganando":
                [
                    "Esa es la mejor forma de divertirme $pokemon!",
                    "Gracias por luchar tan divertido $pokemon!",
                    "Espero que te estés divirtiendo aunque yo este ganando.",
                    "Espero que te estés divirtiendo aún",
                    "Todo es divertido, una pela, reñido y zumba!"
                ],
            "ganandofacil":
                [
                    "Yo me estoy divirtiendo demasiado $amigo",
                    "No te sientas triste mejor diviértete como quiera",
                    "Este combate esta supeeeeeeeeeeer!!",
                    "$amigo, dale diviértete ahí esta la victoria",
                    "Solo tienes que chilear y más eres bueno"
                ],
            "alganar":
                [
                    "Muy buena batalla ten buen feliz día",
                    "Que gozadora de resultados podrás mejorar",
                    "Espero divertirme pronto",
                    "Nos divertiremos en otra ocasión, cuídate mucho",
                    "Espero volver a divertirme amigo"
                ],
            "alperder":
                [
                    "Eres demasiado divertido",
                    "Eres de lo mejor",
                    "Feliz resto del día amigo!",
                    "Te admiriloooo $amigo!",
                    "Quiero volver a verte, eres muy divertido $amigo"
                ],
        },
        "Holgazan": {
            "intro":
                [
                    "Hola",
                    "Ven"
                ],
            "perdiendo":
                [
                    "Eres bueno",
                    "Wow",
                    "$pokemon",
                    "Ve $pokemon",
                    "$pokemon"
                ],
            "perdiendomal":
                [
                    "Que fuerte $amigo",
                    "Podemos terminar aquí $amigo?",
                    "$pokemon, dale",
                    "Eres!",
                    "Bien!"
                ],
            "ganando":
                [
                    "Ok, $pokemon!",
                    "Gracias $pokemon",
                    "Bien",
                    "Mejor dale a siguiente",
                    "Bueno"
                ],
            "ganandofacil":
                [
                    "$amigo",
                    "Para la próxima",
                    "Buenooo",
                    "$amigo, que fastidio?",
                    "Debemos dejarlo aquí"
                ],
            "alganar":
                [
                    "Bien",
                    "Gracias",
                    "Nos vemos",
                    "Adiós",
                    "Nos vemos"
                ],
            "alperder":
                [
                    "Eres bueno",
                    "Eres bueno",
                    "Adiós",
                    "Nos vemos $amigo",
                    "Siguiente"
                ],
        },
        "Pesimista": {
            "intro":
                [
                    "No, podre con esto!",
                    "Hola $amigo, no te burles de mi",
                    "Hola $amigo, no seas muy duro",
                    "Hola $amigo, me miraste, quieres ganarme también?",
                    "$amigo, que mal que viniste por aquí!"
                ],
            "perdiendo":
                [
                    "Eres un entrenador demasiado bueno pero yo no",
                    "No ganaré",
                    "$pokemon vamos aunque no sirva de nada!",
                    "Vamos a ver tira $move $pokemon",
                    "$pokemon tira lo que sea, no podremos"
                ],
            "perdiendomal":
                [
                    "Estas demasiado preparado yo nunca podré $amigo",
                    "El trabajo que estás haciendo es profesional como yo no haría nunca",
                    "$pokemon, lo siento pero ataca",
                    "Muy buena pelea nunca podría ganarte",
                    "Eres un súper entrenador, no pudiera ser como tu aunque quisiera"
                ],
            "ganando":
                [
                    "Aunque pase esto sé que perderé",
                    "Gracias por luchar tan bien $pokemon, aunque perdamos",
                    "Sé qué harás algo y yo no ganaré",
                    "Me estas dejando ganar",
                    "Todo mal"
                ],
            "ganandofacil":
                [
                    "Estoy muy triste porque sé que me ganaras como quiera $amigo",
                    "No te sientas mal se que algo me saldrá mal",
                    ":(",
                    "$amigo, sé que puedes ganar",
                    "Solo tienes que luchar un poco más y perderé"
                ],
            "alganar":
                [
                    "No puedo creerlo seguro fue suerte la mía",
                    "Esto no fue así para mi ganaste tú, luché mal",
                    "Espero no volver a batallar",
                    "Cuídate mucho",
                    "Yo no gano nunca, peleé mal"
                ],
            "alperder":
                [
                    "Creo que voy a desinstalar",
                    "Quizás cuando vuelvas por aquí, ya no me verás",
                    "Siempre soy el peor",
                    "Soy de lo peor no merecía luchar contigo",
                    "$amigo... soy muy malo"
                ],
        },
        "Optimista": {
            "intro":
                [
                    "Podre con esto!",
                    "Hola $amigo, vamos a batallar",
                    "Hola $amigo, vamos a luchar con nuestros pokemones",
                    "Hola $amigo, me miraste! yo ganaré espero que estés preparado",
                    "$amigo, que genial verte por aquí!"
                ],
            "perdiendo":
                [
                    "Eres un entrenador demasiado bueno pero yo ganaré!",
                    "Aun así yo ganaré",
                    "$pokemon vamos sé que tu ataque vencerá!",
                    "vamos con todo $move $pokemon!",
                    "$pokemon tu puedes, ganaremos!"
                ],
            "perdiendomal":
                [
                    "Estas demasiado preparado pero yo ganaré $amigo",
                    "El trabajo que estás haciendo es estupendo pero perderás $amigo!",
                    "$pokemon, tu puedes $move!",
                    "Muy buena pelea pero yo ganaré $amigo!",
                    "Eres un súper entrenador, pero yo más ya verás"
                ],
            "ganando":
                [
                    "Esa es la mejor forma de yo ganar $pokemon!",
                    "Gracias por luchar tan bien $pokemon!",
                    "Espero que entiendas que yo este ganando.",
                    "Espero que estés planeando algo!",
                    "Todo es súper!"
                ],
            "ganandofacil":
                [
                    "Yo me estoy divirtiendo demasiado $amigo",
                    "No te sientas mal es que soy muy fuerte",
                    "súpeeeeeeeeeeer!!",
                    "$amigo, dale tu puedes también ahí está la victoria",
                    "Solo tienes que luchar con otro porque está la gano yo"
                ],
            "alganar":
                [
                    "Muy buena batalla ten buen feliz día",
                    "Que bien podrás mejorar",
                    "Espero volver a ganar pronto",
                    "Batallaremos siempre, cuídate mucho",
                    "Espero volver a divertirme amigo"
                ],
            "alperder":
                [
                    "La próxima voy a ganar!",
                    "No me rendiré seré el mejor",
                    "Tengo que ser siempre el mejor!",
                    "Seré mejor que nadie más aun así!",
                    "Quiero volver a verte, eres muy interesante $amigo"
                ],
        }

    };

    $scope.frameSetSave = 500;
    $scope.medals1 = [
        {type: 'Bicho', name: 'BugCatcher'},
        {type: 'Ave', name: 'BirdKeeper'},
        {type: 'Oscuro', name: 'Delinquent'},
        {type: 'Acero', name: 'DepotAgent'},
        {type: 'Ada', name: 'FairyTaleGirl'},
        {type: 'Fantasma', name: 'HexManiac'},
        {type: 'Normal', name: 'PunkGirl'},
        {type: 'Tierra', name: 'RuinManiac'},
        {type: 'Hielo', name: 'Skier'}
    ];
    $scope.medals2 = [
        {type: 'Fuego', name: 'Kindler'},
        {type: 'Agua', name: 'Swimmer'},
        {type: 'Planta', name: 'Gardener'},
        {type: 'Electrico', name: 'Rocker'},
        {type: 'Roca', name: 'Hiker'},
        {type: 'Síquico', name: 'Psychic'},
        {type: 'Dragón  ', name: 'DragonTamer'},
        {type: 'Peleador', name: 'BlackBelt'},
        {type: 'Veneno', name: 'PunkGirl'},
    ];
    $scope._colors = _colors;
    $scope._colorsReal = _colorsReal;
    $scope.routesTick = 3;
    $scope.loadedSounds = [];
    $scope.extraResources = [];
    $scope.sounds = {};
    $scope.BATTLEOBJS = {};
    $scope.animationConfig = {
        "down": {frames: [1]},
        "up": {frames: [10]},
        "left": {frames: [4]},
        "right": {frames: [7]},
        "wdown": {frames: [0, 1, 2, 1]},
        "wup": {frames: [9, 10, 11, 10]},
        "wleft": {frames: [3, 4, 5, 4]},
        "wright": {frames: [6, 7, 8, 7]},
        "gire": {frames: [10, 4, 1, 7, 10, 4, 1, 7]}
    };
    $scope.peopleAnimationConfig = {
        "stand": [0, 2, "stand", 0.5],
        "punch": [3, 5, "stand", 0.5],
        "evade": [6, 7, 8, 7, "stand", 0.5],
        "bad": [9, 10, 11, 10, "stand", 0.5],
        "order": [12, 14, "stand", 0.5],
        "happy": [15, 16, 17, 16, "stand", 0.5],
        "confiado": [18, 19, 20, 19, "stand", 0.5],
        "point_bad": [21, 22, 23, 22, "stand", 0.5],
        "sad": [24, 25, 26, 25, "stand", 0.5],
        "stand_fight": [27, 28, 29, 28, "stand", 0.5],
        "stand_fight_interrogation": [30, 31, 32, 31, "stand", 0.5],
        "sad_2": [33, 34, 35, 34, "stand", 0.5],
        "hurt": [36, 37, 38, 37, "stand", 0.5],
        "stand_order": [39, 40, 41, 40, "stand", 0.5],
        "sad_3": [42, 43, 44, 43, "stand", 0.5],
        "evade_2": [45, 46, 47, 46, "stand", 0.5],
        "animate": [48, 49, 50, 49, "stand", 0.5],
        "dead": [51, 52, 53, 52, "stand", 0.5]
    };
    $scope.extras = {};
    $scope.indexTick = 0;
    $scope.spriteFrames = 3;
    $scope.playerFrames = 12;
    $scope.pause = false;
    $scope.block = false;
    $scope.width = 12;
    $scope.height = 8;
    $scope.baseHeight = 48;

    $scope.peopleWidth = 64;
    $scope.peopleHeight = 64;

    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.midHeight = $scope.baseHeight / 2;
    $scope.midWidth = $scope.baseWidth / 2;
    $scope.researchMove = false;
    $scope.messageQuee = [];
    $scope.messageChoices = [];
    $scope.notificationText = "...";
    $scope.dialogText = "...";
    $scope.dialogHero = "...";
    $scope.dialogTiming = 0;
    $scope.dialogButtons = [{
        text: "OK", click: function () {
            ACTIONS.MESSAGE.REPLAY();
        }
    }];
    $scope.transitions = "";
    $scope.bubble = null;
    $scope.bubbleText = "...";
    $scope.animations = [];
    $scope.battleObjects = {};
    mapQueues = {};
    players = {};
    maps = {};
    STAGE = new createjs.Stage("game");
    ANIMATIONSSTAGE = new createjs.Stage("animations");
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    STAGE.snameToPixelsEnabled = true;
    STAGE.snapToPixelEnabled = true;
    createjs.Ticker.addEventListener("tick", STAGE);
    createjs.Ticker.addEventListener("tick", ANIMATIONSSTAGE);
    createjs.Touch.enable(STAGE);
    ANIMATIONSSTAGE.mouseEnabled = false;
    ANIMATIONSSTAGE.mouseChildren = false;
    createjs.Ticker.maxDelta = 30;
    for (var l = 0; l <= 9; l++) {
        eval(`layer${l} = new createjs.Container();`);
        eval(`STAGE.addChild(layer${l});`);
    }
    eval(`layerBattle = new createjs.Container();`);
    eval(`STAGE.addChild(layerBattle);`);

    eval(`layerAnimation = new createjs.Container();`);
    eval(`ANIMATIONSSTAGE.addChild(layerAnimation);`);

    $scope.hero = {
        x: 0,
        y: 0,
        l: 1,
        body: null,
        shadow: null,
        speed: 300,
        base_speed: 300,
        walking: false,
        route: [],
        canJump: true,
        canDive: true,
        canFly: true,
        canBreak: true,
        canHide: true,
        canMove: true,
        canWater: true,
        deeping: false,
        flying: false,
        isPlayer: true,
        shadowY: 8,
        name: ""
    };
    $scope.NPCS = [];
    $scope.OBJECTS = [];

    //Bound And Calcs
    $scope.bounds = function () {
        return {
            width: $scope.width * $scope.baseWidth,
            height: $scope.height * $scope.baseHeight
        };
    };
    difference = function (a, b) {
        return Math.abs(a - b);
    };
    $scope.icon = function (index) {
        index = parseInt(index);
        return {x: (Math.ceil((index - 0.01) % 16) - 1) * 32, y: (Math.ceil((index / 16) - 0.01) - 1) * 32};
    };
    $scope.collision = function (hero, cx, cy) {
        if (cx < 0 || cy < 0)
            return true;
        if (cx >= maps[FIRSTMAP].width || cy >= maps[FIRSTMAP].height)
            return true;
        if (hero.flying)
            return false;
        if (maps[FIRSTMAP]) {
            var collisions = [];

            if (hero.l === 0) {
                var object = maps[FIRSTMAP].map[`${1}_${cx}_${cy}`];
                collisions.push(object.mode !== "A1");
                setTimeout(async () => {
                    await $scope.clickEvent(hero, cx, cy, E_trigger.collision);
                }, 500);
                return collisions.indexOf(true) !== -1;
            } else {
                var object = maps[FIRSTMAP].map[`${hero.l}_${cx}_${cy}`];
                if (object) {
                    collisions.push(object.mode === "A1");
                    collisions.push(object.mode === "A1_B");
                    if (hero.l === 2) {
                        collisions.push(object.mode === "A3");
                    }
                }

                collisions.push(maps[FIRSTMAP].map[`${hero.l + 1}_${cx}_${cy}`] !== undefined);

                for (var i in $scope.NPCS) {
                    var NPC = $scope.NPCS[i];
                    if (NPC) {
                        if (NPC.body.visible) {
                            if (NPC.x === cx && NPC.y === cy)
                                if (NPC.l === hero.l || NPC.l === (hero.l + 1))
                                    collisions.push(true);
                            if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {
                                if (NPC.event.trigger === E_trigger.near) {
                                    var xrange = {
                                        min: NPC.x - NPC.event.trigger_step,
                                        max: NPC.x + NPC.event.trigger_step
                                    };
                                    var yrange = {
                                        min: NPC.y - NPC.event.trigger_step,
                                        max: NPC.y + NPC.event.trigger_step
                                    };
                                    if (hero.x >= xrange.min && hero.x <= xrange.max)
                                        if (hero.y >= yrange.min && hero.y <= yrange.max) {
                                            ACTIONS.NPC.LOOK(hero, NPC);
                                            ACTIONS.NPC.LOOK(NPC, hero);
                                            if (eval(NPC.event.conditions))
                                                $scope.runActions(OSO(NPC.event.actions));
                                        }
                                }
                            }
                        }
                    }
                }

                for (var i in $scope.OBJECTS) {
                    var OBJ = $scope.OBJECTS[i];
                    if (OBJ) {
                        if (OBJ.body.visible) {
                            if (OBJ.x === cx && OBJ.y === cy) {
                                if (OBJ.l === hero.l || OBJ.l === (hero.l + 1))
                                    collisions.push(true);
                            }
                            if (OBJ.l === hero.l || OBJ.l === (hero.l + 1)) {
                                if (OBJ.event.trigger === E_trigger.near) {
                                    var xrange = {
                                        min: OBJ.x - OBJ.event.trigger_step,
                                        max: OBJ.x + OBJ.event.trigger_step
                                    };
                                    var yrange = {
                                        min: OBJ.y - OBJ.event.trigger_step,
                                        max: OBJ.y + OBJ.event.trigger_step
                                    };
                                    if (hero.x >= xrange.min && hero.x <= xrange.max)
                                        if (hero.y >= yrange.min && hero.y <= yrange.max) {
                                            if (eval(OBJ.event.conditions))
                                                $scope.runActions(OSO(OBJ.event.actions));
                                        }
                                }
                            }
                        }
                    }
                }

                if (hero.isNPC) {
                    if ($scope.hero.x === cx && $scope.hero.y === cy)
                        collisions.push(true);
                }
                if (!hero.isObject)
                    for (var l = hero.l; l >= 1; l--) {
                        collisions.push(
                            maps[FIRSTMAP].map[`${hero.l - l}_${cx}_${cy}`] !== undefined &&
                            maps[FIRSTMAP].map[`${hero.l}_${cx}_${cy}`] === undefined
                        );
                    }

                if (collisions.indexOf(true) !== -1) {
                    $scope.numberCollisions++;
                    if ($scope.numberCollisions % 70 === 0)
                        $scope.play("Collision", SOUNDS.system);
                }
            }
            return collisions.indexOf(true) !== -1;
        }
    };
    $scope.numberCollisions = 0;
    //Animations
    $scope.traslades = function (hero, events, callback) {
        if (events.length > 0) {
            var event = OSO(events[0]);
            events.shift();
            $scope.traslade(hero, event.animation, event.point, event.repeat, events, callback);
        } else {
            if (callback)
                callback();
        }
    };
    $scope.runCamera = function (hero, newxN, newyN, speed) {
        if (hero.isPlayer) {
            var cameraX = newxN - (($scope.width / 2) * $scope.baseWidth);
            var cameraY = newyN - (($scope.height / 2) * $scope.baseHeight);

            var regX = cameraX < 0 ? 0 : cameraX;
            var regY = cameraY < 0 ? 0 : cameraY;
            if (regX !== 0) {
                var limitX = ((maps[FIRSTMAP].width * $scope.baseWidth) - ($scope.width * $scope.baseWidth));
                regX = regX > limitX ? limitX : regX;
            }
            if (regY !== 0) {
                var limitY = ((maps[FIRSTMAP].height * $scope.baseHeight) - ($scope.height * $scope.baseHeight));
                regY = regY > limitY ? limitY : regY;
            }
            ANIMATIONSSTAGE.regX = regX;
            ANIMATIONSSTAGE.regY = regY;
            createjs.Tween.get(STAGE).to({regX: regX, regY: regY}, speed);
        }
    };
    $scope.traslade = function (hero, animation, point, repeat, events, callback) {
        if (!hero.body)
            return;
        var newx = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
        var newy = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;

        var newxN = !isNaN(Math.floor(point.x)) ? Math.floor(point.x) : hero.body.x;
        var newyN = !isNaN(Math.floor(point.y)) ? Math.floor(point.y) : hero.body.y;

        if ($scope.collision(hero, newx, newy)) {
            hero.walking = false;
            if (hero.isObject) {

            } else {
                if (hero.body) {
                    hero.body.gotoAndPlay(animation);
                    for (var wing of ["wing1", "wing2"])
                        hero["body" + wing].gotoAndPlay(animation);
                }
            }
            $scope.researchMove = !$scope.researchMove;
            return;
        }
        if (hero.isObject) {
        } else {
            if (hero.body) {
                hero.body.gotoAndPlay("w" + animation);
                for (var wing of ["wing1", "wing2"])
                    hero["body" + wing].gotoAndPlay("w" + animation);
            }
        }

        if (hero.shadow) {
            var shadow = OSO(point);
            if (shadow.y !== undefined)
                shadow.y += hero.shadowY;
            createjs.Tween.get(hero.shadow).to(shadow, hero.speed);
        }

        for (var wing of ["wing1", "wing2"]) {
            if (hero["body" + wing]) {
                var shadowD = OSO(point);
                createjs.Tween.get(hero["body" + wing]).to(shadowD, hero.speed);
            }
        }

        $scope.runCamera(hero, newxN, newyN, hero.speed);


        createjs.Tween.get(hero.body).to(point, hero.speed).call(async function () {
            hero.x = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
            hero.y = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;
            if (!hero.deeping)
                $scope.play("steps" + FIRSTMAP, SOUNDS.steps);
            if (repeat <= 1) {
                if (events.length > 0) {
                    $scope.traslades(hero, events, callback);
                } else {
                    hero.walking = false;
                    if (hero.isObject) {
                    } else {
                        if (hero.body) {
                            hero.body.gotoAndPlay(animation);
                            for (var wing of ["wing1", "wing2"])
                                hero["body" + wing].gotoAndPlay(animation);
                        }
                        if (callback)
                            callback();
                    }
                }
            } else {
                if (animation === "left")
                    point.x -= $scope.baseWidth;
                if (animation === "right")
                    point.x += $scope.baseWidth;
                if (animation === "up")
                    point.y -= $scope.baseHeight;
                if (animation === "down")
                    point.y += $scope.baseHeight;
                $scope.traslade(hero, animation, point, --repeat, events, callback);
            }
        });
    };
    $scope.teleport = function (hero, point, animation) {
        var newx = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
        var newy = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;

        var newxN = !isNaN(Math.floor(point.x)) ? Math.floor(point.x) : hero.body.x;
        var newyN = !isNaN(Math.floor(point.y)) ? Math.floor(point.y) : hero.body.y;

        if ($scope.collision(hero, newx, newy)) {
            if (hero.isObject) {

            } else {
                if (hero.body)
                    hero.body.gotoAndPlay(animation);
            }
            return;
        }

        if (hero.shadow) {
            var shadow = OSO(point);
            if (shadow.y !== undefined)
                shadow.y += hero.shadowY;
            createjs.Tween.get(hero.shadow).to(shadow, 1);
        }
        hero.x = newx;
        hero.y = newy;

        for (var wing of ["wing1", "wing2"]) {
            if (hero["body" + wing]) {
                var shadowD = OSO(point);
                createjs.Tween.get(hero["body" + wing]).to(shadowD, hero.speed);
            }
        }

        $scope.runCamera(hero, newxN, newyN, 1000);

        createjs.Tween.get(hero.body).to(point, 1);
        if (hero.body)
            hero.body.gotoAndPlay(animation);
    };
    $scope.moveMe = function (event) {
        if ($scope.block)
            return;
        if ($scope.pause)
            return;
        if ($scope.hero.body)
            $scope.moveOld($scope.hero, event, true);
    };
    $scope.moveMeMove = function (event) {
        if ($scope.block)
            return;
        if ($scope.pause)
            return;
        if ($scope.hero.body)
            $scope.move($scope.hero, event);
    };
    $scope.moveOld = async function (hero, event, actions, callback) {
        if (hero) {
            if ($scope.pause)
                return;
            if (!hero.walking) {
                var local = STAGE.globalToLocal(event.stageX, event.stageY);
                var cx = Math.floor(local.x / $scope.baseWidth);
                var cy = Math.floor(local.y / $scope.baseHeight);
                ACTIONS.PLAYER.LOOKDIR(cx, cy);
                if (actions) {
                    var wasEvent = await $scope.clickEvent(hero, cx, cy, E_trigger.click);
                    if (wasEvent)
                        return;
                }
            }
        }
    };
    $scope.lastEventCollision = "";
    $scope.move = async function (hero, event, actions, callback) {

        if (hero) {
            if ($scope.pause)
                return;
            if (!hero.walking) {
                var local = STAGE.globalToLocal(event.stageX, event.stageY);
                var cx = Math.floor(local.x / $scope.baseWidth);
                var cy = Math.floor(local.y / $scope.baseHeight);
                if (actions) {
                    var wasEvent = await $scope.clickEvent(hero, cx, cy, E_trigger.click);
                    if (wasEvent || wasEventC)
                        return;
                }
                hero.walking = true;
                var dx = difference(cx, hero.x);
                var dy = difference(cy, hero.y);
                if (dx === 0 && dy === 0) {
                    hero.walking = false;
                    return;
                }
                var events = [];
                if (eval(`dx ${$scope.researchMove ? '>' : '<'} dy`)) {
                    $scope.createEvent(events, hero, cx, cy, dx, dy, "x");
                    $scope.createEvent(events, hero, cx, cy, dx, dy, "y");
                } else {
                    $scope.createEvent(events, hero, cx, cy, dx, dy, "y");
                    $scope.createEvent(events, hero, cx, cy, dx, dy, "x");
                }
                if ($scope.lastEventCollision !== `${cx}x${cy}`) {
                    $scope.lastEventCollision = `${cx}x${cy}`;
                    for (var i in $scope.OBJECTS) {
                        if ($scope.OBJECTS[i].event.trigger === E_trigger.collision) {
                            $scope.clickEvent(hero, cx, cy, E_trigger.collision);
                        }
                    }
                }
                $scope.traslades(hero, events, callback);
            }
        }
    };
}