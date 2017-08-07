TrophyRoom.prototype.constructor = TrophyRoom;

function TrophyRoom() {
    this.listRecords = [];
}

TrophyRoom.prototype.setRecords = function (newValue) {
    this.listRecords = newValue;
}

TrophyRoom.prototype.pullInfo = function ($scope) {
    /*
    $scope.contentNormalRecordsCal = "";
    for (var i = 0; i < this.listRecords.length; i++) {
        console.log(this.listRecords[i])
        $scope.contentNormalRecordsCal += this.createCard(this.listRecords[i].id, this.listRecords[i].nick, this.listRecords[i].record);
    }
    */
}

TrophyRoom.prototype.createCard = function (pos, nick, score) {
    return '<div class="row"> ' +
        '<div class="col">' + pos + '</div>' +
        '<div class="col">' + nick + '</div>' +
        '<div class="col">' + score + '</div>' +
        '</div>'
}