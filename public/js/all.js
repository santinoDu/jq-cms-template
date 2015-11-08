var config = {
    moduleTemplate:[
        {
            id: 'jt_01',
            title: '搜索框',
            img: '',
        },
        {
            id: 'jt_02',
            title: '网站推荐',
            img: '',
        },
        {
            id: 'jt_03',
            title: '生活推荐',
            img: '',
        },
    ],
    tags: {
        a : {
            title: {
                desc: '标题(seo)',
                type: 'text'
            },
            href: {
                desc: '链接',
                type: 'text'
            },
            innerHTML: {
                desc: '标题',
                type: 'text'
            }
        },
        img: {
            src: {
                desc: '图片链接',
                type: 'file'
            },
            alt: {
                desc: '图片介绍',
                type: 'text'
            },
        },
        p: {
            innerHTML: {
                desc: '输入文字',
                type: 'text'
            }
        }
    },
    editProps:{
    },
    modify: {

    }


}






var events = (function () {
    //阴影显示
    $('#jtc_main').on('mouseenter', 'a', function () {
        handle.addHoverShadow(this);
    })
    $('#jtc_main').on('mouseleave', 'a', function () {
        handle.removeHoverShadow(this);
    })

    //编辑状态禁止跳转
    $('#jtc_main').on('click', 'a', function (e) {
        e.preventDefault();
    })

    //右键弹出一级菜单
    $('#jtc_main').on('contextmenu', function (e) {
        e.preventDefault();
        var $hoverShadow = $('.hover-shadow'),
            hoverEleOffset = $hoverShadow.offset(),
            hSWidth = utils.getValidWidth($hoverShadow),
            $editMenu = $('#edit_menu'),
            $virtualBox = $('#virtual_phone'),
            $virtualBoxOffset = $virtualBox.offset(),
            posL,
            porT;
        //标记编辑element
        handle.changeEditOpen($hoverShadow);
        posL = hoverEleOffset.left + hSWidth - $virtualBoxOffset.left - 10//边框10px
        porT = hoverEleOffset.top + $virtualBox.scrollTop() - $virtualBoxOffset.top - 10
        //88为编辑menu宽度，这个取值有点改进
        if($virtualBox.width() - posL < 88){
            posL = posL - hSWidth -88;
        }
        $editMenu.css({
            left: posL,
            top: porT
        }).show();
    })


    $(document).on('keydown', function (e) {
        console.log(e,"e")
        if(e.shiftKey){
            switch (e.keyCode){
                case 37:
                    handle.prevNodeFocus();
                    break;
                case 38:
                    handle.parentNodeFocus();
                    break;
                case 39:
                    handle.nextNodeFocus();
                    break;
                case 40:
                    handle.childNodeFocus();
                    break;
                default :
                    break;
            }
        }
    })

    $('#jtc_main').on('dblclick', function (e) {
        if(utils.hasATag($(this))) return;
    })

    //选择模板
    $('#template_module').on('click', '.item', function () {
        var id = $(this).data('id'),
            moduleHtml = utils.jsTemplate(id, {});
        $('#jtc_main').append(moduleHtml);
    })

    //选择修改类型
    $('#edit_menu').on('click', '.item', function () {
        if($(this).hasClass('j_edit_modify')){
            handle.editModify();
        }else if($(this).hasClass('j_edit_delete')){
            handle.editDelete();
        }else if($(this).hasClass('j_edit_clone')){
            handle.editClone();
        }else if($(this).hasClass('j_edit_up')){
            handle.editUp();
        }else if($(this).hasClass('j_edit_down')){
            handle.editDown();
        }else if($(this).hasClass('j_edit_close')){
            $('#edit_menu').hide();
        }
        $('#edit_menu').hide();
    })

    //编辑属性区域
    $('#edit_box').on('focus', 'input', function () {
        var mapIndex = $(this).data('map');
        $(handle.editModifyMap[mapIndex]).addClass('edit_focus');
    })

    $('#edit_box').on('blur', 'input', function () {
        $('.edit_focus').removeClass('edit_focus');
    })

    $('#edit_box').on('keyup', 'input', function () {
        var mapIndex = $(this).data('map'),
            key = $(this).data('key'),
            dom = handle.editModifyMap[mapIndex];
        $(dom).addClass('edit_focus');
        dom[key] = $(this).val();
    })



}(window, document))
var handle = {
    editOpenDom: null,
    addHoverShadow: function (scope) {
        $('.hover-shadow').removeClass('hover-shadow');
        $(scope).addClass('hover-shadow');
    },
    removeHoverShadow: function () {
        $('.hover-shadow').removeClass('hover-shadow');
    },
    editModifyMap: [],
    editModify: function () {
        var $children = this.editOpenDom.find('*').andSelf(),
            i = 0,
            len = $children.length,
            validTags = config.tags,
            str = '',
            count = 0;
        this.editModifyMap = [];
        for(; i< len; i++){
            var tagName = $children.eq(i).get(0).tagName.toLocaleLowerCase();
            if(validTags.hasOwnProperty(tagName)){
                this.editModifyMap.push($children.eq(i).get(0));
                for(var prop in validTags[tagName]){
                    var value = validTags[tagName][prop]
                    str +='<div class="item">' + value.desc
                        + '<input data-key="'+ prop +'" data-map="'+ count +'" type="'+ value.type +'" />'
                        + '</div>';
                }
                count++;
            }
        }

        $('#edit_box').html(str);

    },
    editDelete: function () {
        var validDom = this.getValidDom(this.editOpenDom);

        validDom.addClass('edit-delete');
    },
    editClone: function () {
        var validDom = this.getValidDom(this.editOpenDom);
        validDom.after(validDom.clone());
    },
    editUp: function () {
        var validDom = this.getValidDom(this.editOpenDom),
            prevDom = validDom.prev();
        if(prevDom.length){
            prevDom.before(validDom)
        }
    },
    editDown: function () {
        var validDom = this.getValidDom(this.editOpenDom),
            nextDom = validDom.next();
        if(nextDom.length){
            nextDom.after(validDom)
        }
    },
    //这个方法有待改进
    getValidDom: function (dom) {
        while(dom.siblings().length === 0){
            if(dom.hasClass('jtc-card')) break;
            dom = dom.parent();
        }
        return dom
    },
    changeEditOpen: function (dom) {
        $('.edit_open').removeClass('edit_open');
        dom.addClass('edit_open');
        this.editOpenDom = dom;
    },
    prevNodeFocus: function () {
        if(this.editOpenDom.prev().length){
            this.changeEditOpen(this.editOpenDom.prev());
        }
    },
    parentNodeFocus: function () {
        if(this.editOpenDom.parent().get(0).id !== "jtc_main"){
            this.changeEditOpen(this.editOpenDom.parent());
        }
    },
    nextNodeFocus: function () {
        if(this.editOpenDom.next().length){
            this.changeEditOpen(this.editOpenDom.next());
        }
    },
    childNodeFocus: function () {
        if(this.editOpenDom.children().length){
            this.changeEditOpen(this.editOpenDom.children().eq(0));
        }
    }

}
var main = {
    init: function () {
        this.initTemplateModule();
    },
    initTemplateModule: function () {
        var i = 0,
            templates = config.moduleTemplate,
            len = templates.length,
            str = '';
        for(; i< len; i++){
            str += '<div class="item" data-id="'+ templates[i]['id'] +'">'+ templates[i]['title'] +'</div>';
        }
        $('#template_module').html(str);
    }
}
main.init();
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