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
            var tagName = $children.eq(i).get(0).tagName.toLocaleLowerCase(),
                hasTextNode = !$children.eq(i).children().length && $children.eq(i).text().trim().length;
            if(validTags.hasOwnProperty(tagName)){
                this.editModifyMap.push($children.eq(i).get(0));
                for(var prop in validTags[tagName]){
                    var value = validTags[tagName][prop];
                    str +='<div class="item">' + value.desc
                        + '<input data-key="'+ prop +'" data-map="'+ count +'" type="'+ value.type +'" />'
                        + '</div>';
                }
                count++;
            }else if(hasTextNode){
                var text = $children.eq(i).text();
                this.editModifyMap.push($children.eq(i).get(0));
                str += '<div class="item">' + text
                    + '<input data-key="innerHTML" data-map="'+ count +'" type="text" value="'+ text +'" />'
                    + '</div>';
                count++;
            }
        }

        $('#edit_box').html(str);

    },
    editDelete: function () {
        var validDom = this.getValidDom(this.editOpenDom);
        validDom.remove();
        this.editClose();
        //validDom.addClass('edit-delete');

    },
    editClone: function () {
        var validDom = this.getValidDom(this.editOpenDom);
        validDom.after(validDom.clone());
        this.editClose();
    },
    editUp: function () {
        var validDom = this.getValidDom(this.editOpenDom),
            prevDom = validDom.prev();
        if(prevDom.length){
            prevDom.before(validDom)
        }
        this.editClose();
    },
    editDown: function () {
        var validDom = this.getValidDom(this.editOpenDom),
            nextDom = validDom.next();
        if(nextDom.length){
            nextDom.after(validDom)
        }
        this.editClose();
    },
    editClose: function () {
        $('.edit_open').removeClass('edit_open');
        $('#virtual_phone').removeClass('edit-open');
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
        $('#virtual_phone').addClass('edit-open');
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