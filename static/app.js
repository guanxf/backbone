define(function(require,exports,module){
	// 引入图片集合
	var ImgCollection = require('modules/collection/collection');
	// 引入列表视图
	var List = require('modules/list/list');
	// 引入大图页视图
	var Layer = require('modules/layer/layer');
	// 实例化图片集合
	var imgCollection = new ImgCollection();
	// 实例化列表视图
	var list = new List({
		// 绑定页面容器
		el : $('#app'),
		// 绑定图片集合与列表视图
		collection : imgCollection
	});
	// 实例化大图页视图
	var layer = new Layer({
		el : $('#app'),
		collection : imgCollection
	});
	// 1.创建路由类
	var Router = Backbone.Router.extend({
		// 设置路由规则
		routes : {
			'layer/:id' : 'showLayer',
			'*other' : 'shouList'
		},
		showLayer : function(id){
			// 显示大图页,隐藏列表页
			$('.list').hide();
			$('.layer').show();
			// 通过路由的id渲染
			layer.render(id);
		},
		shouList : function(){
			// 显示列表页,隐藏大图页
			$('.layer').hide();
			$('.list').show();
		}
	})
	// 2.实例化路由
	var router = new Router();
	// 暴露接口
	module.exports = function(){
		// 3.启动路由
		Backbone.history.start();
	}
})