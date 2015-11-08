var utils = {
    //是否父层有a标签
    hasATag: function (node) {
        var flag = false;
        while(!node.hasClass('jtc-card')){
            if(node[0].tagName === 'A'){
                flag = true;
                break;
            }
            node = node.parent();
            if(node[0].tagName === 'HTML') break;
        }
        return flag;
    },
    //节点和子节点是否有文字
    hasNodeText: function () {

    },
    getValidWidth: function (scope) {
        while(!(scope.width() !==0)){
            scope = scope.children()
        }
        return scope.width() ? scope.width() : 0
    },
    jsTemplate: (function(){
        var cache = {},
            foo = function tmpl(str, data){
                var fn = !/\W/.test(str) ?
                    cache[str] = cache[str] ||
                        tmpl(document.getElementById(str).innerHTML) :
                    new Function("obj",
                        "var p=[],print=function(){p.push.apply(p,arguments);};" +
                        "with(obj){p.push('" +
                        str
                            .replace(/[\r\t\n]/g, " ")
                            .split("<%").join("\t")
                            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                            .replace(/\t(.*?)%>/g, "',$1,'")
                            .split("\t").join("');")
                            .split("%>").join("p.push('")
                            .split("\r").join("\\'")
                        + "');}return p.join('');");
                return data ? fn( data ) : fn;
            };
        return foo
    })()
}