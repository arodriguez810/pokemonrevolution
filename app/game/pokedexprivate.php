<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-green">
<!-- Page Loader -->
<?php include_once($path . '/loader.php') ?>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<!-- #END# Overlay For Sidebars -->
<!-- Search Bar -->

<style>

</style>

<section  id="pokedexcontroller" ng-app="pokemon" ng-controller="pokedex">

    <!-- Form  -->
    <div class="modal fade" id="pokedex_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel"></h4>
                    <div class="header-dropdown m-r--5 " loading="pokedex">
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

                        <div class="card">
                            <div class="body">

                                <div class="row clearfix">
                                    <center>
                                        <table class="table-bordered table-striped">
                                            <tr>
                                                <th>
                                                    <h2 style="text-transform: capitalize; ">{{form.keyname}}
                                                        ({{form.num}})</h2>
                                                </th>
                                                <th>
                                                    Tipo(s)
                                                </th>
                                                <th>Especie</th>
                                                <th colspan="2">Probabilidad de Sexo</th>
                                                <th>Estadisticas</th>
                                                <th>Habilidades</th>
                                                <th ng-show="form.prevo">Pre Evolución</th>
                                                <th ng-show="form.evos">Evolución</th>
                                                <th ng-show="form.otherFormes">Super Evolución</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img style="float: left"
                                                         src='../resources/poekemon/gif/front/{{form.keyname}}.gif?{{cache}}'>

                                                    <img style="float: left"
                                                         src='../resources/poekemon/gif/front_s/{{form.keyname}}.gif?{{cache}}'>
                                                </td>

                                                <td>
                                                    <img style="margin-left: 5px" ng-repeat="(key, value) in form.types"
                                                         src="../resources/poekemon/types/{{value}}.png">
                                                </td>
                                                <td>
                                                    {{form.species}}
                                                </td>
                                                <td>
                                                    <b>M:</b><span class="text-primary">{{form.genderRatio.M}}%<b>
                                                </td>
                                                <td>
                                                    <b>F:</b><span class="text-danger">{{form.genderRatio.F}}%<b>
                                                </td>
                                                <td>
                                                    <ul style="list-style: none">
                                                        <li ng-repeat="(st, stat) in form.baseStats">
                                                            <b class="{{statStyle(st)}}"
                                                               style="text-transform: uppercase; ">{{st}}</b>: {{stat}}
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul style="list-style: none">
                                                        <li ng-repeat="(abkey,ab) in form.abilities">
                                                            {{ab}}
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td ng-show="form.prevo">
                                                    <span style="text-transform: capitalize">{{form.prevo}}</span>
                                                    <img style="float: left"
                                                         src='../resources/poekemon/gif/front/{{form.prevo}}.gif?{{cache}}'>

                                                    <img style="float: left"
                                                         src='../resources/poekemon/gif/front_s/{{form.prevo}}.gif?{{cache}}'>

                                                </td>
                                                <td ng-show="form.evos">
                                                    <div ng-repeat="(ekey, evo) in form.evos">
                                                        <span style="text-transform: capitalize">{{evo}}</span>
                                                        <img style="float: left"
                                                             src='../resources/poekemon/gif/front/{{evo}}.gif?{{cache}}'>

                                                        <img style="float: left"
                                                             src='../resources/poekemon/gif/front_s/{{evo}}.gif?{{cache}}'>
                                                    </div>
                                                </td>
                                                <td ng-show="form.otherFormes">
                                                    <div ng-repeat="(ekey, evo) in form.otherFormes"
                                                         ng-if="evo.indexOf('mega')!==-1 || evo.indexOf('gmax')!==-1">
                                                        <span style="text-transform: capitalize">{{evo}}</span>
                                                        <img style="float: left"
                                                             src='../resources/poekemon/gif/front/{{evo}}.gif?{{cache}}'>

                                                        <img style="float: left"
                                                             src='../resources/poekemon/gif/front_s/{{evo}}.gif?{{cache}}'>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>

                                            </tr>
                                        </table>
                                        <h2>Habilidades</h2>
                                        <ul class="list-group" style="width: 50%">
                                            <li ng-repeat="(abkey,ab) in form.abilities" class="list-group-item">
                                                <b>
                                                    {{ab}}</b>:{{abilitiesDesc(ab).shortDesc}}
                                            </li>
                                        </ul>

                                        <h2>Movimientos</h2>
                                        <div class="list-group" style="width: 50%">

                                            <div class="col-sm-2" ng-repeat="(mkey,moves) in move_learns()"
                                                 style="border: 1px solid #ccc;text-transform: capitalize;">
                                                {{moves}}
                                            </div>

                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="block-header">
            <h2>Pokedex</h2>

        </div>
        <!-- Widgets -->
        <div class="row clearfix">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">


                        <div class="header-dropdown m-r--5 " loading="pokedex" style="display: none">
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

                    <div class="body table-responsive" style="text-align: center">

                            <button ng-repeat="(ke,cate) in POKEMON.categories" ng-click="selectFilter(cate)" type="button"
                                    class="btn btn-lg bg-{{filterStyle(cate)}} waves-effect">
                                {{cate.name}}
                            </button>


                        <div class="col-sm-12">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" ng-model="search" class="form-control">
                                    <label class="form-label">Buscar</label>
                                </div>
                            </div>
                        </div>

                        <div ng-repeat="(key, pokemon) in listFilter() | filter:search"
                             style="width: 20%;height: 230px;float: left;vertical-align: middle">
                            <center>
                                <div style="height: 155px;">
                                    <button type="button" ng-click="edit(pokemon)"
                                            class="btn btn-default waves-effect">
                                        <i class="material-icons">edit</i>
                                        {{pokemon.keyname}} {{pokemon.power}}
                                    </button>
                                    <br>
                                    <img style="transform: scale(0.5)" src='../resources/poekemon/gif/front/{{pokemon.keyname}}.gif?{{cache}}'>
                                </div>
                            </center>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/pokedex.js"></script>
<script src="js/controller/pokemon.js"></script>
</body>

</html>
