var events = (function (window, document) {
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
            handle.editClose();
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