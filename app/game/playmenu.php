<style>
    .myicon {
        top: 0 !important;
        left: -5px;
    }

    .menuButton {
        margin-bottom: 4px;
        width: 100%;
        height: 50px;
    }

    .tab-pane {
        margin-left: 20px !important;
        width: 94% !important;
    }

    .DialogWindow {
        padding: 8px;
    }

    .pokemonLife {
        width: 40%;
        float: right;
        text-align: right;
        font-size: 24px;
        border: 2px #000 solid;
        background-color: whitesmoke;
        text-transform: capitalize;
        padding: 3px;
    }

    .friendLife {

    }

    .pokemonLife div {
        width: 100%;
        text-transform: capitalize;
        padding: 8px;
        transition: width 4s,;
        border: 1px solid #333;
        border-radius: 11px;
    }

    .friendLife {
        float: left;
        text-align: left;
    }

    #footer {
        background-color: transparent !important;
    }

    #footer2 {
        background-color: transparent !important;
        text-align: right;
    }

    #gameMenu {
        position: absolute;
        z-index: 999;
        width: 98%;
        height: 100%;
        background: rgb(2, 0, 36);
        background: radial-gradient(circle, rgba(2, 0, 36, 1) 74%, rgba(14, 9, 121, 1) 97%);
    }

</style>
<div id="footer" class="{{menuOpen?'bg-black':'bg-blue-grey'}}"
     style="float: left;z-index: 9999;width: {{menuOpen?'100%':'75px'}};padding: 5px">


    <button ng-if="menu && !menuOpen" type="button" onclick="ACTIONS.GAME.MENUTOGGLE()"
            class="btn bg-green waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">home</i>
    </button>


    <button ng-if="menu && !menuOpen && logro.script && logro.icon && $index%2===0" ng-repeat="(mkey,logro) in  skills"
            class="btn bg-blue-grey waves-effect waves-circle waves-float menuButton">
        <img ng-click="runQuickLogro(logro)"
             class="menuButton"
             style="margin: 0;width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(logro.icon).x}}px -{{icon(logro.icon).y}}px;">
    </button>


</div>

