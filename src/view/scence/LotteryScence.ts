module hall {
    export class LotteryScence extends chaos.Scene {
        public btn_start: chaos.Button;
        public group_head: eui.Group;
        public group_light: eui.Group;
        public select_num: SelectMenu;
        public select_jiang: SelectMenu;
        public input_num: eui.TextInput;
        public group_winner: eui.Group;

        public select1: SelectMenuItemData[] = [
            {
                type: SelectMenuType.text,
                value: 1,
                desc: "一人",
            },
            {
                type: SelectMenuType.text,
                value: 2,
                desc: "两人",
            },
        ];

        public select2: SelectMenuItemData[] = [
            {
                type: SelectMenuType.text,
                value: PrizeType.first,
                desc: PrizeDesc[PrizeType.first],
            },
            {
                type: SelectMenuType.text,
                value: PrizeType.second,
                desc: PrizeDesc[PrizeType.second],
            },
            {
                type: SelectMenuType.text,
                value: PrizeType.third,
                desc: PrizeDesc[PrizeType.third],
            }
        ];

        constructor() {
            super();
            this.skinName = "hall.LotteryScenceSkin";
        }

        childrenCreated() {
            super.childrenCreated();
            this.select_jiang.update(this.select2);
        }

        public playLight(state: string = playLightState.normal) {
            this.cleanLight();
            let on: string = "big_light_on_png";
            let off: string = "big_light_off_png";
            for (let i = 0; i < this.group_light.numElements; i++) {
                let img: eui.Image = this.group_light.getChildAt(i) as eui.Image;
                switch (state) {
                    case playLightState.run:

                        break;
                    default:
                    case playLightState.normal:
                        egret.Tween.get(img, { loop: true })
                            .to({ alpha: 0 }, 250)
                            .to({ alpha: 1 }, 250)
                            .wait(250);
                        break;
                }
            }
        }

        public cleanLight() {
            for (let i = 0; i < this.group_light.numElements; i++) {
                let img = this.group_light.getChildAt(i);
                if (img) {
                    img.alpha = 1;
                    egret.Tween.removeTweens(img);
                }
            }
        }
        /**请求全部获奖者 */
        public postWinner() {
            var thiz = this;
            this.group_winner.removeChildren();
            
            Center.net.post(MainConfig.winner, {
                liveId: MainConfig.liveId
            }).then(function (resp: any) {
                if (resp.data.success) {
                    let data = resp.data.data;
                    for (let key in data) {
                        let item: PrizeWinnerItem = new PrizeWinnerItem();
                        item.update(key, data[key]);
                        thiz.group_winner.addChild(item);
                    }
                }
            });
        }

        public show() {
            super.show();
            this.playLight();
            this.postWinner();
        }

        public hide() {
            super.hide();
        }
    }
}
