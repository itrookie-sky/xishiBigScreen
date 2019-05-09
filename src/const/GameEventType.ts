module hall {
    export class EventType {
        /**舞台被点击 */
        static readonly TAP_STAGE: string = "TAP_STAGE";
        /**收到消息 */
        static readonly IM_ONMSG: string = "IM_ONMSG";
        /**聊天连接成功 */
        static readonly IM_ONOPEN: string = "IM_ONOPEN";
        /**聊天室连接失败 */
        static readonly IM_ONCLOSE: string = "IM_ONCLOSE";
        /**聊天室连接失败 */
        static readonly IM_PLAY_EFFECT: string = "IM_PLAY_EFFECT";
        /**下拉选择框开启 */
        static readonly SELECT_MENU_OPEN: string = "SELECT_MENU_OPEN";
        /**登录轮询 */
        static readonly HTTP_POLLING_LOGIN: string = "HTTP_POLLING_LOGIN";
    }
}