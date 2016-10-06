define(function(require,exports,module){
	// 由于移动端手机屏不一样,动态获取屏幕高度
	var h = $(window).height();
	// 创建大图页类
	var Layer = Backbone.View.extend({
		// 创建模板
		tpl : _.template($('#tpl').html()),
		// 定义事件
		events : {
			'singleTap .layer-container img' : 'togglehide',
			'singleTap .layer .arrow-container' : 'goback',
			'swipeLeft .layer-container img' : 'goNext',
			'swipeRight .layer-container img' : 'goprev',
			'doubleTap .layer-container img' : 'scaleImg'
		},
		// 双击放大
		scaleImg : function(e){
			// console.log(e)
			e.stopPropagation();
			$(e.target).toggleClass('change');
		},
		// 返回到列表页
		goback : function(){
			// 设置hash值
			location.hash = '#'
		},
		// 显示下一张图片
		goNext : function(){
			// 当前id++
			this.currentId++;
			// 根据id获取模型实例化对象
			var model = this.collection.get(this.currentId);
			// 如果模型存在,换图片和title
			if (model) {
				this.$el.find('.layer-container img').attr('src',model.get('url'));
				this.$el.find('.layer .header h1').html(model.get('title'));
			} else{
				// 模型不存时,还要将id复原
				alert('已经是最后一张了!')
				this.currentId--;
			};
		},
		// 显示前一张图片
		goprev : function(){
			// 当前id--
			this.currentId--;
			// 通过id获取模型实例化对象
			var model = this.collection.get(this.currentId);
			if (model) {
				this.$el.find('.layer-container img').attr('src',model.get('url'));
				this.$el.find('.layer .header h1').html(model.get('title'));
			} else{
				alert('已经是第一张了!')
				this.currentId++;
			};
		},
		// 显示与隐藏头部内容
		togglehide : function(){
			this.$el.find('.layer .header').toggleClass('hide')
		},
		// 渲染
		render : function(id){
			// 得到当前的id
			this.currentId = id;
			var model = this.collection.get(id);
			if (!model) {
				return
			};
			// 根据模板需要的数据创建一个数据对象
			var data = {
				url : model.get('url'),
				title : model.get('title'),
				style : 'line-height:' + h + "px"
			};
			// 格式化模板
			var html = this.tpl(data);
			// 加入到视图中
			this.$el.find('.layer').html(html);
		}
	});
	// 暴露接口
	module.exports = Layer;	
})