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
        }

        public testAddHead() {
            for (let i = 0; i < 100; i++) {
                let head: HeadIcon = HeadIcon.createHead();
                this.group.addChild(head);
            }
        }

        public addHead(data){
            let head:HeadIcon = HeadIcon.createHead();
            head.update(data);
            this.group.addChild(head);
        }


        public cleanGroup() {
            this.group.removeChildren();
        }

        public clean() {
            this.cleanGroup();
        }

        public show() {
            super.show();
        }

        public hide() {
            super.hide();
        }
    }
}