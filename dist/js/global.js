$(document).ready(function () {
  //模块js初始化
  commonJs.fn.init();

});

var commonJs = $(window).commonJs || {};

commonJs.fn = {
  init: function () {
    var _this = this;
    _this.dropdown();
  },

  // 下拉菜单
  dropdown: function () {
    $('.dropdown').on('click', '.dropdown-menu li a', function (event) {
      var txt = $(this).text();
      $(this).parents('.dropdown-menu').siblings('.dropdown-toggle')[0].childNodes[0].nodeValue = txt + ' ';
    });
  },

  // 侧边条
  nicescroll: function () {
    $(".nicescroll").niceScroll({
      cursorcolor: "#ccc",
      cursorwidth: "3px",
      cursorborder: "none"
    });
  },

  // 复选框
  icheck: function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue',
      increaseArea: '20%'
    });
  }

};


var $header = document.getElementById('js_header');
var $aside = document.getElementById('js_aside');

if($header) {
  var vm_header = new Vue({
    el: '#js_header',
    data() {
      return {}
    },
    methods:{
      handleOpen() {
        location.href = "login.html";
      }
    }
  })
}

if ($aside) {
  var navMenu = Vue.extend({
    template: `<div class="navMenu">
      <label v-for="navMenu in navmenus" class="label-row">
        <!--只有一级菜单-->
        <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                      :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :route="navMenu.entity.value"
                      >
            <!--图标-->
          <i :class="navMenu.entity.icon"></i>
          <!--标题-->
          <span slot="title">{{navMenu.entity.alias}}</span>
        </el-menu-item>
        <!--有多级菜单-->
        <el-submenu v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                    :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
          <template slot="title">
            <i :class="navMenu.entity.icon"></i>
            <span> {{navMenu.entity.alias}}</span>
          </template>
          <!--递归组件，把遍历的值传回子组件，完成递归调用-->
          <nav-menu :navmenus="navMenu.childs"></nav-menu>
        </el-submenu>
      </label>
    </div>`,
    name: 'NavMenu', //使用递归组件必须要有
    props: {
      navmenus: {
        type: Array,
        default: [],
      }
    }, // 传入子组件的数据
    data() {
      return {

      }
    },
    methods: {},
    created() {

    },
  })

  //侧边栏
  var vm_sidebar = new Vue({
    el: '#js_aside',
    components: {
      // 2. 将navMenu组件注册到Vue实例下
      navMenu
    },
    data() {
      return {
        isCollapse: false,
        currentPath: '',
        leftMenus: [
          {
            entity: {
              id: 1,
              parentMenuId: 0,
              name: "systemManage",
              icon: null,
              alias: "票据管理",
              state: "ENABLE",
              sort: 0,
              value: null,
              type: "NONE",
              discription: "用于系统管理的菜单",
              createUserId: 1
            },
            childs: [
              {
                entity: {
                  id: 2,
                  parentMenuId: 1,
                  name: "stamp-manger",
                  icon: null,
                  alias: "票据申请",
                  state: "ENABLE",
                  sort: 0,
                  value: "/system/auth",
                  type: "LINK",
                  discription: "用于权限管理的菜单",
                  createUserId: 1
                },
                childs: null
              },
              {
                entity: {
                  id: 3,
                  parentMenuId: 1,
                  name: "stamp-manger-check",
                  icon: null,
                  alias: "票据审核",
                  state: "ENABLE",
                  sort: 0,
                  value: "/system/auth",
                  type: "LINK",
                  discription: "用于权限管理的菜单",
                  createUserId: 1
                },
                childs: null
              },
              {
                entity: {
                  id: 4,
                  parentMenuId: 1,
                  name: "stamp-manger-recognition",
                  icon: null,
                  alias: "票据识别",
                  state: "ENABLE",
                  sort: 0,
                  value: "/system/auth",
                  type: "LINK",
                  discription: "用于权限管理的菜单",
                  createUserId: 1
                },
                childs: null
              },
            ]
          },
          {
            entity: {
              id: 5,
              parentMenuId: 0,
              name: "stamp-manger-standard",
              icon: null,
              alias: "票据标准",
              state: "ENABLE",
              sort: 1,
              value: "/system/auth",
              type: "LINK",
              discription: "用于用户管理的菜单",
              createUserId: 1
            },
            childs: [
              {
                entity: {
                  id: 6,
                  parentMenuId: 5,
                  name: "stamp-manger-standard",
                  icon: null,
                  alias: "票据标准管理",
                  state: "ENABLE",
                  sort: 0,
                  value: "/system/auth",
                  type: "LINK",
                  discription: "用于权限管理的菜单",
                  createUserId: 1
                },
                childs: null
              },
            ]
          }
        ]
      }
    },
    computed: {
      imgWidth() {
        if (this.isCollapse) {
          return 'width:48px;'
        } else {
          return 'width:68px;'
        }

      },
    },
    methods: {

      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      menuSelected(index, indexPath) {
        console.log('当前绑定的index值', index)
        console.log('当前绑定的index与path值', indexPath)
        // console.log(index + '.html')
        location.href = index + '.html';

      },
    },

    created() {
      // console.log(this.leftMenus.length)
      // var path = decodeURI(location.pathname.split('/').slice(-1).toString()).replace(/.html/, '');
      // console.log(path)
      // this.currentPath = path;
    },


  })

}
