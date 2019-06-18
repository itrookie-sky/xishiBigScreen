module hall {
    export class MainScence extends chaos.Scene {
        public top_men: TopComponent;
        public top_women: TopComponent;
        public home: HomeValue;
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

        public testRank: any = {
            "man": [{
                "id": 1000,
                "label_id": 2,
                "openid": "obeXIt1Tn_J01RnUiJ5Bks5zsrco",
                "nickname": "迷死特祁",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLCOrJXFqYcXe9zJ0Gj8lojric5LczFkxkqrLyZxs7MxBPXdGpl5sTaBJD0Z53o0ib05qOghMHuEb7KQ/132",
                "num": "50",
                "label": "同学2",
                "type": "man"
            }, {
                "id": 1004,
                "label_id": 1,
                "openid": "obeXIt3pNDRuOYRgz1KWjOwIEoZM",
                "nickname": "。",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/0sDCa2E8S1uS9ysTe9o0PmiatPekMv07wEmsvhib25iczibKOicffX2z95jT6g8T7XiaglicyobVoypvBw36RtFJlgZwkGwosun641V/132",
                "num": "40",
                "label": "同学1",
                "type": "man"
            }, {
                "id": 1001,
                "label_id": 4,
                "openid": "obeXItwugPnhyPc6SPHbMsdKe3Xw",
                "nickname": "小吖龙",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/Q3auHgzwzM7DJ7AJr0qQ4jW7bkoBq3U3PcsnS68ab37D1slLnvWApHAPlJ8Sahiaib0u8ib1dzmsNBcj7HLouUZPg/132",
                "num": "20",
                "label": "亲属2",
                "type": "woman"
            }],
            "woman": [],
            "man_count": 61,
            "woman_count": 39,
            "seeNum": 7
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
            // this.updateTop(this.testRank);
            Center.timer.rgTimer(this.postRank, this);
        }

        hide() {
            super.hide();
            Center.timer.rmTimer(this.postRank, this);
        }

        /**请求排行榜  当家指数数据 */
        postRank() {
            var thiz = this;
            Center.net.post(MainConfig.rankList, {
                openId: MainConfig.openId,
                liveId: MainConfig.liveId,
                page_size: 10
            }).then((resp: any) => {
                if (resp.data.success) {
                    thiz.updateTop(resp.data.data);
                }
            });
        }

        updateTop(data: RankData) {
            this.home.updateValue(+data.man_count);
            this.top_men.update(data.man);
            this.top_women.update(data.woman);
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
                case ChatType.money:
                    this.onEffect(EffectType.dapao);
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