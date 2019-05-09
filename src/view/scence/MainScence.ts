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
            let chatItem: ChatItem = ChatItem.create();
            chatItem.update(msg);
            let x: number = System.stageWidth - 200;
            let y: number = (System.stageHeight - 300) * Math.random();
            chatItem.x = x;
            chatItem.y = y;
            chatItem.show(this.group_chat);
            this.barrageMove(chatItem);
            this.parseMsg(msg);
        }
        /**弹幕移动 */
        barrageMove(display: ChatItem) {
            egret.Tween.removeTweens(display);
            egret.Tween.get(display).to({ x: 0 }, ChatConst.barrageMove, egret.Ease.circOut).call(() => {
                display.hide();
                ChatItem.pushPool(display);
            });
        }

        parseMsg(msg: ChatMessageBaseData) {
            switch (msg.type) {
                case ChatType.gift:
                    this.onEffect(msg.animation);
                    break;
            }
        }

        onEffect(name: string) {
            this.group_effect.removeChildren();
            Center.dragon.playDragon(name, this.group_effect);
        }

        play() {

            var self = this;
            this.video = Center.video.creatVideo();
            this.video.fullscreen = false;
            this.video.width = System.stageWidth;
            this.video.height = System.stageHeight;
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