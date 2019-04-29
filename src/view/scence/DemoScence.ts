module hall {
    export class DemoScence extends chaos.Scene {
        public group: eui.Group;
        public btn_0: eui.Button;
        public btn_1: eui.Button;
        public btn_2: eui.Button;
        public btn_3: eui.Button;
        public btn_4: eui.Button;
        public btn_5: eui.Button;
        public btn_6: eui.Button;
        public btn_7: eui.Button;
        public video: egret.Video;
        public group_effect: eui.Group;

        constructor() {
            super();
            this.skinName = "hall.DemoScenceSkin";
        }


        childrenCreated() {
            super.childrenCreated();

            var btn: eui.Button;
            for (let i = 0; i < 8; i++) {
                btn = this[`btn_${i}`];
                if (btn) {
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
                }
            }

            this.video = Center.video.creatVideo();
            this.video.fullscreen = false;
            this.video.width = 1600;
            this.video.height = 900;
            this.group.addChild(this.video);
            this.video.addEventListener(egret.Event.COMPLETE, function () {

            }, this);
            this.video.load("http://demo.csjlive.com/big/res/main_bg.mp4");

        }

        tapHandler(e: egret.TouchEvent) {
            switch (e.currentTarget) {
                case this.btn_0:
                    this.video.play();
                    break;
                case this.btn_1:
                    this.video.pause();
                    break;
                case this.btn_2:
                    Center.dragon.playDragon("wings", this.group_effect);
                    break;
                case this.btn_3:
                    Center.dragon.playDragon("cupid", this.group_effect);
                    break;
                case this.btn_4:
                    Center.dragon.playDragon("firework", this.group_effect);
                    break;
                case this.btn_5:
                    Center.dragon.playDragon("space", this.group_effect);
                    break;
                case this.btn_6:
                    Center.IM.open();
                    break;
                case this.btn_7:
                    break;
            }
        }

        show() {
            super.show();
        }

        hide() {
            super.hide();
        }
    }
}