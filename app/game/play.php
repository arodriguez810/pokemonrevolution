<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-light-green">
<!-- Page Loader -->
<?php include_once($path . '/loader.php') ?>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<meta name="google-signin-scope" content="profile email">
<meta name="google-signin-client_id"
      content="1002650457102-g4ah8p7emgshiodlnohdj9dr7jb6ldca.apps.googleusercontent.com">
<script src="https://apis.google.com/js/platform.js" async defer></script>
<div style="display: none" class="g-signin2" data-onsuccess="onSignIn"></div>
<!-- #END# Overlay For Sidebars -->
<!-- Search Bar -->

<!-- #END# Search Bar -->
<!-- Top Bar -->
<!-- #Top Bar -->
<style>
    #play {

    }

    body {
        background-color: black;
    }

    canvas {
        width: 100%;
    }

    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {
        color: #fff !important;
        cursor: default;
        background-color: #2196F3 !important;;
        border: 1px solid #2196F3 !important;;
        border-bottom-color: transparent;
    }

</style>
<meta name="viewport" content="width=device-width, initial-scale=1">
<?PHP

?>
<body oncontextmenu="return false;" style="overflow: hidden">

<section id="play" ng-app="pokemon" ng-controller="play" style="position: relative">
    <canvas style="position: absolute"
            width="{{bounds().width}}"
            height="{{bounds().height}}"
            id="game">
    </canvas>

    <div id="footer" style="position: absolute;margin: 10px;opacity: 0.8;z-index: 9999">

        <button ng-show="menu" type="button" onclick="ACTIONS.GAME.MENUTOGGLE()" style="margin-bottom: 10px"
                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
            <i class="material-icons">view_list</i>
        </button>

        <div ng-show="menuOpen" style="font-size: 18px;color: #fff0ff">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#menu_perfil" data-toggle="tab">
                        <i class="material-icons">face</i> Perfil
                    </a>
                </li>
                <li role="presentation">
                    <a href="#menu_pokemones" data-toggle="tab">
                        <i class="material-icons">adb</i> Pokemones
                    </a>
                </li>
                <li role="presentation">
                    <a href="#menu_objetos" data-toggle="tab">
                        <i class="material-icons">card_travel</i> Objetos
                    </a>
                </li>
                <li role="presentation">
                    <a href="#menu_logros" data-toggle="tab">
                        <i class="material-icons">grade</i> Logros
                    </a>
                </li>
                <li role="presentation">
                    <a href="#menu_setting" data-toggle="tab">
                        <i class="material-icons">settings</i>
                    </a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" style="color: white" class="tab-pane fade animated flipInX in active"
                     id="menu_perfil">


                    <table class="table-bordered">
                        <tr>
                            <td class="bg-blue">
                                {{hero.name}}
                            </td>
                            <td class="bg-pink" colspan="9" style="text-align: center">
                                Medallas
                            </td>
                        </tr>
                        <tr>
                            <td class="bg-blue-grey" rowspan="3" style="text-align: center !important;">
                                <img width="100" src="data/players/{{session.MU}}/images/face.png?{{hero.version}}">
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td ng-repeat="(key,medal) in medals1" style="text-align: center">
                                <img ng-show="!session['medal_'+medal.type]" width="32" height="32"
                                     src="../resources/poekemon/medals/{{medal.name}}_shadow.png">
                                <img ng-show="session['medal_'+medal.type]" width="32" height="32"
                                     src="../resources/poekemon/medals/{{medal.name}}_{{session['medal_'+medal.type]}}.png">
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td ng-repeat="(key,medal) in medals2" style="text-align: center">
                                <img ng-show="!session['medal_'+medal.type]" width="32" height="32"
                                     src="../resources/poekemon/medals/{{medal.name}}_shadow.png">
                                <img ng-show="session['medal_'+medal.type]" width="32" height="32"
                                     src="../resources/poekemon/medals/{{medal.name}}_{{session['medal_'+medal.type]}}.png">
                                <br>
                            </td>
                        </tr>
                    </table>


                </div>
                <div role="tabpanel" class="tab-pane fade animated flipInX" id="menu_pokemones">
                    <b>Profile Content</b>
                    <p>
                        Lorem ipsum dolor sit amet, ut duo atqui exerci dicunt, ius impedit mediocritatem an. Pri ut
                        tation electram moderatius.
                        Per te suavitate democritum. Duis nemore probatus ne quo, ad liber essent aliquid
                        pro. Et eos nusquam accumsan, vide mentitum fabellas ne est, eu munere gubergren
                        sadipscing mel.
                    </p>
                </div>
                <div role="tabpanel" class="tab-pane fade animated flipInX" id="menu_objetos">
                    <b>Message Content</b>
                    <p>
                        Lorem ipsum dolor sit amet, ut duo atqui exerci dicunt, ius impedit mediocritatem an. Pri ut
                        tation electram moderatius.
                        Per te suavitate democritum. Duis nemore probatus ne quo, ad liber essent aliquid
                        pro. Et eos nusquam accumsan, vide mentitum fabellas ne est, eu munere gubergren
                        sadipscing mel.
                    </p>
                </div>
                <div role="tabpanel" class="tab-pane fade animated flipInX" id="menu_logros">
                    <b>Message Content</b>
                    <p>
                        Lorem ipsum dolor sit amet, ut duo atqui exerci dicunt, ius impedit mediocritatem an. Pri ut
                        tation electram moderatius.
                        Per te suavitate democritum. Duis nemore probatus ne quo, ad liber essent aliquid
                        pro. Et eos nusquam accumsan, vide mentitum fabellas ne est, eu munere gubergren
                        sadipscing mel.
                    </p>
                </div>
                <div role="tabpanel" class="tab-pane fade animated flipInX" id="menu_setting">
                    <b>Configuración</b>
                    <table class="table-bordered">
                        <tr>
                            <td>
                                <a href="#" onclick="signOut();">Sign out</a>
                                <script>
                                    function signOut() {
                                        var auth2 = gapi.auth2.getAuthInstance();
                                        auth2.signOut().then(function () {
                                            location.href = "index.php";
                                        });
                                    }
                                </script>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>

    </div>
    <div style="position: absolute;display: none;width: 100%;z-index: 99999" id="texts">

        <div class="DialogWindow" style="min-height: 172px;min-width: 600px">

            <div class="DialogTitle">
                <img style="float: right" src="data/characters_file/{{dialogHero.name}}/face.png?{{dialogHero.version}}"
                     onclick="ACTIONS.MESSAGE.REPLAY()">
                <label style="font-size: 18px;color: #673AB7">{{dialogHero.name}}</label>:
                <span style="font-size: 18px;">
                    {{dialogText}}
                </span>
                <div style="margin-top: 45px">
                    <button style="margin-right: 10px;font-size: 20px" ng-click="value.click()"
                            class="btn bg-{{_colors[$index]}} btn-large"
                            ng-repeat="(key,value) in dialogButtons">
                        <img ng-show="value.image" src="{{value.image}}">
                        <img
                                style="width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(value.icon).x}}px -{{icon(value.icon).y}}px;"
                                ng-show="value.icon"> {{value.text}}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div style="position: absolute;display: none;z-index: 77" id="notify" onclick="$('#notify').hide()">
        <div class="DialogWindow" style="min-width: 300px" onclick="$('#notify').hide()">
            <div class="DialogTitle" style="text-align: center;margin-bottom: 0px" onclick="$('#notify').hide()">
                <span style="font-size: 18px;" onclick="$('#notify').hide()">
                    {{notificationText}}
                </span>
            </div>
        </div>
    </div>


    <div class="speech-bubble" style="position: absolute;display: none" id="bubble">
        {{bubbleText}}
    </div>


