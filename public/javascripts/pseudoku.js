(function($){
			$(document).ready(function () {


				var updateSq= function (options) {
					if (isValid(options)){
						var selector = "td[data-x=" + options.x + "][data-y=" + options.y + "]";
						// console.log(options,selector);
						$(selector)
							.text(options.value)
							.removeClass("selected")
							.addClass("done");
						$("#numPad").hide();

					} else {
						console.log("Not a valid move", options);
						var selector = "td[data-x=" + options.x + "][data-y=" + options.y + "]";
						// console.log(options,selector);
						$(selector)
							.removeClass("selected")
							.css("background-color", "#ff0000")
							.animate({
							      backgroundColor: "none"
							}, 1500 );
						$("#numPad").hide();
					}
				}

				var isValid = function (options) {

					// check row
					if ($("td[data-x=" + options.x + "]:contains('" + options.value + "')").length > 0) return false;
					// check column	
					if ($("td[data-y=" + options.y + "]:contains('" + options.value + "')").length > 0) return false;
					// check local square
					// if (options.x < 3) {
					// 	if (options.y < 3) {

					// 		// master block A
					// 		console.log("checking block A");
					// 		for (a=0;a<3;a++) {
					// 			for (b=0;b<3;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}

					// 	} else if (options.y < 6) {
					// 		// master block B
					// 		console.log("checking block B");
					// 		for (a=0;a<3;a++) {
					// 			for (b=3;b<6;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}

					// 	} else {
					// 		//master block C
					// 		console.log("checking block C");
					// 		for (a=0;a<3;a++) {
					// 			for (b=6;b<9;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}
					// 	}
					// } else if (options.x < 6) {
					// 	if (options.y < 3) {
					// 		// master block D
					// 		console.log("checking block D");
					// 		for (a=3;a<6;a++) {
					// 			for (b=0;b<3;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}
					// 	} else if (options.y < 6) {
					// 		// master block E
					// 		console.log("checking block E");
					// 		for (a=3;a<6;a++) {
					// 			for (b=3;b<6;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}
					// 	} else {
					// 		// master block F
					// 		console.log("checking block F");
					// 		for (a=3;a<6;a++) {
					// 			for (b=6;b<9;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}
					// 	}
					// } else {
					// 	if (options.y < 3) {
					// 		// master block G
					// 		console.log("checking block G");
					// 		for (a=6;a<9;a++) {
					// 			for (b=0;b<3;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}
					// 	} else if (options.y < 6) {
					// 		// master block H
					// 		console.log("checking block H");
					// 		for (a=6;a<9;a++) {
					// 			for (b=3;b<6;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}
					// 	} else {
					// 		// master block I
					// 		console.log("checking block I");
					// 		for (a=6;a<9;a++) {
					// 			for (b=6;b<9;b++) {
					// 				if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
					// 			}
					// 		}
					// 	}
					// }

					
					if (options.x<3) {
						xmin = 0
						xmax = 3
					} else if (options.x<6) {
						xmin = 3;
						xmax = 6
					} else {
						xmin = 6;
						xmax = 9;
					}

					if (options.y<3) {
						ymin = 0
						ymax = 3
					} else if (options.y<6) {
						ymin = 3;
						ymax = 6
					} else {
						ymin = 6;
						ymax = 9;
					}


					for (a=xmin;a<xmax;a++) {
						for (b=ymin;b<ymax;b++) {
							if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
						}
					}


					return true;
				}

				// setup board
				for (var x = 0; x < 9; x++) {
					$("#board").append("<tr id='row" + x.toString() +"'/>");
					for (var y = 0; y < 9; y++) {
						$("#row" + x.toString()).append("<td data-x='" + x.toString() + "' data-y='" + y.toString() + "' ></td>")
					}
				}

				// square click events
				$("#board td").click(function(e) {
					if (!$(this).hasClass("done") && !$(this).hasClass("busy")) {
						$("#board td").removeClass("selected");
						$("#numPad").show();
						$(this).attr("style","")
							.addClass("selected");
					}
				});


				// numPad click events
				$("#numPad a").click(function(e) {
					if ($(this).text() == "Cancel") {
						e.preventDefault();
						$("#numPad").hide();
						$("#board td").removeClass("selected");
					} else {
						e.preventDefault();
						var thisX = $("td.selected").attr("data-x");
						var thisY = $("td.selected").attr("data-y");
						var newValue = $(this).text();
						updateSq({
							x: thisX,
							y: thisY,
							value: newValue 
						});
					}
				});

			});
		})(jQuery);