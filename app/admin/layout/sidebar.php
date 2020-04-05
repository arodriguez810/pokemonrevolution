<section>
    <!-- Left Sidebar -->
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info">
            <div class="input-group">
                <div class="form-line">
                    <input id="pokemonname" type="text" class="form-control" placeholder="Message">
                </div>
                <span class="input-group-addon" id="randonname">
                                           <button type="button" id="searchpokemon" style="float: right"
                                                   class=" btn btn-danger btn-circle waves-effect waves-circle waves-float">
                <i class="material-icons">search</i>
            </button>
                    </span>
            </div>
            <div class="text-center" id="pokeballdiv">
                <img id="pokeball" src="images/logo/logo.png" width="100" height="100" alt="User"/>

            </div>

        </div>
        <!-- #User Info -->
        <!-- Menu -->
        <div class="menu">
            <ul class="list">


                <li class="active">
                    <a href="index.php">
                        <i class="material-icons">home</i>
                        <span>Home</span>
                    </a>
                </li>

                <li>
                    <a href="character.php" class="toggled waves-effect waves-block">
                        <i class="material-icons">face</i>
                        <span>Personajes</span>

                    </a>
                </li>
                <li>
                    <a href="map.php" class="toggled waves-effect waves-block">
                        <i class="material-icons">public</i>
                        <span>Mapas</span>
                    </a>
                </li>
                <li>
                    <a href="character.php" class="toggled waves-effect waves-block">
                        <i class="material-icons">adb</i>
                        <span>Pokedex</span>
                    </a>
                </li>

                <li>
                    <a href="character.php" class="toggled waves-effect waves-block">
                        <i class="material-icons">whatshot</i>
                        <span>Movimientos</span>
                    </a>
                </li>

                <li>
                    <a href="character.php" class="toggled waves-effect waves-block">
                        <i class="material-icons">child_care</i>
                        <span>Maestros</span>
                    </a>
                </li>
                <li>
                    <a href="character.php" class="toggled waves-effect waves-block">
                        <i class="material-icons">poll</i>
                        <span>Estadisticas</span>
                    </a>
                </li>

                <li>
                    <a href="character.php" class="toggled waves-effect waves-block">
                        <i class="material-icons">bug_report</i>
                        <span>Reportes</span>
                    </a>
                </li>

            </ul>
        </div>
        <!-- #Menu -->
        <!-- Footer -->
        <div class="legal">
            <div class="copyright">
                &copy; <?php echo date("Y"); ?> <a href="javascript:void(0);">POKEMON - ADMINISTRADOR</a>.
            </div>
            <div class="version">
                <b>Version: </b> 1.0
            </div>
        </div>
        <!-- #Footer -->
    </aside>
    <!-- #END# Left Sidebar -->
    <!-- Right Sidebar -->
    <aside id="rightsidebar" class="right-sidebar">
        <ul class="nav nav-tabs tab-nav-right" role="tablist">
            <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active in active" id="skins">
                <ul class="demo-choose-skin">
                    <li data-theme="red" class="active">
                        <div class="red"></div>
                        <span>Red</span>
                    </li>
                    <li data-theme="pink">
                        <div class="pink"></div>
                        <span>Pink</span>
                    </li>
                    <li data-theme="purple">
                        <div class="purple"></div>
                        <span>Purple</span>
                    </li>
                    <li data-theme="deep-purple">
                        <div class="deep-purple"></div>
                        <span>Deep Purple</span>
                    </li>
                    <li data-theme="indigo">
                        <div class="indigo"></div>
                        <span>Indigo</span>
                    </li>
                    <li data-theme="blue">
                        <div class="blue"></div>
                        <span>Blue</span>
                    </li>
                    <li data-theme="light-blue">
                        <div class="light-blue"></div>
                        <span>Light Blue</span>
                    </li>
                    <li data-theme="cyan">
                        <div class="cyan"></div>
                        <span>Cyan</span>
                    </li>
                    <li data-theme="teal">
                        <div class="teal"></div>
                        <span>Teal</span>
                    </li>
                    <li data-theme="green">
                        <div class="green"></div>
                        <span>Green</span>
                    </li>
                    <li data-theme="light-green">
                        <div class="light-green"></div>
                        <span>Light Green</span>
                    </li>
                    <li data-theme="lime">
                        <div class="lime"></div>
                        <span>Lime</span>
                    </li>
                    <li data-theme="yellow">
                        <div class="yellow"></div>
                        <span>Yellow</span>
                    </li>
                    <li data-theme="amber">
                        <div class="amber"></div>
                        <span>Amber</span>
                    </li>
                    <li data-theme="orange">
                        <div class="orange"></div>
                        <span>Orange</span>
                    </li>
                    <li data-theme="deep-orange">
                        <div class="deep-orange"></div>
                        <span>Deep Orange</span>
                    </li>
                    <li data-theme="brown">
                        <div class="brown"></div>
                        <span>Brown</span>
                    </li>
                    <li data-theme="grey">
                        <div class="grey"></div>
                        <span>Grey</span>
                    </li>
                    <li data-theme="blue-grey">
                        <div class="blue-grey"></div>
                        <span>Blue Grey</span>
                    </li>
                    <li data-theme="black">
                        <div class="black"></div>
                        <span>Black</span>
                    </li>
                </ul>
            </div>

        </div>
    </aside>
    <!-- #END# Right Sidebar -->
</section>