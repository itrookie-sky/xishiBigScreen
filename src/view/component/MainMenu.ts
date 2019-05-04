module hall {
    export class MainMenu extends chaos.Sprite {
        public group: eui.Group;

        public links: any[] = [
            {
                lab: "主界面",
                link: "MainScence"
            },
            {
                lab: "登录页",
                link: "LoginScence"
            },
            {
                lab: "抽奖页",
                link: "LotteryScence"
            },
            {
                lab: "测试页",
                link: "DemoScene"
            },
        ];

        constructor() {
            super();
            this.skinName = "hall.MainMenuSkin";
        }

        childrenCreated() {
            super.childrenCreated();

            this.group.removeChildren();
            let btn: chaos.Button;
            for (let i = 0; i < this.links.length; i++) {
                btn = new chaos.Button();
                btn.name = `${i}`;
                btn.label = this.links[i].lab;
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                this.group.addChild(btn);
            }
        }

        onTap(e: egret.TouchEvent) {
            let btn: chaos.Button = e.currentTarget;
            let data: any = this.links[+btn.name];
            if (data) {
                chaos.show(data.link);
            }
        }

        public show() {
            super.show();
        }
    }
}