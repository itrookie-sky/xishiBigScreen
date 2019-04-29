module hall {
    export class EventType {
        /**收到消息 */
        static readonly IM_ONMSG: string = "IM_ONMSG";
        /**聊天连接成功 */
        static readonly IM_ONOPEN: string = "IM_ONOPEN";
        /**聊天室连接失败 */
        static readonly IM_ONCLOSE: string = "IM_ONCLOSE";
        /**聊天室连接失败 */
        static readonly IM_PLAY_EFFECT: string = "IM_PLAY_EFFECT";
    }
}