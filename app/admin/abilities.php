<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-purple">
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

<section class="content" id="abilitiescontroller" ng-app="pokemon" ng-controller="abilities">

    <!-- Form  -->
    <div class="modal fade" id="abilities_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Movimiento {{form.name}}</h4>

                    <div class="header-dropdown m-r--5 " loading="abilities">
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
                       <pre>
                           {{beauty()}}
                       </pre>
                    </div>
                    <div class="row clearfix">
                        <div class="col-sm-2">
                            <div class="form-group form-float ">
                                <select class="form-control show-tick" ng-model="form.animation">
                                    <option ng-repeat="(key,value) in animations" value="{{value.name}}">{{value.name}}
                                    </option>
                                </select>
                                <label class="form-label">Animation ON </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" ng-click="clear()" data-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="block-header">
            <h2>Movimientos</h2>

        </div>
        <!-- Widgets -->
        <div class="row clearfix">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <button type="button" ng-click="refresh()"
                                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">refresh</i>
                        </button>

                        <button type="button" ng-click="save()"
                                class="btn bg-green btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">save</i>
                        </button>
                        <div class="header-dropdown m-r--5 " loading="abilities" style="display: none">
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
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Code</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="(key, abilities) in list | filter:search">
                                <td>{{abilities.name}}</td>
                                <td>{{abilities.shortDesc}}</td>
                                <td>
                                    <img
                                            src="../resources/poekemon/types/{{abilities.type}}.png">
                                </td>
                                <td>
                                    <textarea class="form-control show-tick" ng-model="abilities.code">
                                    </textarea>
                                </td>
                                <th>
                                    <button type="button" ng-click="edit(abilities)"
                                            class="btn btn-default waves-effect">
                                        <i class="material-icons">edit</i>
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

<script src="js/controller/abilities.js"></script>
</body>

</html>
