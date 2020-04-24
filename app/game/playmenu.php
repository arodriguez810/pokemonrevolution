<style>
    .myicon {
        top: 0 !important;
        left: -5px;
    }

    .menuButton {
        margin-left: 20px;
    }

    .tab-pane {
        margin-left: 20px !important;
        width: 94% !important;
    }

    .DialogWindow {
        padding: 8px;
    }
</style>
<div id="footer" class="{{menuOpen?'bg-black':'bg-blue-grey'}}"
     style="position: absolute;z-index: 9999;width: 100%;padding: 3px">
    <button ng-if="muted && !menuOpen" type="button" onclick="ACTIONS.GAME.MUTE_OFF()"
            class="btn bg-red waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">volume_off</i>
    </button>

    <button ng-if="!muted && !menuOpen" type="button" onclick="ACTIONS.GAME.MUTE()"
            class="btn btn-red waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">volume_up</i>
    </button>


    <button ng-if="menu && !menuOpen" type="button" onclick="ACTIONS.GAME.MENUTOGGLE()"
            class="btn bg-green waves-effect waves-circle waves-float menuButton">
        <i class="material-icons myicon">home</i>
    </button>


    <img ng-if="menu && !menuOpen && logro.script && logro.icon" ng-repeat="(mkey,logro) in  session.logros"
         ng-click="runQuickLogro(logro)"
         class="menuButton"
         style="width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(logro.icon).x}}px -{{icon(logro.icon).y}}px;">


    <div style="text-align: center">
        <button ng-if="menuOpen" type="button" onclick="ACTIONS.GAME.MENUTOGGLE()"
                class="btn btn-danger btn-circle-lg waves-effect waves-circle waves-float">
            <i class="material-icons">cancel</i>

        </button>
        <button ng-if="menuOpen && !menuMessage" type="button" ng-click="subMenu(homemenu.name)"
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

    <div ng-if="!menuMessage && menuOpen && subMenuOpen==='perfil'"
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

        </table>
        <button type="button" onclick="signOut();"
                style="margin: 10px 10px 10px 10px"
                class="btn bg-red  btn-circle-lg waves-effect waves-circle waves-float">
            <i class="material-icons">reply</i>
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

    <div ng-if="!menuMessage && menuOpen && subMenuOpen==='pokemons'"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;"
         class="bg-light-green tab-pane fade animated bounceInRight in active">
        <div>
            <div class="table-bordered" style="width: 20%;float: left;min-height: 275px;">
                <span class="badge bg-blue" style="width: 100%"> Click para ver</span>
                <div
                        style="text-transform: capitalize;text-align: center !important;width: 50%;display: inline-block"
                        ng-repeat="(kpo,pokemon) in session.pokemons">
                    <img ng-dblclick="upPokemon()" ng-click="menuPokemon($index)" style=" transform: scale(0.7);"
                         src="{{pokemon.imageUrl}}">
                </div>
                <div>
                    <span class="badge bg-pink" style="width: 100%"> Doble para mover</span>
                </div>
            </div>
            <div style="width: 80%;float: left;    min-height: 275px;">
                <table class="table-bordered {{selectedPokemonClick().shiny? 'bg-lime':''}}"
                       ng-if="selectedPokemonClick()" style="width: 100%">
                    <tbody>
                    <tr>
                        <td rowspan="2" style="text-align: center">
                            <img style=" transform: scale(1);"
                                 src="{{selectedPokemonClick().imageUrl}}">
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
                        <td>
                            <button ng-click="deletePokemon(selectedPokemonClick(),selectedPokemon)" type="button"
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
                                         style="margin-left: 5px"> <b> {{move.name}}</b>
                                </btn>
                            </div>
                        </td>
                        <td>
                            <button ng-click="trasladePokemon(selectedPokemonClick(),selectedPokemon)" type="button"
                                    class="btn bg-blue waves-effect">
                                <i class="material-icons">desktop_windows</i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>

    <div ng-if="!menuMessage && menuOpen && subMenuOpen==='bobeda'"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;"
         class="bg-teal tab-pane fade animated bounceInRight in active">
        <div>
            <div class="table-bordered" style="width: 20%;float: left;min-height: 275px;">
                <div
                        style="text-transform: capitalize;text-align: center !important;width: 50%;display: inline-block"
                        ng-repeat="(kpo,pokemon) in session.bobeda">
                    <img ng-click="menuBobeda($index)" style=" transform: scale(0.7);"
                         src="{{pokemon.imageUrl}}">
                </div>
            </div>
            <div style="width: 80%;float: left;    min-height: 275px;">
                <table class="table-bordered {{selectedBobedaClick().shiny? 'bg-lime':''}}"
                       ng-if="selectedBobedaClick()" style="width: 100%">
                    <tbody>
                    <tr>
                        <td rowspan="2" style="text-align: center">
                            <img style=" transform: scale(1);"
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

    <div ng-if="!menuMessage && menuOpen && subMenuOpen==='logros'"
         style="color: white;overflow: scroll;width: 97%;min-height: 270px;padding: 15px;"
         class="bg-orange tab-pane fade animated bounceInRight in active">
        <div ng-repeat="(mkey,logro) in  session.logros">
            <btn
                    ng-click="desc(logro.term,logro.name,logro.desc)"
                    style="float: left;font-size: large;text-align: center;padding: 17px;margin: 10px;min-width: 121px"
                    class="btn bg-blue-grey">
                <img style="width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(logro.icon).x}}px -{{icon(logro.icon).y}}px;"
                     ng-if="logro.icon">
            </btn>

        </div>
    </div>


</div>