module hall {
    /**客户端全局配置 */
    export class MainConfig {
        /**=====================地址相关====================== */
        static client: string = "http://demo.csjlive.com/big/";
        static openId: string = "big_1000";
        /**=====================环信配置====================== */
        /**配置 */
        static IM_password: string = "xishi123456";
        /**环信总配置 */
        static webim_config = {

            xmppURL: 'im-api.easemob.com', // xmpp Server地址，对于在console.easemob.com创建的appKey，固定为该值

            apiURL: 'http://a1.easemob.com', // rest Server地址，对于在console.easemob.com创建的appkey，固定为该值

            appkey: '1109190326042016#xishi', // App key

            https: false, // 是否使用https

            isHttpDNS: false, //防止DNS劫持从服务端获取XMPPUrl、restUrl

            isMultiLoginSessions: false, // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

            isAutoLogin: true, // 自动出席，（如设置为false，则表示离线，无法收消息，需要在登录成功后手动调用conn.setPresence()才可以收消息）

            isDebug: false, // 打开调试，会自动打印log，在控制台的console中查看log

            autoReconnectNumMax: 2, // 断线重连最大次数

            autoReconnectInterval: 2, // 断线重连时间间隔

            heartBeatWait: 4500, // 使用webrtc（视频聊天）时发送心跳包的时间间隔，单位ms

            delivery: false, // 是否发送已读回执

            isStropheLog: false
        }


        constructor() {

        }

        public static init() {
            let liveid: string = chaos.getOption("liveid");
            if (liveid) this.openId = `big_${liveid}`;
        }
    }
}