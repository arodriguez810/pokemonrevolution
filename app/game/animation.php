<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-amber">
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

</style>

<section class="content" id="animationcontroller" ng-app="pokemon" ng-controller="animation">

    <!-- Form  -->
    <div class="modal fade" id="animation_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Animación</h4>
                    <div class="header-dropdown m-r--5 " loading="animation">
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
                                    <input id="animationname" type="text" ng-model="form.name"
                                           class="form-control">
                                    <label class="form-label">Nombre </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select title="Category" class="form-control show-tick" ng-model="form.category">
                                    <option ng-repeat="(key,value) in sprites">{{key}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select class="form-control show-tick" ng-model="form.file">
                                    <option selected value="">Seleccione</option>
                                    <option value="{{value.url}}" ng-repeat="(key,value) in sprites[form.category]">
                                        {{value.file}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form.rows"
                                           class="form-control">
                                    <label class="form-label">Rows </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form.columns"
                                           class="form-control">
                                    <label class="form-label">Columns </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select required title="Pasos" class="form-control show-tick"
                                        ng-model="form.sound">
                                    <option selected value="">Sonido</option>
                                    <option value="{{value}}" ng-repeat="(key,value) in SOUNDSDB">
                                        {{value.replace('.ogg','').split('/')[value.split('/').length-1]}}
                                    </option>
                                </select>
                                <audio ng-show="form.sound" id="sound" controls>
                                    <source ng-src="{{form.sound}}" type="audio/ogg">
                                </audio>
                            </div>
                        </div>
                    </div>
                    <div class="row clearfix">
                        <div class="col-sm-6">
                            <div class="form-group form-float ">
                                <pre ng-dblclick="form.frames = [];">{{form.frames}} </pre>
                            </div>
                            <button type="button" ng-click="setall()"
                                    class="btn bg-blue-grey  waves-effect">
                                <i class="material-icons">filter_9_plus</i>
                            </button>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="number" ng-model="form.framerate"
                                           class="form-control"/>
                                    <label class="form-label">Framerate</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <center>
                        <div class="row clearfix bg-black" >
                            <canvas width="{{img().w}}" height="{{img().h}}" style="border: #2C009F 1px solid"
                                    id="player"></canvas>
                        </div>
                        <div class="row clearfix" >
                            <button type="button" ng-click="play()"
                                    class="btn bg-amber  waves-effect">
                                <i class="material-icons">play_circle_filled</i>
                                <span id="loadingAni" style="display: none">loading</span>
                            </button>
                        </div>
                    </center>
                    <br><br><br>
                    <div style="width: {{bound().w}}px;height: {{bound().h}}px;position: relative" class="bg-black">

                        <img id="currentImage" style="position: absolute;z-index: 1;" src="{{form.file}}">
                        <div ng-click="form.frames.push(value)"
                             style="position: relative;z-index: 999999;background-color: transparent;padding: 0 0 0 0;width: {{img().w}}px;height: {{img().h}}px;float: left;border: {{form.frames.indexOf(value)!==-1?'red':'blue'}} solid 1px;"
                             ng-repeat="(key, value) in getObjects()"></div>

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
            <h2>Animaciones</h2>

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
                        <div class="header-dropdown m-r--5 " loading="animation" style="display: none">
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
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>NAME</th>
                                <th>.</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="(key, animation) in list | filter:search">
                                <td>{{animation.name}}</td>
                                <th>
                                    <button type="button" ng-click="edit(animation)"
                                            class="btn btn-default waves-effect">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" ng-click="delete(animation)"
                                            class="btn btn-default waves-effect">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/animation.js"></script>
</body>

</html>
