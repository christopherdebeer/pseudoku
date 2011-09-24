


function returnBlock (x,y) {
	if (x<3) {
		if (y<3) {
			return 1;
		} else if (y<6) {
			return 2;
		} else {
			return 3;
		}
	} else if (x<6) {
		if (y<3) {
			return 4;
		} else if (y<6) {
			return 5;
		} else {
			return 6;
		}
	} else {
		if (y<3) {
			return 7;
		} else if (y<6) {
			return 8;
		} else {
			return 9;
		}
	}
}


for (a=6;a<9;a++) {
	for (b=6;b<9;b++) {
		if ($("td[data-x='" + a.toString() + "'][data-y='" + b.toString() + "']:contains('" + options.value + "')").length > 0 && options.x != a && options.y != b) { return false;}
	}
}