<div id="gameMenu" ng-show="menuOpen">
    <div style="text-align: center">
        <button type="button" onclick="ACTIONS.GAME.MENUTOGGLE()"
                class="btn btn-danger btn-circle-lg waves-effect waves-circle waves-float">
            <i class="material-icons">cancel</i>

        </button>
        <button ng-if="!menuMessage" type="button" ng-click="subMenu(homemenu.name)"
                ng-repeat="(key, homemenu) in interface"
                style="margin: 10px 10px 10px 10px"
                class="btn bg-{{subMenuOpen===homemenu.name?homemenu.color:'blue-grey'}}  btn-circle-lg waves-effect waves-circle waves-float">
            <i class="material-icons">{{homemenu.icon}}</i>
        </button>
    </div>

    <div ng-if="menuMessage"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;z-index: 30;"
         class="bg-blue-grey tab-pane fade animated bounceInLeft in active">
        <div style="margin: 15px">
            <h3>{{menuMessage.term}}</h3>
            <h4>{{menuMessage.name}}:</h4>
            <p style="font-size: 18px">{{menuMessage.desc}}</p>
            <button onclick="ACTIONS.GAME.MENUMESSAGE_CLOSE()" type="button" class="btn btn-danger waves-effect">
                <i class="material-icons">keyboard_backspace</i>
            </button>
        </div>
    </div>

    <div ng-if="!menuMessage &&  subMenuOpen==='perfil'"
         style="color: white;overflow: scroll"
         class="tab-pane fade animated bounceInRight in active">
        <table style="width: 97%;font-size: 18px" class="">
            <tr>
                <td class="bg-blue text-center" style="border: #fff0ff 1px solid">
                    {{hero.name}}
                </td>
                <td class="bg-blue" colspan="9" style="text-align: center;border: #fff0ff 1px solid">
                    MEDALLAS
                </td>
            </tr>
            <tr>
                <td class="bg-blue-grey" rowspan="3" style="text-align: center !important;border: #fff0ff 1px solid">
                    <img src="data/players/{{session.id}}/images/face.png?{{hero.version}}">
                    <br>
                </td>
            </tr>
            <tr class="bg-blue-grey" style="border: #fff0ff 1px solid">
                <td ng-repeat="(key,medal) in medals1" style="text-align: center">
                    <img ng-if="!session['medal_'+medal.type]" width="48" height="48"
                         src="../resources/poekemon/medals/{{medal.name}}_shadow.png">
                    <img ng-if="session['medal_'+medal.type]" width="48" height="48"
                         src="../resources/poekemon/medals/{{medal.name}}_{{session['medal_'+medal.type]}}.png">
                    <br>
                </td>
            </tr>
            <tr class="bg-blue-grey" style="border: #fff0ff 1px solid">
                <td ng-repeat="(key,medal) in medals2" style="text-align: center">
                    <img ng-if="!session['medal_'+medal.type]" width="48" height="48"
                         src="../resources/poekemon/medals/{{medal.name}}_shadow.png">
                    <img ng-if="session['medal_'+medal.type]" width="48" height="48"
                         src="../resources/poekemon/medals/{{medal.name}}_{{session['medal_'+medal.type]}}.png">
                    <br>
                </td>
            </tr>
            <tr>
                <td colspan="10" style="text-align: right">
                    Tiempo: {{TimeText}}, version: <?php echo $version ?>
                </td>
            </tr>

        </table>
        <button type="button" onclick="signOut();"
                style="margin: 10px 10px 10px 10px"
                class="btn bg-red  btn-circle-lg waves-effect waves-circle waves-float">
            <i class="material-icons">reply</i>
        </button>

        <button type="button" onclick="location.href='face.php'"
                style="margin: 10px 10px 10px 10px"
                class="btn bg-pink  btn-circle-lg waves-effect waves-circle waves-float">
            <i class="material-icons">face</i>
        </button>


        <script>
            function signOut() {
                swal({
                    title: `Estas seguro que desea cerrar esta sessón?`,
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si",
                    cancelButtonText: "NO",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: false,
                }, function () {
                    var auth2 = gapi.auth2.getAuthInstance();
                    auth2.signOut().then(function () {
                        location.href = "index.php";
                    });
                });
            }
        </script>
    </div>

    <div ng-if="!menuMessage &&  subMenuOpen==='pokemons'"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;"
         class="bg-light-green tab-pane fade animated bounceInRight in active">
        <div>
            <div style="width: 100%;float: left;    min-height: 275px;">
                <table class="table-bordered {{selectedPokemonClick().shiny? 'bg-lime':''}}"
                       ng-if="selectedPokemonClick()" style="width: 100%">
                    <tbody>
                    <tr>
                        <td style="text-align: center" rowspan="2">
                            <img style=" transform: scale(1);{{selectedPokemonClick().style}}"
                                 src="{{selectedPokemonClick().imageUrl}}">
                        </td>
                        <td colspan="2" style="text-transform: capitalize;text-align: left">
                            <div style="list-style: none;text-align: left">

                                <btn
                                        style="float: left;min-width: 50%;text-align: left"
                                        class="btn btn-default">
                                    {{selectedPokemonClick().name}}

                                    <img style="margin-left: 5px;text-align: left"
                                         ng-repeat="(tkey, type) in selectedPokemonClick().types"
                                         src="../resources/poekemon/types/{{type}}.png">
                                    <img src="../resources/icons/{{selectedPokemonClick().gender}}.png">
                                </btn>

                                <btn
                                        ng-click="desc('Habilidad',selectedPokemonClick().ability.name,selectedPokemonClick().ability.shortDesc)"
                                        style="float: left;min-width: 50%;text-align: left"
                                        class="btn btn-default">
                                    {{selectedPokemonClick().ability.name}}
                                    <img style="visibility: hidden"
                                         src="../resources/icons/{{selectedPokemonClick().gender}}.png">
                                </btn>
                                <div class="pokemonLife friendLife" style="width: 100%;border-width: 3px">
                                    <div class="{{PKM.hpcolor(PKM.hp(selectedPokemonClick()))}}"
                                         style="width: {{PKM.hp(selectedPokemonClick())}}%">

                                    </div>
                                </div>

                            </div>
                        </td>
                        <td>
                            <button ng-show="session.pokemons.length>1"
                                    ng-click="deletePokemon(selectedPokemonClick(),selectedPokemon)" type="button"
                                    class="btn bg-red waves-effect">
                                <i class="material-icons">delete</i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div>
                                <btn
                                        ng-repeat="(mkey,move) in  selectedPokemonClick().moves"
                                        ng-click="desc('Movimiento',move.name,move.shortDesc)"
                                        style="float: left;min-width: 50%;background-color: {{typeColor[move.type]}};text-align: left"
                                        class="btn ">
                                    <img src="../resources/poekemon/types/{{move.type}}.png"
                                         style="margin-left: 5px">
                                    <b> {{move.name}}</b>
                                    <img src="../resources/poekemon/category/{{move.category}}.png"
                                         style="margin-left: 5px">

                                </btn>

                            </div>
                        </td>
                        <td>
                            <button ng-show="session.pokemons.length>1"
                                    ng-click="trasladePokemon(selectedPokemonClick(),selectedPokemon)" type="button"
                                    class="btn bg-blue waves-effect">
                                <i class="material-icons">desktop_windows</i>
                            </button>
                        </td>
                    </tr>
                    <tr ng-show="session.pokemons.length>1">
                        <td colspan="4">
                            <div class="table-bordered">
                                <div class=".sorting"
                                     style="text-transform: capitalize;text-align: center !important;width: 16%;display: inline-block"
                                     ng-repeat="(kpo,pokemon) in session.pokemons">
                                    <button ng-show="session.pokemons.length>1" ng-click="itemOnLongPress($index)"
                                            type="button"
                                            class="btn bg-teal waves-effect"
                                            style="height: 22px;padding: 0;width: 36px;">
                                        <i class="material-icons">keyboard_backspace</i>
                                    </button>
                                </div>
                                <br>
                                <div class=".sorting"
                                     style="text-transform: capitalize;text-align: center !important;width: 16%;display: inline-block"
                                     ng-repeat="(kpo,pokemon) in session.pokemons">
                                    <img
                                            ng-click="menuPokemon($index)"
                                            style="transform: scale(0.5);{{pokemon.style}};{{PKM.hp(pokemon)<=0?'filter: grayscale(1);':''}}"
                                            src="{{pokemon.imageUrl}}">
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>

    <div ng-if="!menuMessage &&  subMenuOpen==='bobeda'"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;"
         class="bg-teal tab-pane fade animated bounceInRight in active">
        <div>
            <div class="table-bordered" style="width: 20%;float: left;min-height: 275px;">
                <div
                        style="text-transform: capitalize;text-align: center !important;width: 50%;display: inline-block"
                        ng-repeat="(kpo,pokemon) in session.bobeda">
                    <img ng-click="menuBobeda($index)" style=" transform: scale(0.7);{{pokemon.style}}"
                         src="{{pokemon.imageUrl}}">
                </div>
            </div>
            <div style="width: 80%;float: left;    min-height: 275px;">
                <table class="table-bordered {{selectedBobedaClick().shiny? 'bg-lime':''}}"
                       ng-if="selectedBobedaClick()" style="width: 100%">
                    <tbody>
                    <tr>
                        <td rowspan="2" style="text-align: center">
                            <img style=" transform: scale(1);{{selectedBobedaClick().style}}"
                                 src="{{selectedBobedaClick().imageUrl}}">
                        </td>
                    </tr>
                    <tr>
                        <td style="text-transform: capitalize;text-align: left">
                            <div style="list-style: none;text-align: left">

                                <btn
                                        style="float: left;min-width: 50%;text-align: left"
                                        class="btn btn-default">
                                    {{selectedBobedaClick().name}}

                                    <img style="margin-left: 5px;text-align: left"
                                         ng-repeat="(tkey, type) in selectedBobedaClick().types"
                                         src="../resources/poekemon/types/{{type}}.png">
                                    <img src="../resources/icons/{{selectedBobedaClick().gender}}.png">
                                </btn>

                                <btn
                                        ng-click="desc('Habilidad',selectedBobedaClick().ability.name,selectedBobedaClick().ability.shortDesc)"
                                        style="float: left;min-width: 50%;text-align: left"
                                        class="btn btn-default">
                                    {{selectedBobedaClick().ability.name}}
                                    <img style="visibility: hidden"
                                         src="../resources/icons/{{selectedBobedaClick().gender}}.png">
                                </btn>

                            </div>
                        </td>
                        <td>
                            <button ng-click="deleteBobeda(selectedBobedaClick(),selectedBobeda)" type="button"
                                    class="btn bg-red waves-effect">
                                <i class="material-icons">delete</i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div>
                                <btn
                                        ng-repeat="(mkey,move) in  selectedBobedaClick().moves"
                                        ng-click="desc('Movimiento',move.name,move.shortDesc)"
                                        style="float: left;min-width: 50%;background-color: {{typeColor[move.type]}};text-align: left"
                                        class="btn ">
                                    <img src="../resources/poekemon/types/{{move.type}}.png"
                                         style="margin-left: 5px"> <b> {{move.name}}</b>
                                    <img src="../resources/poekemon/category/{{move.category}}.png"
                                         style="margin-left: 5px">
                                </btn>
                            </div>
                        </td>
                        <td>
                            <button ng-click="includePokemon(selectedBobedaClick(),selectedBobeda)" type="button"
                                    class="btn bg-blue waves-effect">
                                <i class="material-icons">keyboard_return</i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
    <div ng-if="!menuMessage &&  subMenuOpen==='logros'"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;padding: 15px;"
         class="bg-orange tab-pane fade animated bounceInRight in active">
        <div ng-repeat="(mkey,logro) in  skills">
            <btn
                    ng-click="desc(logro.term,logro.name,logro.desc)"
                    style="float: left;font-size: large;text-align: center;padding: 17px;margin: 10px;min-width: 65px"
                    class="btn {{logro.script?'bg-blue-grey':'bg-yellow'}} ">
                <img style="width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(logro.icon).x}}px -{{icon(logro.icon).y}}px;"
                     ng-if="logro.icon">
            </btn>

        </div>
    </div>

