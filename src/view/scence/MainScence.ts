module hall {
    export class MainScence extends chaos.Scene {
        public top_men: TopComponent;
        public top_women: TopComponent;
        public pro_home: eui.ProgressBar;
        public lab_man: eui.Label;
        public lab_women: eui.Label;
        public group_chat: eui.Group;
        public group_com: eui.Group;
        public group_effect: eui.Group;
        public video: egret.Video;
        public group_video: eui.Group;

        public chatPool: ChatItem[];

        constructor() {
            super();
            this.skinName = "hall.MainScenceSkin";
            this.chatPool = [];
        }

        childrenCreated() {
            super.childrenCreated();
            chaos.monitor.addEventListener(EventType.IM_ONMSG, this.onMsg, this);
            chaos.monitor.addEventListener(EventType.IM_PLAY_EFFECT, this.onEffect, this);


        }

        private first: boolean = true;

        show() {
            super.show();
            if (this.first) {
                this.first = false;
                Center.IM.open();
            }
        }

        onMsg(msg: ChatMessageBaseData) {
            let chatItem: ChatItem = new ChatItem();
            chatItem.update(msg);
            let x: number = 1600 * Math.random();
            let y: number = 900 * Math.random();
            chatItem.x = x;
            chatItem.y = y;
            this.group_chat.addChild(chatItem);
        }

        onEffect(name: string) {
            Center.dragon.playDragon(name, this.group_effect);
        }

        play() {

            var self = this;
            this.video = Center.video.creatVideo();
            this.video.fullscreen = false;
            this.video.width = 1600;
            this.video.height = 900;
            this.group_video.addChild(this.video);
            this.video.poster = "";
            this.video.load(MainConfig.video_bg);
            this.video.addEventListener(egret.Event.COMPLETE, function () {
                console.log("complete");
                self.video.play();
            }, this);
        }
    }
}