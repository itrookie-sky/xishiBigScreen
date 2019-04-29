module hall {
    export class AskPanel extends chaos.Panel {
        public btn_yes: chaos.Button;
        public btn_no: chaos.Button;
        public lab_msg: eui.Label;

        public thisObj: any;
        public call: Function;

        constructor() {
            super();
            this.skinName = "hall.AskPanelSkin";
            this.masks = null;
        }

        childrenCreated(): void {
            super.childrenCreated();
            this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }

        public onTap(e: egret.TouchEvent) {
            var flag: boolean = false;
            switch (e.currentTarget) {
                case this.btn_yes:
                    flag = true;
                    break;
                case this.btn_no:
                    break;
            }

            if (this.thisObj) {
                this.call.call(this.thisObj, flag);
            } else {
                this.call(flag);
            }
            if (!flag) this.hide();
        }

        show() {
            super.show();
            this.btn_yes.visible = this.btn_no.visible = !!this.call;
        }

        showMsg(msg: string, func: Function = null, thisObj: any = null, yes: string = "确定", no: string = "取消") {
            this.show();
            this.lab_msg.text = msg;
            this.thisObj = thisObj;
            this.call = func;
            this.btn_yes.label = yes;
            this.btn_no.label = no;
        }

        hide() {
            super.hide();
            this.clean();
        }

        clean() {
            this.thisObj = null;
            this.call = null;
        }
    }
}