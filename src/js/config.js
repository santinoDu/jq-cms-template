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

