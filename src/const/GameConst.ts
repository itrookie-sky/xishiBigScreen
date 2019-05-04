module hall {
    export class playLightState {
        static readonly normal: string = 'play_light_normal';
        static readonly run: string = 'play_light_run';
    }

    export class ChatType {
        static readonly text: string = "text";
        static readonly emoji: string = "emoji";
        static readonly img: string = "img";
        static readonly money: string = "money";
        static readonly gift: string = "gift";
    }

    export class SelectMenuType {
        static readonly text: string = "text";
        static readonly img: string = "img";
    }

    export class ChatConst {
        /**弹幕移动时间 */
        static readonly barrageMove: number = 6000;
    }
}