</div>

<div id="footer2" class="{{menuOpen?'bg-black':'bg-blue-grey'}}"
     style="float: right;z-index: 9999;width: {{menuOpen?'100%':'75px'}};padding: 5px">

    <button ng-if="muted && !menuOpen" type="button" onclick="ACTIONS.GAME.MUTE_OFF()"
            class="btn bg-red waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">volume_off</i>
    </button>

    <button ng-if="!muted && !menuOpen" type="button" onclick="ACTIONS.GAME.MUTE()"
            class="btn btn-red waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">volume_up</i>
    </button>

    <button ng-if="menu && !menuOpen && logro.script && logro.icon && $index%2!==0" ng-repeat="(mkey,logro) in  skills"

            class="btn bg-blue-grey waves-effect waves-circle waves-float menuButton">
        <img ng-click="runQuickLogro(logro)"
             class="menuButton"
             style="margin: 0;width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(logro.icon).x}}px -{{icon(logro.icon).y}}px;">
    </button>


</div>

<div ng-if="isBattlening" style="position: absolute;z-index: 9999;width: 98%;padding: 3px">
    <div id="lifes">
        <div class="pokemonLife friendLife">
            {{PKM.friend().name}} <img src="../resources/icons/{{PKM.friend().gender}}.png">
            <div class="{{PKM.hpcolor(PKM.hp(PKM.friend()))}}"
                 style="width: {{PKM.hp(PKM.friend())}}%;transition: width 2s, height 4s;">
            </div>
            <label class="StatusText" style="background-color: {{typeColor[PKM.friend().battle.statusType]}}"
                   ng-show="PKM.friend().battle.status">
                {{PKM.friend().battle.status}} x{{PKM.friend().battle.statusTurn}}
            </label>
            <label class="STATSText bg-red" ng-show="PKM.friend().battle.stats.atk!==0">
                a{{PKM.friend().battle.stats.atk*-1}}
            </label>
            <label class="STATSText bg-blue" ng-show="PKM.friend().battle.stats.def!==0">
                d{{PKM.friend().battle.stats.def*-1}}
            </label>
            <label class="STATSText bg-amber" ng-show="PKM.friend().battle.stats.spe!==0">
                s{{PKM.friend().battle.stats.spe*-1}}
            </label>
            <label class="STATSText bg-pink" ng-show="PKM.friend().battle.stats.spa!==0">
                sa{{PKM.friend().battle.stats.spa*-1}}
            </label>
            <label class="STATSText bg-cyan" ng-show="PKM.friend().battle.stats.spd!==0">
                sd{{PKM.friend().battle.stats.spd*-1}}
            </label>
            <label class="STATSText bg-brown" ng-show="PKM.friend().battle.stats.accuracy!==0">
                ac{{PKM.friend().battle.stats.accuracy*-1}}
            </label>
            <label class="STATSText bg-blue-grey" ng-show="PKM.friend().battle.stats.evasion!==0">
                ev{{PKM.friend().battle.stats.evasion*-1}}
            </label>
        </div>
        <div class="pokemonLife" onclick="ACTIONS.UNIT.NEXT();">
            <img src="../resources/icons/{{PKM.target().gender}}.png"> {{PKM.target().name}}
            <div class="{{PKM.hpcolor(PKM.hp(PKM.target()))}}"
                 style="width: {{PKM.hp(PKM.target())}}%;transition: width 2s, height 4s;">

            </div>
            <label class="StatusText"
                   style="float: left; background-color: {{typeColor[PKM.target().battle.statusType]}}"
                   ng-show="PKM.target().battle.status">
                {{PKM.target().battle.status}} x{{PKM.target().battle.statusTurn}}
            </label>
            <label class="STATSText bg-red" ng-show="PKM.target().battle.stats.atk!==0" style="float: left;">
                a{{PKM.target().battle.stats.atk*-1}}
            </label>
            <label class="STATSText bg-blue" ng-show="PKM.target().battle.stats.def!==0" style="float: left;">
                d{{PKM.target().battle.stats.def*-1}}
            </label>
            <label class="STATSText bg-amber" ng-show="PKM.target().battle.stats.spe!==0" style="float: left;">
                s{{PKM.target().battle.stats.spe*-1}}
            </label>
            <label class="STATSText bg-pink" ng-show="PKM.target().battle.stats.spa!==0" style="float: left;">
                sa{{PKM.target().battle.stats.spa*-1}}
            </label>
            <label class="STATSText bg-cyan" ng-show="PKM.target().battle.stats.spd!==0" style="float: left;">
                sd{{PKM.target().battle.stats.spd*-1}}
            </label>
            <label class="STATSText bg-brown" ng-show="PKM.target().battle.stats.accuracy!==0" style="float: left;">
                ac{{PKM.target().battle.stats.accuracy*-1}}
            </label>
            <label class="STATSText bg-blue-grey" ng-show="PKM.target().battle.stats.evasion!==0" style="float: left;">
                ev{{PKM.target().battle.stats.evasion*-1}}
            </label>
            <div ng-repeat="(kpo,pokemon) in BATTLEOBJS.TARGETS"
                 style="margin-top: 5px;float: right;width: 10px;height: 10px;border-radius: 100%;border: 1px black solid;"
                 class="{{PKM.hpcolor(PKM.hp(pokemon))}}">
            </div>
        </div>
    </div>

    <button style="width: 20%;margin-top: 2px" ng-if="muted && !menuOpen" type="button"
            onclick="ACTIONS.GAME.MUTE_OFF()"
            class="btn bg-red waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">volume_off</i>
    </button>

    <button style="width: 20%;margin-top: 2px" ng-if="!muted && !menuOpen" type="button" onclick="ACTIONS.GAME.MUTE()"
            class="btn btn-red waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">volume_up</i>
    </button>

    <button ng-if="PKM.mainMenu && PKM.friend().battle.status!=='partiallytrapped'"
            style="width: 20%;    font-size: 18px;" type="button" ng-click="PKM.menu_open();"
            class="btn bg-orange">
        Cambiar<i class="material-icons">swap_vertical_circle</i>
    </button>

