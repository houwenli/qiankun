(function (n, o) {
  "object" === typeof exports && "object" === typeof module
    ? (module.exports = o())
    : "function" === typeof define && define.amd
    ? define([], o)
    : "object" === typeof exports
    ? (exports["subone-app"] = o())
    : (n["subone-app"] = o());
})(self, function () {
  
});