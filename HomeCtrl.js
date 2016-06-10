/**
 * Created by Uchqun on 10.06.2016.
 */
var HomeCtrl = function ($http) {

    var home = this;
    home.sendText = '';

    $http.get('api/users').
        then((response) => this.msgs = response.data);

    home.sendToUser = function (userId) {
        //alert(home.sendText);
        $http.post(`api/sendMessage/${userId}`, {'text': home.sendText});
    };
};

module.exports = HomeCtrl;