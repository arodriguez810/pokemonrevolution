<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-pink">
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

<section class="content" id="movecontroller" ng-app="pokemon" ng-controller="move">

    <!-- Form  -->
    <div class="modal fade" id="move_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Movimiento {{form.name}}</h4>

                    <div class="header-dropdown m-r--5 " loading="move">
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
                        <div class="col-sm-6">
                            <div class="form-group form-float ">
                                <textarea class="form-control show-tick" ng-model="form.animation">
                                    </textarea>
                                <label class="form-label">Animation</label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group form-float ">
                        <textarea class="form-control show-tick" ng-model="move.code">
                                    </textarea>
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
                        <div class="header-dropdown m-r--5 " loading="move" style="display: none">
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
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Animación</th>
                                <th>Code</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="(key, move) in list | filter:search">
                                <td>{{move.name}}</td>
                                <td>{{move.category}}</td>
                                <td>{{move.shortDesc}}</td>
                                <td>
                                    <img
                                            src="../resources/poekemon/types/{{move.type}}.png">
                                </td>
                                <td>
                                    <textarea class="form-control show-tick" ng-model="move.animation">
                                    </textarea>
                                </td>
                                <td>
                                    <textarea class="form-control show-tick" ng-model="move.code">
                                    </textarea>
                                </td>
                                <th>
                                    <button type="button" ng-click="edit(move)"
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

<script src="js/controller/move.js"></script>
</body>

</html>
