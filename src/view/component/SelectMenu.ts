module hall {
    export class SelectMenu extends chaos.Sprite {
        public container: eui.Group;
        public btn_click: eui.Group;
        public lab_value: eui.Label;
        public img_value: eui.Image;

        public data: SelectMenuItemData[];
        public cur: SelectMenuItemData;

        constructor() {
            super();
            this.skinName = "hall.SelectMenuSkin";
        }

        childrenCreated() {
            super.childrenCreated();

            this.btn_click.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
            chaos.monitor.addEventListener(EventType.SELECT_MENU_OPEN, this.updataState, this);
        }

        update(data: SelectMenuItemData[]) {
            if (!data) {
                console.warn("可选数据不可为空");
            }

            this.data = data;
            this.container.removeChildren();
            for (let item of data) {
                let s: SelectMenuItem = new SelectMenuItem();
                s.update(item);
                this.container.addChild(s);
            }
            this.setValue(data[0]);
        }

        onTap(e: egret.TouchEvent) {
            chaos.monitor.dispatchEvent(EventType.SELECT_MENU_OPEN, this.hashCode);
            this.currentState = this.currentState == "open" ? "close" : "open";
        }

        onSelect(e: egret.TouchEvent) {
            if (egret.getQualifiedClassName(e.target) == "hall.SelectMenuItem") {
                this.cleanValue();
                let item: SelectMenuItem = e.target;
                let data: SelectMenuItemData = item.data;
                this.setValue(data);
                this.currentState = "close";
            }
        }

        setValue(data: SelectMenuItemData) {
            this.cur = data;
            switch (data.type) {
                case SelectMenuType.img:
                    this.img_value.source = data.value;
                    break;
                case SelectMenuType.text:
                    this.lab_value.text = data.desc;
                    break;
            }
        }

        cleanValue() {
            this.lab_value.text = "";
            this.img_value.source = "";
            this.cur = null;
        }

        updataState(hash: number) {
            if (hash !== this.hashCode) {
                this.currentState = "close";
            }
        }

    }

    export class SelectMenuItem extends chaos.Sprite {
        public lab_value: eui.Label;
        public img_value: eui.Image;

        constructor() {
            super();
            this.skinName = "hall.SelectMenuItemSkin";
        }

        childrenCreated() {
            super.childrenCreated();
            this.touchChildren = false;
        }

        update(data: SelectMenuItemData) {
            this.currentState = data.type;
            this.data = data;
            switch (data.type) {
                case SelectMenuType.img:
                    this.img_value.source = data.value;
                    break;
                case SelectMenuType.text:
                    this.lab_value.text = data.desc;
                    break;
            }
        }
    }

    export class SelectMenuItemData {
        type: string;
        value: any;
        desc: string;
    }
}