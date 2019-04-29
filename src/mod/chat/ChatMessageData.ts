module hall {
    export class ChatMessageBaseData extends chaos.Data {
        public from_name: string;
        public from_headimg: string;
        public from_label: string;
        /**消息类型 */
        public type: string;
        public content: string;

        /**金额 */
        public amount: number;
        /**数量 */
        public num: number;
        /**0新人1新郎团2新娘团3全部 */
        public to_type: number;
        /**红包id */
        public id: number;

        /**特效名称 */
        public title: string;
        /**图片路径 */
        public img: string;
        /**动画名称 */
        public animation: string;

        constructor() {
            super();
        }
    }
}