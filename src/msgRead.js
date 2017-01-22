/**
 * Created by z man on 2017/1/19.
 * @class msgRead
 * @author z man
 * @description 消息已读状态处理
 */

/**
 * 消息已读对象
 * @typedef {Object} ReadStatus
 * @property {string} msgid
 * @property {Array.<string>} total
 * @property {Array.<string>} read
 * @property {Array.<string>} unread
 * 
 */
/**
 * 成员消息已读对象
 *@typedef {Object} Status
 *@property {string} pid 用户id
 *@property {string} jion_mid 加入会话的消息id
 *@property {string} read_mid 最后已读的消息id
 *@property {string} exit_mid 退出会话的消息id
 */

/**
 * 成员已读消息体
 */
var personMap = {};
var msgMap = {};
/**
 * 处理后的消息已读对象hashMap
 * @type {Array.<ReadStatus>}
 */
var msgSort = [];



/**
 * 处理一个消息的已读未读计数器
 * 
 * @param {String} msgid
 * @returns 
 */
function processMsg(msgid) {
	var p;
	var total = 0,
		unread = 0,
		read = 0;
	for (var key in personMap) {
		p = personMap[key];
		/*已经退出*/
		if (p.exit_mid && p.exit_mid <= msgid) {
			continue;
		}
		if (msgid >= p.jion_mid) {
			total++;
			if (msgid <= p.read_mid) {
				read++;
			} else {
				unread++;
			}
		}
	}
	return {
		msgid: msgid,
		total: total,
		read: read,
		unread: unread
	}
}

/**
 * 单个人的已读状态变化，与旧的状态比较处理
 * 
 * @param {Status} status
 * @param {Status} oldStatus
 * @returns
 */
function processChangeStatus(status, oldStatus) {
	/*没有变化不处理*/
	if (status.read_mid <= oldStatus.read_mid) {
		return;
	}
	for (var k in msgMap) {
		var msg = msgMap[k];
		if (msg.msgid > oldStatus.read_mid && msg.msgid <= status.read_mid) {
			msg.read++;
			msg.unread--;
		}
	}
}
/**
 * 新加入的成员，需要对加入的成员的所有消息处理
 * 
 * @param {Status} status
 */
function processStatus(status) {
	var msg, msgid;
	for (var key in msgMap) {
		msg = msgMap[key];
		msgid = msg.msgid;
		if (status.jion_mid <= msg.msgid) {
			if (status.exit_mid && status.exit_mid <= msg.msgid) {
				continue;
			}
			msg.total++;
			if (msgid <= status.read_mid) {
				msg.read++;
			} else {
				msg.unread++;
			}
		}
	}
}
var msgRead = {
	/**
	 * 
	 * 
	 * @param {Array.<Status>} data
	 * @returns
	 */
	initReadStatus: function(data) {
		if (!Array.isArray(data)) {
			return;
		}
		personMap = {};
		var len = data.length,
			status;
		while (len--) {
			status = data[len];
			personMap[status.pid] = status;
		}
	},
	/**
	 * 初始化消息id数组
	 * 
	 * @param {Array.<String>} msgIDs
	 */
	initMsg: function(msgIDs) {
		msgMap = {};
		msgSort = [];
		var len = msgIDs.length,
			msgid;
		while (len--) {
			msgid = msgIDs[len];
			if (/\D+/.test(msgid)) {
				continue;
			}
			msgSort.push(msgid);
			msgMap[msgid] = processMsg(msgid);
		}
	},
	/**
	 * 
	 * 消息id
	 * @param {string} msgid
	 */
	addMsg: function(msgid) {
		if (!msgMap[msgid]) {
			msgSort.push(msgid);
		}
		msgMap[msgid] = processMsg(msgid);
	},
	/**
	 * 更新单个人的已读状态信息
	 * 
	 * @param {Status} status
	 */
	updateReadStatus: function(status) {
		var isNew = true,
			oldStatus;
		if (personMap[status.pid]) {
			isNew = false;
			oldStatus = personMap[status.pid];
		}
		personMap[status.pid] = status;
		if (isNew) {
			//新加入的成员
			processStatus(personMap[status.pid]);
		} else {
			//状态发生变化，只需要和旧数据对比，处理部分消息即可
			processChangeStatus(status, oldStatus);
		}
	},
	/**
	 * 获取msgMap，包含了每一条消息的已读数目统计
	 * @params {string=} msgid
	 * @returns
	 */
	getMsgStatus: function(msgid) {
		return msgid ? msgMap[msgid] : msgMap;
	},
	/**
	 * 获取单个消息的详细已读未读信息
	 * 
	 * @param {String} msgid 消息ID
	 * @returns {ReadStatus}
	 */
	getMsgInfo: function(msgid) {
		var p;
		var total = [],
			unread = [],
			read = []
		for (var key in personMap) {
			p = personMap[key];
			/*已经退出*/
			if (p.exit_mid && p.exit_mid <= msgid) {
				continue;
			}
			if (msgid >= p.jion_mid) {
				total.push(p.pid);
				if (msgid <= p.read_mid) {
					read.push(p.pid);
				} else {
					unread.push(p.pid);
				}
			}
		}
		return {
			msgid: msgid,
			total: total,
			read: read,
			unread: unread
		}
	}
};
export default msgRead;
// -------------------------------unit test-----------------------------------------

//--------------------------------performance test-----------------------------------
//--------1000条消息，1000个成员，初始化时间178ms,每次更新一个人时间0.78ms，没添加一条消息0.56ms
/*var msgIDs = [];
for (var i = 0; i < 1000; i++) {
	msgIDs.push(i);
}

var readStatus = [
	{ "pid": 161993, "jion_mid": 10, "read_mid": 100 },
	{ "pid": 161994, "jion_mid": 10, "read_mid": 0 },
	{ "pid": 166135, "jion_mid": 10, "read_mid": 0 },
	{ "pid": 166143, "jion_mid": 10, "read_mid": 0 },
	{ "pid": 166144, "jion_mid": 10, "read_mid": 0 }
];
for (var i = 0; i < 1000; i++) {
	readStatus.push({
		"pid": 161993 + i,
		"jion_mid": 10,
		"read_mid": 100
	})
}

function test() {
	console.time('init')
	msgRead.initReadStatus(readStatus);
	msgRead.initMsg(msgIDs);
	console.timeEnd('init');
	setTimeout(() => {
		console.time('add person-1')
		msgRead.updateReadStatus({ "pid": 161983, "jion_mid": 10, "read_mid": 100 });
		console.timeEnd('add person-1');
	}, 1);
	setTimeout(() => {
		console.time('update person-1')
		msgRead.updateReadStatus({ "pid": 166144, "jion_mid": 10, "read_mid": 1000 });
		console.timeEnd('update person-1');
	}, 1);
	setTimeout(() => {
		console.time('add msg-1')
		var i = 0;
		while (i < 100) {
			i++;
			msgRead.addMsg(1001 + i);
		}
		console.timeEnd('add msg-1');
	}, 1);
}
setTimeout(() => {
	test();
}, 100);*/