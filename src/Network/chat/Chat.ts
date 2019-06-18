module hall {
    export class IM {
        public webim: any;
        public get imConf(): any {
            return MainConfig.webim_config;
        }

        constructor() {
            var win: any = window;
            var imConf = MainConfig.webim_config;

            this.webim = new win.WebIM.connection({
                isHttpDNS: imConf.isHttpDNS,
                isMultiLoginSessions: imConf.isMultiLoginSessions,
                https: typeof imConf.https === 'boolean' ? imConf.https : location.protocol === 'https:',
                url: imConf.xmppURL,
                isAutoLogin: imConf.isAutoLogin,
                heartBeatWait: imConf.heartBeatWait,
                autoReconnectNumMax: imConf.autoReconnectNumMax,
                autoReconnectInterval: imConf.autoReconnectInterval,
                isStropheLog: imConf.isStropheLog,
                delivery: imConf.delivery
            });
        }

        public login() {

        }

        public open() {
            this.addConnEvent();
            var option = {
                apiUrl: this.imConf.apiURL,
                user: MainConfig.openId,
                pwd: MainConfig.IM_password,
                appKey: this.imConf.appkey
            }
            this.webim.open(option);
            console.log("%c[open] 连接请求已发送", "color: green");
        }

        public join() {
            this.webim.joinChatRoom({
                roomId: Center.data.global.chatRoomId
            });
        }

        public addConnEvent() {
            var _this = this;
            this.webim.listen({
                onOpened: function (msg) {
                    console.log("%c[opened] 连接已成功建立", "color: green", msg);
                    // _this.join();
                },
                onClosed: function (msg) {
                    console.log("%c[closed] 连接已关闭", "color: red");
                    _this.openAsk();
                },
                onTextMessage: function (msg) {
                    console.log("%c[msg] 收到文本消息 ", "color:blue", msg);
                    _this.onMessage(msg);
                },
                onOnline: function (msg) {
                    console.log("%c[online] 用户已经成功连接", "color: green");
                },
                onOffline: function (msg) {
                    console.log("%c[offline] 用户已经离线", "color:red");
                    _this.openAsk();
                },
                onError: function (msg) {
                    console.warn("%c[error] 错误处理: ", "color: red", msg);
                },
                onPresence: function (msg) {
                    console.log("%c[chatroom] 加入房间状态", "color:red", msg);
                }
            });
        }

        public onMessage(resp: any) {
            var msg: ChatMessageBaseData = JSON.parse(resp.data);
            chaos.monitor.dispatchEvent(EventType.IM_ONMSG, msg);
        }

        public openAsk() {
            Center.askMsg("聊天连接已经断开,是否重新连接", function (b) {
                if (b) {
                    this.open();
                }
            }, this);
        }
    }
}