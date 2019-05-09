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

    /**几等奖 */
    export class PrizeType {
        static readonly first: string = "1";
        static readonly second: string = "2";
        static readonly third: string = "3";
        static readonly fourth: string = "4";
        static readonly fifth: string = "5";
        static readonly firstKey: string = "one";
        static readonly secondKey: string = "two";
        static readonly thirdKey: string = "three";
        static readonly fourthKey: string = "four";
        static readonly fifthKey: string = "five";
    }

    export var PrizeDesc = {
        [PrizeType.first]: "一等奖",
        [PrizeType.second]: "二等奖",
        [PrizeType.third]: "三等奖",
        [PrizeType.fourth]: "四等奖",
        [PrizeType.fifth]: "五等奖",
    }
    
    export var PrizeKeyDesc = {
        [PrizeType.firstKey]: "一等奖",
        [PrizeType.secondKey]: "二等奖",
        [PrizeType.thirdKey]: "三等奖",
        [PrizeType.fourthKey]: "四等奖",
        [PrizeType.fifthKey]: "五等奖",
    }
}