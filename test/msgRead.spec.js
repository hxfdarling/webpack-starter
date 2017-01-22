import msgRead from '../src/msgRead.js';


describe('消息已读处理器测试', () => {
	var readStatus = [];
	for (var i = 0; i < 1000; i++) {
		readStatus.push({
			"pid": 161993 + i,
			"jion_mid": 0,
			"read_mid": 0,
			"exit_mid": 0
		})
	}
	var msgs = [];
	for (var i = 1; i < 1000; i++) {
		msgs.push(i);
	}
	beforeEach(function() {
		msgRead.initReadStatus(readStatus);
		msgRead.initMsg(msgs);
	});
	it('初始化没有任何已读', () => {
		var info = msgRead.getMsgStatus(1);
		expect(info.read).toBe(0);
		expect(info.total).toBe(readStatus.length);
		expect(info.unread).toBe(readStatus.length);
	});
	it("更新9条消息已读", () => {
		msgRead.updateReadStatus({
			"pid": 161993,
			"jion_mid": 1,
			"read_mid": 10
		});
		var info = msgRead.getMsgStatus();
		expect(info[1].read).toBe(1);
		expect(info[1].unread).toBe(readStatus.length - 1);
		expect(info[10].read).toBe(1);
		expect(info[10].unread).toBe(readStatus.length - 1);
	});

	it("获取详细的消息已读信息", () => {
		var info = msgRead.getMsgInfo(1);
		expect(info.msgid).toBe(1);
		expect(info.total.length).toBe(readStatus.length);
	});
	it("添加一条新消息", () => {
		msgRead.addMsg(1000);
		var info = msgRead.getMsgStatus(1000);
		expect(info.total).toBe(readStatus.length);
		expect(info.read).toBe(0);
		expect(info.unread).toBe(readStatus.length);
	});
	it("新添加了一人", () => {
		msgRead.updateReadStatus({
			"pid": 161992,
			"jion_mid": 11,
			"read_mid": 11
		});
		var info = msgRead.getMsgStatus();
		expect(info[11].read).toBe(1);
	});
	it("更新一个人的已读信息", () => {
		msgRead.updateReadStatus({
			"pid": 161993,
			"jion_mid": 0,
			"read_mid": 11
		});
		var info = msgRead.getMsgStatus();
		expect(info[11].read).toBe(1);
	});
	it('退出一个成员', () => {
		msgRead.updateReadStatus({
			pid: 161993,
			exit_mid: 1000,
			read_mid: 11,
			jion_mid: 0
		});
		msgRead.addMsg(1000);
		var info = msgRead.getMsgStatus();

		expect(info[1000].total).toBe(readStatus.length - 1);
		expect(info[1000].read).toBe(0);
		expect(info[1000].unread).toBe(readStatus.length - 1);

		expect(info[999].total).toBe(readStatus.length);
		expect(info[999].read).toBe(0);
		expect(info[999].unread).toBe(readStatus.length);

		expect(info[11].total).toBe(readStatus.length);
		expect(info[11].read).toBe(1);
		expect(info[11].unread).toBe(readStatus.length - 1);
	});
	// it('should substract two numbers', () => {
	// 	const calculator = new Calculator();
	// 	const sub = calculator.sub(5, 2);
	// 	expect(sub).toBe(3);
	// });
});