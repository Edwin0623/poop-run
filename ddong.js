let ddong = document.getElementById("ddong");

export function DDong(x, y, dx, dy, size) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.size = size;
	this.game_width = 350;

	this.draw = function(ctx) {
		ctx.drawImage(ddong, this.x, this.y, this.size, this.size);
	};

	this.update = function() {
		// 똥은 하늘에서 떨어지기만 한다
		this.y = this.y + this.dy;
		// 똥이 그려질때 오른쪽 화면 밖에 걸치면 화면 안으로 넣어준다
		// 참고로 x는 시작점 이라서 똥이 화면 왼쪽에 걸칠 일은 없다
		if (this.x + this.size > this.game_width) {
			this.x = this.game_width - this.size;
		}
	};
}