</div>

<div ng-if="PKM.mainMenu" style="position: absolute;z-index: 9999;width: 98%;padding: 3px">

    <div ng-if="menuMessage"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;z-index: 30;"
         class="bg-blue-grey tab-pane fade animated bounceInLeft in active">
        <div style="margin: 15px">
            <h3>{{menuMessage.term}}</h3>
            <h4>{{menuMessage.name}}:</h4>
            <p style="font-size: 18px">{{menuMessage.desc}}</p>
            <button onclick="ACTIONS.GAME.MENUMESSAGE_CLOSE()" type="button" class="btn btn-danger waves-effect">
                <i class="material-icons">keyboard_backspace</i>
            </button>
        </div>
    </div>

    <div id="pokmonDetail" ng-if="PKM.pokemonDetail" class="bg-blue-grey pokmonDetail">
        <table class="table-bordered {{selectedPokemonClick().shiny? 'bg-lime':''}}"
               ng-if="selectedPokemonClick()" style="width: 100%">
            <tbody>
            <tr>
                <td style="text-align: center">
                    <img style=" transform: scale(1);{{selectedPokemonClick().style}}"
                         src="{{selectedPokemonClick().imageUrl}}">

                    <div class="pokemonLife friendLife">
                        <div class="{{PKM.hpcolor(PKM.hp(selectedPokemonClick()))}}"
                             style="width: {{PKM.hp(selectedPokemonClick())}}%">

                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="text-transform: capitalize;text-align: left">
                    <div style="list-style: none;text-align: left">

                        <btn
                                style="float: left;min-width: 50%;text-align: left"
                                class="btn btn-default">
                            {{selectedPokemonClick().name}}

                            <img style="margin-left: 5px;text-align: left"
                                 ng-repeat="(tkey, type) in selectedPokemonClick().types"
                                 src="../resources/poekemon/types/{{type}}.png">
                            <img src="../resources/icons/{{selectedPokemonClick().gender}}.png">
                        </btn>

                        <btn
                                ng-click="desc('Habilidad',selectedPokemonClick().ability.name,selectedPokemonClick().ability.shortDesc)"
                                style="float: left;min-width: 50%;text-align: left"
                                class="btn btn-default">
                            {{selectedPokemonClick().ability.name}}
                            <img style="visibility: hidden"
                                 src="../resources/icons/{{selectedPokemonClick().gender}}.png">
                        </btn>

                    </div>
                </td>

            </tr>
            <tr>
                <td>
                    <div>
                        <btn
                                ng-repeat="(mkey,move) in  PKM.moves(selectedPokemonClick())"
                                ng-click="desc('Movimiento',move.name,move.shortDesc)"
                                style="float: left;min-width: 50%;background-color: {{typeColor[move.type]}};text-align: left"
                                class="btn ">
                            <img src="../resources/poekemon/types/{{move.type}}.png"
                                 style="margin-left: 5px">
                            <b> {{move.name}}</b>
                            <img src="../resources/poekemon/category/{{move.category}}.png"
                                 style="margin-left: 5px">

                        </btn>

                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <button ng-click=" PKM.previewClose()" type="button" class="btn btn-danger waves-effect">
            <i class="material-icons">keyboard_backspace</i>
        </button>
    </div>

    <div ng-if="PKM.menu || PKM.hp(PKM.friend())<=0 || BATTLEOBJS.batonpass"
         style="color: white;overflow: scroll;width: 97%;padding: 15px;height: 100%"
         class="bg-white tab-pane fade animated bounceInRight in active pokmonDetail">

        <table style="text-align: center;width: 100%"
               ng-show="PKM.friend().battle.canChange!==false || PKM.hp(PKM.friend())<=0">
            <tr>

                <td style="width: 20%;float: left;position: relative;height: 100px"
                    ng-repeat="(kpo,pokemon) in session.pokemons"
                    ng-show="BATTLEOBJS.FRIENDINDEX!==$index">

                    <img
                            style="position: absolute;bottom: 0; text-transform: capitalize;text-align: center !important;display: inline-block;{{pokemon.style}};{{PKM.hp(pokemon)<=0?'filter: grayscale(1);':''}}"
                            ng-click="menuPokemon($index,true)"
                            src="{{pokemon.imageUrl}}">

                </td>
            </tr>
            <tr>
                <td style="width: 20%;float: left;" ng-repeat="(kpo,pokemon) in session.pokemons"
                    ng-show="BATTLEOBJS.FRIENDINDEX!==$index">
                    <div style="width: 100%">
                        <div class="{{PKM.hpcolor(PKM.hp(pokemon))}}"
                             style="width: {{PKM.hp(pokemon)}}%;    height: 20px;    margin: 4px;    border-radius: 20px;    border: 1px black solid;">

                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 20%;float: left;" ng-repeat="(kpo,pokemon) in session.pokemons"
                    ng-show="BATTLEOBJS.FRIENDINDEX!==$index">
                    <button ng-show="PKM.hp(pokemon)>0" type="button" ng-click="PKM.changefriend($index)"
                            class="btn bg-red waves-effect">
                        <i class="material-icons">cached</i>Cambiar
                    </button>

                    <button ng-show="!PKM.hp(pokemon)>0" type="button"
                            class="btn bg-grey waves-effect">
                        <i class="material-icons">cached</i>
                    </button>
                </td>
            </tr>
        </table>
        <div style="width: 100%; text-align: center;margin-top: 50px">
            <button ng-click="PKM.menu_close()" ng-show="PKM.hp(PKM.friend())>0" type="button"
                    class="btn btn-danger waves-effect" style="width: 50%">
                Regresar a pelear <i class="material-icons">keyboard_backspace</i>
            </button>
            <button ng-if="PKM.mainMenu" ng-show="BATTLEOBJS.isWild" style="width: 19%;    font-size: 18px;"
                    type="button"
                    onclick="ACTIONS.POKEMON.BATTLEEND();"
                    class="btn bg-red">
                Huir <i class="material-icons">directions_run</i>
            </button>
        </div>
    </div>


