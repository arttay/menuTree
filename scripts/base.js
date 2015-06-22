(function() {

	var nav = {
		init: function(){
			
			var importData = new XMLHttpRequest(),
				that = this;

			importData.addEventListener('load', function(e){	
				var parsedData = JSON.parse(e.target.response);
				that.setupData(parsedData);
			}, false);

			window.addEventListener("load", function(event){
		    	importData.open('get', 'data/data.json');
				importData.send();   
			},false);

		},
		setupData: function(data){
			//console.log(data);
			var html = "";
			var templates = this.virtual();
			var mainNav  = document.getElementById("mainNav");


			for (var key in data) {
				if (data[key] instanceof Array) {
					var foo = this.createSubMenu(data[key]);

					html += templates.startLi.replace(/\{content\}/g, key).replace(/\{className\}/g, "arrow");
					html += foo;

					html += templates.endLi;
				} else if (data[key] instanceof Object) {
					html += templates.startLi.replace(/\{content\}/g, data[key].name).replace(/\{className\}/g, "");
					html += templates.endLi;

				}
			}

			mainNav.insertAdjacentHTML( 'beforeend', html );
		},

		createSubMenu: function (arr) {
			var html = "",
				template = this.virtual();

			html += template.startUl.replace(/\{className\}/g, "layer2");

			arr.forEach(function (item) {
				console.log(item);
				html += template.startLi.replace(/\{content\}/g, item.name);
				if (item.hasOwnProperty('submenu')) {
					html = html.replace(/\{className\}/g, "layer2Item arrow");
					html += this.createSubMenu(item.submenu);

				} else {
					html = html.replace(/\{className\}/g, "");
				}
				html += template.endLi;
			}.bind(this));
			html += template.endUl;

			return html;

		},

		virtual: function () {
			//lets create a virtual.....dom <_< >_>
			return {
				startLi: "<li class='{className}'>{content}",
				endLi: "</li>",
				startUl: "<ul class={className}>",
				endUl: "</ul>"
			}
		}
	};
	nav.init();

})();