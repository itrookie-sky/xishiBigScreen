module hall {
    export class ChatItem extends chaos.Sprite {
        public static pools: ChatItem[] = [];

        public static create(): ChatItem {
            return this.pools.length > 0 ? this.pools.shift() : new ChatItem();
        }

        public static pushPool(d: ChatItem) {
            d.clean();
            this.pools.push(d);
        }

        public lab_text: eui.Label;
        public head: HeadIcon;
        public group_hongbao: eui.Group;
        public img_chat: eui.Image;
        public img_bg: eui.Image;

        constructor() {
            super();
            this.skinName = "hall.ChatItemSkin";
        }

        childrenCreated() {
            super.childrenCreated();
            this.layer = null;
        }

        public update(msg: ChatMessageBaseData) {
            var self = this;
            this.head.src = msg.from_headimg;
            this.head.nick = msg.from_name;
            this.img_bg.source = msg.from_type == FromType.man ? "big_chat_03_png" : "big_chat_02_png";
            switch (msg.type) {
                case ChatType.text:
                    this.currentState = "text";
                    this.lab_text.text = msg.content;
                    break;
                case ChatType.img:
                case ChatType.emoji:
                    this.currentState = "img";
                    RES.getResByUrl(msg.content, function (res) {
                        self.img_chat.source = res;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                    break;
                case ChatType.money:
                    this.currentState = "money";
                    break;
                case ChatType.gift:
                    this.currentState = "img";
                    RES.getResByUrl(msg.img, function (res) {
                        this.img_chat.source = res;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                    chaos.monitor.dispatchEvent(EventType.IM_PLAY_EFFECT, msg.animation);
                    break;
            }
        }

        clean() {

        }

        show(display?: egret.DisplayObjectContainer) {
            super.show();
            if (display) {
                display.addChild(this);
            }
        }

        hide() {
            super.hide();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}