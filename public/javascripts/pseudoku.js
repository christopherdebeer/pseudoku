


(function($){
			$(document).ready(function () {

				now.populateBoard = function (board) {
					$("#board td").each (function(i,el) {
						if (board[i] != 0) $(el).text(board[i]);
					});
				}

				now.clearUserSq = function (userId) {
					$("#board .user" + userId.toString() )
						.removeClass("busy")
						.removeClass("selected");
				}
				now.blockSq = function (userId,options) {
					console.log("Reciveing busy req from server...");
					$("#board td[data-x='" + options.x.toString() + "'][data-y='" + options.y.toString() + "']")
						.addClass("busy")
						.addClass("user" + userId.toString());	
				}

				now.recieveMove = function (options) {
					console.log("Recieving move from server....");
					updateSq({
						x: options.x,
						y: options.y,
						value: options.value
					});
				}

				var updateSq = function (options) {
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


				$("#board").append("<tr><td>Connecting...</td><tr>");
				now.ready( function() {
					



					now.users[now.core.clientId] = prompt("What username do you want to use?", "guest" + now.core.clientId.toString());
					// setup board

					$("#board").html("");
					for (var x = 0; x < 9; x++) {
						$("#board").append("<tr id='row" + x.toString() +"'/>");
						for (var y = 0; y < 9; y++) {
							$("#row" + x.toString()).append("<td data-x='" + x.toString() + "' data-y='" + y.toString() + "' ></td>")
						}
					}

					now.populateBoard(now.board);

					// square click events
					$("#board td").click(function(e) {
						if (!$(this).hasClass("done") && !$(this).hasClass("busy")) {
							$("#board td").removeClass("selected");
							now.reserveSq(now.core.clientId,{
								x: $(this).attr("data-x"),
								y: $(this).attr("data-y")
							});
							$(this).addClass("selected")
								.attr("style","")
							$("#numPad").show();
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

							now.makeMove(now.core.clientId,{
								x: thisX,
								y: thisY,
								value: newValue
							});
						}
					});

					// reset button

					$(".reset").click(function(e){
						e.preventDefault();
						now.resetBoard(now.core.clientId);
						return false;
					});

				});

			});
		})(jQuery);