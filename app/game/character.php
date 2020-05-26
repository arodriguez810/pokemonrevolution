<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-red">
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
    .avatar_table td {
        border: black solid 1px;
    }

    .selected {
        border: red 2px solid !important;
    }
</style>

<section class="content" id="charactercontroller" ng-app="pokemon" ng-controller="character">

    <!-- Form  -->
    <div class="modal fade" id="character_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Personaje</h4>
                    <div class="header-dropdown m-r--5 " loading="avatar">
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
                    <img ng-repeat="(key,value) in COLORS"
                         src="{{value}}" title="1"
                         id="grd_{{gradientID(value)}}_r"
                         style="float: left; position: absolute;top: -999999px">
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input id="charactername" type="text" ng-model="form.data.name"
                                           class="form-control">
                                    <label class="form-label">Nombre </label>
                                </div>
                                <button ng-click="randomName()" type="button"
                                        class="btn btn-default waves-effect">
                                    <i class="material-icons">youtube_searched_for</i>
                                </button>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select class="form-control show-tick" ng-model="form.data.gender">
                                    <option selected value="Female">Chica</option>
                                    <option value="Male">Chico</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <div class="form-line">
                                    <input type="text" ng-model="form.data.title"
                                           class="form-control">
                                    <label class="form-label">Título </label>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <div class="form-line">
                                    <input type="text" ng-model="form.data.medal"
                                           class="form-control">
                                    <label class="form-label">Medalla </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group form-float ">
                                <div class="form-line">
                                    <textarea rows="1" ng-model="form.data.biography" class="form-control"></textarea>
                                    <label class="form-label">Biografía</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row clearfix">
                        <div class="col-sm-4">
                            <div class="form-group form-float ">
                                <div class="form-line">
                                    <textarea rows="1" ng-model="form.data.objective" class="form-control"></textarea>
                                    <label class="form-label">Objetivo</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select class="form-control show-tick" ng-model="form.data.personality">
                                    <option ng-repeat="(key,value) in personalities">{{value}}</option>
                                </select>
                                <label class="form-label">Personalidad</label>
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select class="form-control show-tick" ng-model="form.data.level">
                                    <option ng-repeat="(key,value) in trainerLevels">{{value}}</option>
                                </select>
                                <label class="form-label">Nivel</label>
                            </div>
                        </div>


                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select class="form-control show-tick" ng-model="form.data.callejero">
                                    <option ng-repeat="(key,value) in ['YES','NO']">{{value}}</option>
                                </select>
                                <label class="form-label">Callejero</label>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group form-float ">
                                <div class="form-line">
                                    <textarea rows="1" ng-model="form.data.win" class="form-control"></textarea>
                                    <label class="form-label">Win</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group form-float ">
                                <div class="form-line">
                                    <textarea rows="1" ng-model="form.data.lose" class="form-control"></textarea>
                                    <label class="form-label">Lose</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row clearfix">
                        <center>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="card">
                                    <div class="header">
                                        <h2>Avatar</h2>

                                    </div>

                                    <div class="body">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                            <div id="pallete" class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            </div>
                                            <div id="pallete2" class="col-lg-6 col-md-6 col-sm-6 col-xs-6">

                                            </div>
                                        </div>
                                        <table class="avatar_table">
                                            <tr>
                                                <td colspan="">
                                                    <div style="height: 90px;width: 104px;">
                                                        <button
                                                                ng-click="selectColor(key)"
                                                                class="btn bg-{{selection.color==key?'red':'default'}} waves-effect"
                                                                ng-repeat="(key, value) in AVATARDB[form.data.gender].SV[selection.category][form.data.avatar.prop[selection.category]]"
                                                                style="width: 50px" type="button">
                                                            {{value.layer}}
                                                        </button>
                                                        <button
                                                                ng-click="selectColor(key)"
                                                                class="btn bg-{{selection.color==key?'red':'default'}} waves-effect"
                                                                ng-show="!AVATARDB[form.data.gender].SV[selection.category][form.data.avatar.prop[selection.category]][key]"
                                                                ng-repeat="(key, value) in AVATARDB[form.data.gender].FG[selection.category][form.data.avatar.prop[selection.category]]"
                                                                style="width: 50px" type="button">
                                                            {{value.layer}}
                                                        </button>

                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div style="height: 84px;width: 720px;">
                                                        <div id="gradients">

                                                            <img
                                                                    src="../resources/na.png" title="0"
                                                                    width="30px"
                                                                    height="30px"
                                                                    id="grd_0"
                                                                    ng-click="layerIDSet(0)"
                                                                    class="{{(layerID(value)==0)?'selected':''}}"
                                                                    style="float: left; position: relative;border: 2px solid;">

                                                            <img
                                                                    onload="loadedg()"
                                                                    ng-repeat="(key,value) in COLORS"
                                                                    src="{{value}}" title="1"
                                                                    width="30px"
                                                                    height="20px"
                                                                    id="grd_{{gradientID(value)}}"
                                                                    ng-click="layerIDSet(gradientID(value))"
                                                                    class="{{(layerID(value)==gradientID(value))?'selected':''}}"
                                                                    style="float: left; position: relative;border: 2px solid;">

                                                            <img ng-repeat="(key,value) in COLORS"
                                                                 src="{{value}}" title="1"
                                                                 id="grd_{{gradientID(value)}}_r"
                                                                 style="float: left; position: absolute;top: -999999px">
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>
                                            <tr>

                                                <td rowspan="3">
                                                    <div ng-repeat="(key, category) in AVATARDB[form.data.gender].FG">
                                                        <button ng-click="selectCategory(key)" style="width: 103px"
                                                                type="button"
                                                                ng-show="(['Body'].indexOf(key)===-1 && key.indexOf('2')===-1) || key==='Clothing2'"
                                                                class="btn bg-{{selection.category==key?'red':'default'}} waves-effect">
                                                            {{LAN.t(key)}}
                                                        </button>
                                                    </div>
                                                    <div ng-repeat="(key, category) in {Tail:{},Wing:{}}">
                                                        <button ng-click="selectCategory(key)" style="width: 103px"
                                                                type="button"
                                                                class="btn bg-{{selection.category==key?'blue':'default'}} waves-effect">
                                                            {{LAN.t(key)}}
                                                        </button>
                                                    </div>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <canvas id="canvas_face" width="144"
                                                                        height="144"></canvas>
                                                            </td>
                                                            <td rowspan="3">

                                                                <canvas id="canvas_sv" width="576"
                                                                        height="384"></canvas>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>

                                                                <canvas id="canvas_tv" width="144"
                                                                        height="192"></canvas>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>

                                                                <canvas id="canvas_tvd" width="144"
                                                                        height="48"></canvas>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div style="width: 710px;height: 275px; overflow: scroll">


                                                        <img ng-show="form.data.avatar.required.indexOf(selection.category)===-1"
                                                             ng-click="selectItem('p00')" title="p00"
                                                             style="border: {{form.data.avatar.prop[selection.category]=='p00'?'red':'black'}} 2px solid"
                                                             width="64" height="64" src="../resources/na.png">


                                                        <img ng-repeat="(key, image) in AVATARDB[form.data.gender].icon[selection.category.replace('1','').replace('2','')]"
                                                             ng-click="selectItem(key)" title="{{key}}"
                                                             style="border: {{form.data.avatar.prop[selection.category]==key?'red':'black'}} 2px solid"
                                                             width="64" height="64" src="{{image['c1']['url']}}">


                                                    </div>
                                                </td>


                                            </tr>
                                        </table>


                                        <select style="height: 336px"  multiple class="form-control show-tick" ng-model="form.data.types">
                                            <option ng-repeat="(key,value) in TYPEDEFF">{{value}}</option>
                                        </select>
                                        <label class="form-label">Tipos</label>

                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" ng-click="save()">Guardar</button>
                    <button type="button" class="btn btn-link waves-effect" ng-click="clear()" data-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="block-header">
            <h2>Personajes</h2>

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
                        <div class="header-dropdown m-r--5 " loading="character" style="display: none">
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

                    <div class="body table-responsive">
                        <div class="col-sm-12">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" ng-model="search" class="form-control">
                                    <label class="form-label">Buscar</label>
                                </div>
                            </div>
                        </div>
                        <div class="list-unstyled row clearfix">
                            <div ng-repeat="(key, character) in list | filter:search"
                                 class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div>
                                    <h4> {{character.data.name}} </h4> <span>{{character.data.title}}</span>
                                </div>

                                <img class="img-responsive thumbnail"
                                     src='data/characters_file/{{character.data.name}}/face.png?{{cache}}'>

                                <button type="button" ng-click="edit(character)"
                                        class="btn btn-default waves-effect">
                                    <i class="material-icons">edit</i>
                                </button>
                                <button type="button" ng-click="delete(character)"
                                        class="btn btn-default waves-effect">
                                    <i class="material-icons">delete</i>
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
<script src="js/controller/avatares.js"></script>
<script src="js/controller/character.js"></script>
<script src="js/controller/pokemon.js"></script>
</body>

</html>
