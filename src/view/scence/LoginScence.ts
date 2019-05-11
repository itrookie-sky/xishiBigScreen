module hall {
    export class LoginScence extends chaos.Scene {
        public group: eui.Group;
        public img_login: eui.Image;

        constructor() {
            super();
            this.skinName = "hall.LoginScenceSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.clean();
            var thiz = this;
            Center.net.post(MainConfig.prizeReady, {
                liveId: MainConfig.liveId
            }).then(function (resp: any) {
                if (resp.data.success) {
                    thiz.img_login.source = resp.data.data.QRcode;
                }
            });
        }

        public testAddHead() {
            for (let i = 0; i < 100; i++) {
                let head: HeadIcon = HeadIcon.createHead();
                this.group.addChild(head);
            }
        }

        public addHead(data) {
            let head: HeadIcon = HeadIcon.createHead();
            head.update(data);
            this.group.addChild(head);
        }

        public polling() {
            var thiz = this;
            Center.net.post(MainConfig.prizeReady, {
                liveId: MainConfig.liveId
            }).then(function (resp: any) {
                if (resp.data.success) {
                    thiz.updateLogin(resp.data.data);
                }
            });
        }

        public updateLogin(data: PrizeReadyData) {
            this.cleanGroup();
            
            let item: UserInfo;
            let head: HeadIcon;
            for (let i = 0; i < data.userArr.length; i++) {
                item = data.userArr[i];
                head = HeadIcon.createHead();
                head.update(item);
                this.group.addChild(head);
            }
        }

        public cleanGroup() {
            this.group.removeChildren();
        }

        public clean() {
            this.cleanGroup();
        }

        public show() {
            super.show();
            Center.timer.rgTimer(this.polling, this);
        }

        public hide() {
            super.hide();
            Center.timer.rmTimer(this.polling, this);
        }
    }
}