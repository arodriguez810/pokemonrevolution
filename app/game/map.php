<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-blue">
<!-- Page Loader -->
<?php include_once($path . '/loader.php') ?>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<!-- #END# Overlay For Sidebars -->
<!-- Search Bar -->

<!-- #END# Search Bar -->
<!-- Top Bar -->
<?php include_once($path . '/navbar.php') ?>
<!-- #Top Bar -->

<?php include_once($path . '/sidebar.php') ?>
<style>
    .worldtable td {
        border: blue solid 1px;
    }

    audio {
        width: 100%;
        height: 20px;
    }

    .patron {
        background: radial-gradient(#ccc 15%, transparent 16%) 0 0,
        radial-gradient(#ccc 15%, transparent 16%) 8px 8px,
        radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 0 1px,
        radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 8px 9px;
        background-color: #white;
        background-size: 16px 16px;
    }
</style>

<section class="content" id="mapcontroller" ng-app="pokemon" ng-controller="map">

    <!-- Form  -->
    <div class="modal fade" id="event_form" tabindex="-1" role="dialog"
         style="overflow: scroll !important;z-index: 999999 !important;">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content" style="overflow: auto !important;">
                <div class="modal-header">
                    <button type="button" class="btn btn-link waves-effect" ng-click="saveEvent()">Guardar
                    </button>
                    <button type="button" class="btn btn-red waves-effect" ng-click="clearEvent()"
                            data-dismiss="modal">
                        Eliminar
                    </button>
                    <h4 class="modal-title" id="largeModalLabel">Evento</h4>
                </div>
                <div class="modal-body" style="overflow: scroll">
                    <div class="col-sm-12">
                        <div class="row clearfix">
                            <div class="col-sm-2">
                                <div class="form-group form-float">
                                    <div class="form-line focused">
                                        <input type="text" ng-model="currentEvent.name"
                                               class="form-control">
                                        <label class="form-label">Nombre </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <div class="form-group form-float ">
                                    <select required title="Es Actor?" class="form-control show-tick"
                                            ng-model="currentEvent.isActor">
                                        <option value="0">No</option>
                                        <option value="1">Si</option>
                                    </select>
                                    <label class="form-label">Actor? </label>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <div class="form-group form-float">
                                    <div class="form-line focused">
                                        <input type="number" ng-model="currentEvent.hero.speed"
                                               class="form-control">
                                        <label class="form-label">Velocidad </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <div class="form-group form-float ">
                                    <select required title="Detonador" class="form-control show-tick"
                                            ng-model="currentEvent.trigger">
                                        <option value="{{value}}" ng-repeat="(key,value) in E_trigger">{{value}}
                                        </option>
                                    </select>
                                    <label class="form-label">Detonador </label>
                                </div>
                            </div>
                            <div class="col-sm-1">
                                <div class="form-group form-float ">
                                    <div class="form-line focused">
                                        <input type="number" ng-model="currentEvent.trigger_step"
                                               class="form-control">
                                        <label class="form-label">Rango</label>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-2">
                                <select class="form-control show-tick" ng-model="currentEvent.look">
                                    <option value="DOWN">Abajo</option>
                                    <option value="UP">Arriba</option>
                                    <option value="LEFT">Izquierda</option>
                                    <option value="RIGHT">Derecha</option>
                                </select>
                                <label class="form-label">Mirada</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <ul class="nav nav-tabs tab-nav-right" role="tablist">
                            <li role="presentation" class="active" ng-show="currentEvent.isActor=='1'">
                                <a href="#profile_only_icon_title" data-toggle="tab">
                                    <i class="material-icons">face</i>
                                </a>
                            </li>
                            <li role="presentation" class="active" ng-show="currentEvent.isActor=='0'">
                                <a href="#messages_only_icon_title" data-toggle="tab">
                                    <i class="material-icons">gavel</i>
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#settings_only_icon_title" data-toggle="tab">
                                    <i class="material-icons">extension</i>
                                </a>
                            </li>
                        </ul>

                        <div class="tab-content" style="height: 1000px">
                            <div role="tabpanel" class="tab-pane fade active in" id="profile_only_icon_title">
                                <div class="row clearfix" ng-show="currentEvent.isActor=='1'">

                                    <div class="col-sm-12">
                                        <h2>{{currentEvent.hero.name}}</h2>
                                        <img class="img-responsive thumbnail" src='data/characters_file/{{currentEvent.hero.name}}/face.png?{{cache}}'>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group form-float ">
                                            <div ng-repeat="(key,character) in characters"
                                                 style="background-color: transparent;padding: 0 0 0 0;border: {{currentEvent.hero.name==character.data.name?'red':'blue'}} solid 1px;float: left">
                                                <img src="data/characters_file/{{character.data.name}}/face.png?{{cache}}"
                                                     ng-click="currentEvent.hero.name=character.data.name"/>
                                                <br>
                                                <label style="font-size: 12px">{{character.data.name}}</label>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade active in" id="messages_only_icon_title"
                                 ng-show="currentEvent.isActor=='0'">
                                <div class="row clearfix" ng-show="currentEvent.isActor=='0'">
                                    <div class="col-sm-1">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                                <input type="number" ng-model="currentEvent.object.width"
                                                       class="form-control">
                                                <label class="form-label">Ancho </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-1">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                                <input type="number" ng-model="currentEvent.object.height"
                                                       class="form-control">
                                                <label class="form-label">Alto </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-1">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                                <input type="number" ng-model="currentEvent.object.framerate"
                                                       class="form-control">
                                                <label class="form-label">FPS </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-1">
                                        <div class="form-group form-float ">
                                            <select required title="Can Break?" class="form-control show-tick"
                                                    ng-model="currentEvent.object.canBreak">
                                                <option value="0">No</option>
                                                <option value="1">Si</option>
                                            </select>
                                            <label class="form-label">Can Break? </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-1">
                                        <div class="form-group form-float ">
                                            <select required title="Can Move?" class="form-control show-tick"
                                                    ng-model="currentEvent.object.canMove">
                                                <option value="0">No</option>
                                                <option value="1">Si</option>
                                            </select>
                                            <label class="form-label">Can Move? </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-1">
                                        <div class="form-group form-float ">
                                            <select required title="Can Mount?" class="form-control show-tick"
                                                    ng-model="currentEvent.object.canMount">
                                                <option value="0">No</option>
                                                <option value="1">Si</option>
                                            </select>
                                            <label class="form-label">Can Mount? </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-7">
                                        <div class="form-group form-float ">
                                            Frames:
                                            <pre ng-dblclick="currentEvent.object.animation = [];">{{currentEvent.object.animation}} </pre>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" ng-show="currentEvent.isActor=='0'">
                                    <div class="col-sm-12">
                                        <div class="form-group form-float ">
                                            <img src="{{value}}"
                                                 style="background-color: transparent;padding: 0 0 0 0;width: 48px;height: 48px;border: {{currentEvent.object.url==value?'red':'blue'}} solid 1px;float: left"
                                                 ng-click="currentEvent.object.url=value"
                                                 ng-repeat="(key,value) in OBJECTS"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" ng-show="currentEvent.isActor=='0'"
                                     style="position: relative">
                                    <div class="col-sm-12">
                                        <div>
                                            <img style="position: absolute" src="{{currentEvent.object.url}}">
                                            <div style="position: absolute">
                                                <div style="height: {{getObjectsBound().h}}px;width: {{getObjectsBound().w}}px">
                                                    <div ng-click="currentEvent.object.animation.push(value)"

                                                         style="background-color: transparent;padding: 0 0 0 0;width: {{currentEvent.object.width}}px;height: {{currentEvent.object.height}}px;border: {{currentEvent.object.animation.indexOf(value)!==-1?'red':'blue'}} solid 1px;float: left"
                                                         ng-repeat="(key,value) in getObjects()"><b
                                                                style="color: black;font-size: 18px;font-weight: bold">{{value}}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="settings_only_icon_title">
                                <div class="row clearfix">
                                    <div class="col-sm-8">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                                <input type="text" ng-model="currentEvent.conditions"
                                                       class="form-control">
                                                <label class="form-label">Condiciones</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                                <input type="text" ng-model="currentEvent.visible"
                                                       class="form-control">
                                                <label class="form-label">Visible</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">

                                    <h4 class="form-label">Rutas: Condicion - Script</h4>
                                    <div class="col-sm-3">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                                <input type="text" ng-model="CCCR"
                                                       class="form-control">
                                                <label class="form-label">Condición </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                        <textarea type="text" ng-model="NNNR"
                                                  class="form-control"></textarea>
                                                <label class="form-label">Script </label>
                                            </div>
                                            <button type="button"
                                                    ng-click="currentEvent.route.push({CC:CCCR,script:NNNR})"
                                                    class="btn btn-default waves-effect">
                                                <i class="material-icons">note_add</i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <ul class="list-group">
                                            <li ng-repeat="(key,value) in currentEvent.route" class="list-group-item">
                                                <pre ng-dblclick="editaccionshita=!editaccionshita">if ({{value.CC}}) { {{value.script}} }</pre>
                                                <div ng-show="editaccionshita">
                                                    <textarea ng-model="value.script"></textarea>
                                                    <textarea ng-model="value.CC"></textarea>
                                                </div>
                                                <button type="button" ng-click="currentEvent.route.splice($index,1)"
                                                        class="btn btn-default waves-effect">
                                                    <i class="material-icons">delete_sweep</i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="row clearfix">

                                    <h4 class="form-label">Acciones: Condicion - Script</h4>
                                    <div class="col-sm-3">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                                <input type="text" ng-model="CCC"
                                                       class="form-control">
                                                <label class="form-label">Condición </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group form-float">
                                            <div class="form-line focused">
                                        <textarea type="text" ng-model="NNN"
                                                  class="form-control"></textarea>
                                                <label class="form-label">Script </label>
                                            </div>
                                            <button type="button"
                                                    ng-click="currentEvent.actions.push({CC:CCC,script:NNN})"
                                                    class="btn btn-default waves-effect">
                                                <i class="material-icons">note_add</i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="col-sm-12">
                                        <ul class="list-group">
                                            <li ng-repeat="(key,value) in currentEvent.actions" class="list-group-item">
                                                <div class="col-sm-12" id="conditioncode"
                                                     style="height: 30px !important;">
                                                    <ui-codemirror style="font-size: 20px;"
                                                                   ui-codemirror-opts="codeProp"
                                                                   ng-model="currentEvent.actions[key].CC"></ui-codemirror>
                                                </div>
                                                <div class="col-sm-12">
                                                    <ui-codemirror style="font-size: 20px;"
                                                                   ui-codemirror-opts="codeProp"
                                                                   ng-model="currentEvent.actions[key].script"></ui-codemirror>
                                                </div>
                                                <button type="button" ng-click="currentEvent.actions.splice($index,1)"
                                                        class="btn btn-default waves-effect">
                                                    <i class="material-icons">delete_sweep</i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    </div>
    </div>
    </div>

    <div class="modal fade" id="map_form" tabindex="-1" role="dialog" style="overflow: scroll !important;">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content" style="overflow: auto !important;">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Mapa</h4>
                    <div class="header-dropdown m-r--5 " loading="map">
                        Cargando datos...
                        <div class="preloader pl-size-x2">
                            <div class="spinner-layer">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input id="mapname" type="text" ng-model="form.data.name"
                                           class="form-control">
                                    <label class="form-label">Nombre </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form.data.displayName"
                                           class="form-control">
                                    <label class="form-label">Título </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="number" ng-model="form.data.width"
                                           class="form-control">
                                    <label class="form-label">Ancho</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="number" ng-model="form.data.height"
                                           class="form-control">
                                    <label class="form-label">Alto</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <label class="form-label">Música de fondo</label>
                                <select required title="Música de fondo" class="form-control show-tick"
                                        ng-model="form.data.bgm">
                                    <option selected value="">N/A</option>
                                    <option value="{{value}}" ng-repeat="(key,value) in BGM">
                                        {{value.replace('.ogg','').split('/')[value.split('/').length-1]}}
                                    </option>
                                </select>
                                <audio ng-show="form.data.bgm" id="bgm" controls>
                                    <source ng-src="{{form.data.bgm}}" type="audio/ogg">
                                </audio>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <label class="form-label">Sonido de fondo</label>
                                <select required title="Sonido de fondo" class="form-control show-tick"
                                        ng-model="form.data.bgs">
                                    <option selected value="">N/A</option>
                                    <option value="{{value}}" ng-repeat="(key,value) in BGS">
                                        {{value.replace('.ogg','').split('/')[value.split('/').length-1]}}
                                    </option>
                                </select>
                                <audio ng-show="form.data.bgs" id="bgs" controls>
                                    <source ng-src="{{form.data.bgs}}" type="audio/ogg">
                                </audio>
                            </div>
                        </div>
                    </div>
                    <div class="row clearfix">
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <label class="form-label">Tile</label>
                                <select required title="Tipo" class="form-control show-tick" ng-model="form.data.type">
                                    <option value="{{key}}" ng-repeat="(key,value) in TILESET">{{key}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <label class="form-label">Piso de batalla</label>
                                <select required title="Piso de batalla" class="form-control show-tick"
                                        ng-model="form.data.battleback.floor">
                                    <option selected value="">N/A</option>
                                    <option value="{{value}}" ng-repeat="(key,value) in BATTLEFLOOR">
                                        {{value.replace('.png','').split('/')[value.split('/').length-1]}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <label class="form-label">Fondo de batalla</label>
                                <select required title="Fondo de batalla" class="form-control show-tick"
                                        ng-model="form.data.battleback.back">
                                    <option selected value="">N/A</option>
                                    <option value="{{value}}" ng-repeat="(key,value) in BATTLEBACK">
                                        {{value.replace('.png','').split('/')[value.split('/').length-1]}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select required title="Música de batalla" class="form-control show-tick"
                                        ng-model="form.data.battleback.music">
                                    <option selected value="">N/A</option>
                                    <option value="{{value}}" ng-repeat="(key,value) in BATTLEMUSIC">
                                        {{value.replace('.ogg','').split('/')[value.split('/').length-1]}}
                                    </option>
                                </select>
                                <audio ng-show="form.data.battleback.music" id="battlemusic" controls>
                                    <source ng-src="{{form.data.battleback.music}}" type="audio/ogg">
                                </audio>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <label class="form-label">Pasos</label>
                                <select required title="Pasos" class="form-control show-tick"
                                        ng-model="form.data.steps">
                                    <option selected value="">N/A</option>
                                    <option value="{{value}}" ng-repeat="(key,value) in SOUNDSDB">
                                        {{value.replace('.ogg','').split('/')[value.split('/').length-1]}}
                                    </option>
                                </select>
                                <audio ng-show="form.data.steps" id="stepsmusic" controls>
                                    <source ng-src="{{form.data.steps}}" type="audio/ogg">
                                </audio>
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <label class="form-label">Mapas Vecinos</label>
                                <select required title="Mapas Vecinos" multiple class="form-control show-tick"
                                        ng-model="form.data.vecinos">
                                    <option ng-show="value.data.name!==form.data.name" value="{{value.data.name}}"
                                            ng-repeat="(key,value) in list">
                                        {{value.data.name}}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form.data.pokecenter"
                                           class="form-control">
                                    <label class="form-label">Poke center action </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form.data.rate"
                                           class="form-control">
                                    <label class="form-label">Rate Salvaje </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form.data.maper"
                                           class="form-control">
                                    <label class="form-label">Map Indicator </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <select title="Detonador" class="form-control show-tick"
                                    ng-model="form.data.enviroment">
                                <option ng-repeat="(key,value) in E_emviroment">{{value}}</option>
                            </select>
                            <label class="form-label">Type </label>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-link waves-effect" style="" ng-click="save()">Guardar</button>
                            <button type="button" class="btn btn-link waves-effect" ng-click="clear()" data-dismiss="modal">
                                Cerrar
                            </button>
                        </div>
                    </div>
                    <div class="row clearfix">

                        <center>
                            <canvas ng-click="canvas_bg_tama=canvas_bg_tama?undefined:true"
                                    style="border: 1px blue solid;{{(canvas_bg_tama?'':'width:300px')}}" id="canvas_bg"
                                    width="{{battleWith}}"
                                    height="{{battleHeight}}"></canvas>
                        </center>
                    </div>
                    <div class="row clearfix">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <table class="patron">

                                <tr>
                                    <td>
                                        <button ng-click="selectTab(key)"
                                                style="height: 37px !important;font-size: 12px;padding: 7px;"
                                                class="btn bg-{{selection.tab==key?'blue':'default'}} waves-effect"
                                                ng-repeat="(key, value) in TILESET[form.data.type]"
                                                type="button">
                                            {{LAN.t(key)}}
                                        </button>
                                    </td>
                                </tr>
                            </table>
                            <div style="overflow: auto; height: 635px !important;" class="patron">
                                <br>
                                <div style="width:{{baseWidth*8}}px">
                                    <img class="oblock" ng-repeat="(key, image) in selectors"
                                         ng-click="selectTiles(image,$event.currentTarget)"
                                         style="background-color: transparent;padding: 0 0 0 0;width:{{baseWidth}}px;height:{{baseHeight}}px; border: none; background-image: url('{{image.url}}');background-position: -{{(image.x-1)*baseWidth}}px -{{(image.y-1)*baseHeight}}px;">

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                            <table class="worldtable patron" style="height: {{bounds().height}};position: relative">
                                <tr>

                                    <td>
                                        <button type="button" ng-dblclick="selectTool('select')"
                                                class="btn bg-{{selection.tool=='select'?'amber':'default'}}  waves-effect">
                                            <i class="material-icons">apps</i>
                                        </button>
                                        <button type="button" ng-dblclick="showposition=!showposition"
                                                ng-click="selectTool('draw')"
                                                class="btn bg-{{selection.tool=='draw'?'cyan':'default'}}  waves-effect">
                                            <i class="material-icons">brush</i>
                                        </button>


                                        <button type="button" ng-click="selectTool('delete')"
                                                class="btn bg-{{selection.tool=='delete'?'red':'default'}} waves-effect">
                                            <i class="material-icons">delete_sweep</i>
                                        </button>

                                        <button type="button" ng-click="selectTool('square')"
                                                class="btn bg-{{selection.tool=='square'?'blue':'default'}}  waves-effect">
                                            <i class="material-icons">photo_size_select_small</i>
                                        </button>

                                        <button type="button" ng-click="selectTool('deletesquare')"
                                                class="btn bg-{{selection.tool=='deletesquare'?'red':'default'}} waves-effect">
                                            <i class="material-icons">tab_unselected</i>
                                        </button>

                                        <button type="button"
                                                class="btn bg-blue-grey waves-effect">
                                            <i class="material-icons">color_lens</i>
                                            <input type="color" ng-model="overlay" value="#fff">
                                        </button>

                                        <button type="button" ng-click="clearAll()"
                                                class="btn bg-red waves-effect">
                                            <i class="material-icons">block</i>
                                        </button>


                                        <button type="button" ng-click="draw()"
                                                class="btn bg-blue-grey waves-effect">
                                            <i class="material-icons">replay_10</i>
                                        </button>


                                        <button ng-repeat="(ket,value) in [1,2,3,4,5,6,7,8,9]" type="button"
                                                ng-click="selectLayer(value)"
                                                ng-dblclick="hideLayer(value)"
                                                class="btn  bg-{{hideLayers.indexOf(value)!==-1?'red' : (selection.layer==value?'green':'default')}}  waves-effect">
                                            <i class="material-icons">filter_{{value}}</i>
                                        </button>


                                    </td>
                                </tr>


                            </table>
                            <div style="position: relative;">
                                <canvas style="border: red solid 1px;position: absolute;z-index: {{layer}};background-color: transparent;float: left"
                                        ng-repeat="(key,layer) in layers"
                                        id="W_{{layer}}A"
                                        ng-show="hideLayers.indexOf(layer)===-1"
                                        width="{{bounds().width}}"
                                        height="{{bounds().height}}">
                                </canvas>

                                <canvas style="position: absolute;z-index: 10;background-color: transparent;border: blue 1px solid;float: left;"
                                        id="canvas_world"
                                        width="{{bounds().width}}"
                                        height="{{bounds().height}}">
                                </canvas>

                                <div ng-if="showposition"
                                     style="position: absolute;z-index: 10;background-color: transparent;border: red 1px solid;float: left;width: {{bounds().width+2}}px"
                                     id="positions"
                                     width="{{bounds().width}}"
                                     height="{{bounds().height}}">
                                    <div style="float: left;width: 48px;height: 48px;color: black;font-size: 12px;text-align: center;padding: 10px;border: 1px red solid;"
                                         ng-repeat="(key,blo) in points">{{blo}}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="block-header">
            <h2>Mapas</h2>

        </div>
        <!-- Widgets -->
        <div class="row clearfix">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <button type="button" ng-click="new()"
                                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">add</i>
                        </button>
                        <button type="button" ng-click="refresh()"
                                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">refresh</i>
                        </button>
                        <div class="header-dropdown m-r--5 " loading="map" style="display: none">
                            Cargando datos...
                            <div class="preloader pl-size-x2">
                                <div class="spinner-layer">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div>
                                    <div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="body table-responsive" style="height: 3000px">
                        <div class="col-sm-12">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" ng-model="search" class="form-control">
                                    <label class="form-label">Buscar</label>
                                </div>
                            </div>
                        </div>
                        <div class="list-unstyled row clearfix">
                            <div ng-repeat="(key, map) in list | filter:search"
                                 class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <h1> {{map.data.name}}
                                    <div>
                                        <button type="button" style="float: right"
                                                ng-click="plays(map.data.name)"
                                                class="btn bg-red waves-effect">
                                            <i class="material-icons">play_arrow</i>
                                        </button>
                                        <button type="button" ng-click="edit(map)" style="z-index: 10"
                                                class="btn btn-default waves-effect">
                                            <i class="material-icons">edit</i>
                                        </button>
                                        <button type="button" ng-click="delete(map)" style="z-index: 10"
                                                class="btn btn-default waves-effect">
                                            <i class="material-icons">delete</i>
                                        </button>
                                    </div>
                                </h1>

                                <div style="position: relative;height: 300px">
                                    <img height="300px" width="300px" ng-repeat="(key,layer) in layers" class=""
                                         style="position: absolute;z-index: {{layer}};background-color: transparent"
                                         src='data/maps_file/{{map.data.name}}/W_{{layer}}A.png?{{cache}}'>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="modal fade" id="characetrs" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Personajes</h4>
                </div>
                <div class="modal-body">
                    <div class="body table-responsive">
                        <div class="col-sm-12">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" ng-model="search2" class="form-control">
                                    <label class="form-label">Buscar</label>
                                </div>
                            </div>
                        </div>
                        <div class="list-unstyled row clearfix">
                            <div ng-repeat="(key, character) in characters | filter:search2"
                                 class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div>
                                    <h4> {{character.data.name}} </h4> <span>{{character.data.title}}</span>
                                </div>

                                <img class="img-responsive thumbnail"
                                     src='data/characters_file/{{character.data.name}}/face.png?{{cache}}'>

                                <button type="button" ng-click="runs(character.data.name)"
                                        class="btn bg-red waves-effect">
                                    <i class="material-icons">play_arrow</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<?php include_once($path . '/js.php') ?>
<script src="js/controller/map.js"></script>
<script src="js/controller/character.js"></script>
</body>
<style>
</style>
</html>
