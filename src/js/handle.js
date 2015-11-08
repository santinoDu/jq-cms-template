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