</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/play.js"></script>
<script src="js/joy.min.js"></script>
<script>
    function onSignIn(googleUser) {
        PROFILE = googleUser.getBasicProfile();
        ACTIONS.GAME.PLAY(PROFILE);
    }

    LASTMOVEMENT = undefined;
    TOUCHER = undefined;
    var dynamic = nipplejs.create({
        zone: document.getElementById('play'),
        color: 'white',
    });
    dynamic.on('added', function (evt, nipple) {
        nipple.on('start move end dir plain', function (evt) {
            if (evt.target.direction)
                if (evt.target.direction.angle) {
                    LASTMOVEMENT = evt.target.direction.angle.toUpperCase();
                    eval(`ACTIONS.PLAYER.MOVE_${evt.target.direction.angle.toUpperCase()}();`);
                    if (!TOUCHER) {
                        TOUCHER = setInterval(function () {
                            if (LASTMOVEMENT)
                                eval(`ACTIONS.PLAYER.MOVE_${LASTMOVEMENT}();`);
                        }, 10);
                    }
                }
        });
    }).on('removed', function (evt, nipple) {
        clearInterval(TOUCHER);
        TOUCHER = undefined;
        nipple.off('start move end dir plain', function () {
        });
    });

    // var conn = new WebSocket('ws://localhost:9090');
    // conn.onopen = function (e) {
    //     console.log("Connection established!");
    // };
    //
    // conn.onmessage = function (e) {
    //     console.log(e.data);
    // };
</script>
</body>

</html>