</div>

<div ng-show="PKM.mainMenu && !BATTLEOBJS.batonpass"
     style="position: absolute;bottom: 10px;text-align: center;z-index: 999;opacity: 0.9;width: 98%">


    <btn ng-show="PKM.hp(PKM.friend())>0 && move.num!==(BATTLEOBJS.disableMove||1).num"
         ng-repeat="(mkey,move) in  PKM.friend().moves"
         ng-click="PKM.attack(move)"

         style="float: left;min-width: 20%;background-color: {{typeColor[move.type]}};text-align: left;{{PKM.gigamaxAttack(move)}}"
         class="btn ">
        <img src="../resources/poekemon/types/{{move.type}}.png"
             style="margin-left: 5px"><b> {{move.name}}</b><img
                src="../resources/poekemon/category/{{move.category}}.png"
                style="margin-left: 5px">
    </btn>

</div>

<div class="bg-white"
     style="color: black;padding: 0;text-align: left;z-index: 999999;display: none;position: absolute;float: right;border: red 1px solid;border-radius: 12px;bottom: 0;right: 0;"
     id="enemyText">
    <div id="enemyTextDiv" class="text-primary" style="float: left;"></div>
    <img style="float: right;width: 72px;"
         src="data/characters_file/{{BATTLEOBJS.ENEMY.name}}/face.png?v=<?php echo $version ?>">
</div>

