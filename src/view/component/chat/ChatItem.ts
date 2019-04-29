module hall {
    export class ChatItem extends chaos.Sprite {
        public lab_text: eui.Label;
        public head: HeadIcon;
        public group_hongbao: eui.Group;
        public img_chat: eui.Image;

        constructor() {
            super();
            this.skinName = "hall.ChatItemSkin";
        }

        public update(msg: ChatMessageBaseData) {
            this.head.src = msg.from_headimg;
            this.head.nick = msg.from_name;
            switch (msg.type) {
                case ChatType.text:
                    this.currentState = "text";
                    this.lab_text.text = msg.content;
                    break;
                case ChatType.img:
                case ChatType.emoji:
                    this.currentState = "img";
                    RES.getResByUrl(msg.content, function (res) {
                        this.img_chat.srouce = res;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                    break;
                case ChatType.money:
                    this.currentState = "money";
                    break;
                case ChatType.gift:
                    this.currentState = "img";
                    RES.getResByUrl(msg.img, function (res) {
                        this.img_chat.srouce = res;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                    chaos.monitor.dispatchEvent(EventType.IM_PLAY_EFFECT, msg.animation);
                    break;
            }
        }
    }
}