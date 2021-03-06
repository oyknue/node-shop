// Include 실행
includeHTML();

// Include 함수
function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/* Make an HTTP request using the attribute value as the file name: */
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
						//서버에서 불러온 html이 적용된 후
						$.ajax({
							type: "get",
							url: "/ajax/cate/top/r",
							dataType: "json",
							success: function (res) {
								var html = '';
								html += '<ul class="navi-sub">';
								for(var i in res) {
									html += '<li class="link-elm" data-url="'+res[i].catelink+'">'+res[i].catename+'</li>';
								}
								html += '</ul>';
								$(".navi > li").eq(1).append(html);
								$(".navi > li").mouseenter(function(){
									$(this).find(".navi-sub").css({"opacity":0, "display":"block"});
									$(this).find(".navi-sub").stop().animate({"opacity":1, "top":"34px"}, 300);
								});
								$(".navi > li").mouseleave(function(){
									$(this).find(".navi-sub").stop().animate({"opacity":0, "top":"80px"}, 300, function(){
										$(this).css({"display":"none"});
									});
								});
								$(".link-elm").click(function(){
									var url = $(this).data("url");
									var tar = $(this).data("tar");
									if(tar == "_blank") window.open(url);
									else location.href = url;
								});
							}
						});
					}
					if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			} 
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}