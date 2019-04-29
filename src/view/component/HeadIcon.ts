module hall {
    export class HeadIcon extends chaos.Sprite {
        public static pools: HeadIcon[];
        /**
         * 获取头像
         * @param {string} src
         */
        public static createHead(src?: string): HeadIcon {
            if (!this.pools) {
                this.pools = [];
            }
            let head: HeadIcon = this.pools.shift() || new HeadIcon();
            head.src = src;
            return head;
        }
        /**
         * 头像释放压栈
         */
        public static poolHead(head: HeadIcon) {
            if (this.pools && this.pools.indexOf(head) < 0) {
                this.pools.push(head);
            }
        }


        public img_head: eui.Image;
        public lab_nick: eui.Label;

        constructor() {
            super();
            this.skinName = "hall.HeadIconSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                HeadIcon.poolHead(this);
            }, this);
        }

        set src(source: any) {
            if (!source || source == '') {
                this.img_head.source = "checkbox_select_down_png";
            }
            else if (typeof source == 'string' && source.indexOf('http') == 0 || source.indexOf('https') == 0) {
                RES.getResByUrl(source, (texture) => {
                    this.img_head.source = texture;
                }, this, RES.ResourceItem.TYPE_IMAGE).catch();
            }
            else {
                this.img_head.source = source;
            }
        }

        set nick(nick: string) {
            this.lab_nick.text = nick;
        }

        public update(data: any) {
            
        }


    }
}