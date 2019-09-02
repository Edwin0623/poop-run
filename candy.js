let candy = document.getElementById("candy");

export function Candy(x, y, dx, dy, size) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.size = size;
	this.game_width = 350;

	this.draw = function(ctx) {
		ctx.drawImage(candy, this.x, this.y, this.size, this.size);
	};

	this.update = function() {
		// 사탕은 좌우로 움직여서 먹기 힘들게 해야 한다.
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
		// 벽에 부딪히면 반사되게 해준다
		if (this.x > 350 - 20 || this.x < 0) {
			this.dx = -this.dx;
		}
		// 사탕이 그려질때 오른쪽 화면 밖에 걸치면 화면 안으로 넣어준다
		// 참고로 x는 시작점 이라서 사탕이 화면 왼쪽에 걸칠 일은 없다
		if (this.x + this.size > this.game_width) {
			this.x = this.game_width - this.size;
		}
	};
}
