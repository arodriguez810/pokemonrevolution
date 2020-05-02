<!--TEXTS-->
<div style="position: absolute;display: none;width: 98%;z-index: 99999" id="texts">
    <div class="DialogWindow" style="min-height: 172px;min-width: 600px;opacity: 1">
        <div class="DialogTitle">
            <img style="float: right"
                 src="data/characters_file/{{dialogHero.name}}/face.png?v={{dialogHero.version||''}}"
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
                    <img style="width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(value.icon).x}}px -{{icon(value.icon).y}}px;"
                         ng-show="value.icon"> {{value.text}}
                </button>
            </div>
        </div>
    </div>
</div>

<div style="position: absolute;    display: none;    width: 98%;    z-index: 99999;" id="notify"
     onclick="$('#notify').hide()">
    <div class="DialogWindow" style="min-width: 300px;width: 100%;font-size: 24px;" onclick="$('#notify').hide()">
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
