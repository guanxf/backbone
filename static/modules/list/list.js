define(function(require,exports,module){
	
	// 创建图片类
	var List = Backbone.View.extend({
		// 获取模板函数
		tpl : _.template('<a href="#layer/<%=id%>"><img src="<%=url%>" style="<%=style%>"></a>'),
		// 设置左右盒子的初始高度
		LeftHeight : 0,
		RightHeight : 0,
		// 定义事件
		events : {	
			'click .search span' : 'search',
			'click .nav li' : 'getTypeData',
			'click .back' : 'goback'
		},
		// 构造函数
		initialize : function(){
			var self = this;
			// 获取数据
			this.getData();
			// 获取左右盒子容器
			this.getDom();
			// 监听add事件,渲染模型
			this.listenTo(this.collection,'add',function(model){
				this.render(model)
			});
			// 根据滚动的距离获取数据
			$(window).scroll(function(){
				var val = $('body').height() - $(window).scrollTop() - $(window).height() - 200 < 0;
				if (val) {
					self.collection.FetchData();
				};
				// 显示和隐藏返回顶部键
				if ($(window).scrollTop() > 500) {
					self.$el.find('.back').show();
				} else{
					self.$el.find('.back').hide();
				};
			})
		},
		// 通过点击的类型获得对应的id
		getTypeData : function(e){
			var id = $(e.target).attr('data-id');
			this.getDataByKey(id,'type');
		},
		// 返回顶部
		goback : function(){
			window.scrollTo(0,0);
		},
		// 得到input输入的value值
		getValue : function(){
			return this.$el.find('.search input').val();
		},
		// 检查输入值是否合法,值为空是不合法的
		checkValue : function(value){
			if (/^\s*$/.test(value)) {
				alert('请输入查找的内容!');
				return false;
			};
			return true;
		},
		// 通过值来获取集合模型
		getDataByKey : function(val,key){
			var key = key || "title";
			var result = this.collection.filter(function(model){
				if (key === 'type') {
					return model.get('type') == val;
				};
				return model.get(key).indexOf(val) != -1
			})
			this.resetView(result);
		},
		// 清空视图
		clearView : function(){
			this.LeftContainer.html('');
			this.RightContainer.html('');
			this.LeftHeight = 0;
			this.RightHeight = 0;
		},
		// 重设置视图
		resetView : function(result){
			var self = this;
			this.clearView();
			result.forEach(function(model){
				self.render(model)
			})
		},
		// 搜索框事件
		search : function(){
			var value = this.getValue();
			if (!this.checkValue(value)) {
				return;
			};
			// 修正value值,去除前后空格
			var val = value.replace(/^\s+ | \s+$/g,'');
			this.getDataByKey(val);
		},
		// 得到左右盒子容器
		getDom : function(){
			this.LeftContainer = this.$el.find('.left-container');
			this.RightContainer = this.$el.find('.right-container');
		},
		// 获取数据
		getData : function(){
			this.collection.FetchData();
		},
		// 渲染左边盒子
		LeftRender : function(model,html){
			this.LeftContainer.append(html);
			this.LeftHeight += model.get('viewHeight');
		},
		// 渲染右边盒子
		RightRender : function(model,html){
			this.RightContainer.append(html);
			this.RightHeight += model.get('viewHeight');
		},
		// 渲染模型
		render : function(model){
			// 获取模板
			var tpl = this.tpl;
			// 获取数据
			var data = {
				id : model.get('id'),
				url : model.get('url'),
				style : 'width:' + model.get('viewWidth') +'px height:' + model.get('viewHeight') + 'px' 
			};
			// 格式化模板
			var html = tpl(data);
			// 左右容器,谁低就往哪边加
			if (this.LeftHeight <= this.RightHeight) {
				this.LeftRender(model,html);
			} else{
				this.RightRender(model,html);
			};
		}
	})
	// 暴露接口
	module.exports = List;
})