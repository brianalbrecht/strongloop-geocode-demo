module.exports = function(Geocode) {
    var isStatic = true;
    Geocode.disableRemoteMethod('invoke', isStatic);
};
