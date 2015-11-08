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