module hall {
    export class TopItem extends chaos.Sprite {
        public img_head: eui.Image;
        public rect_progress: eui.Rect;
        public lab_top: eui.Label;
        public group_progress: eui.Group;
        /**进度条 */
        public set proWidth(value: number) {
            this.group_progress.explicitWidth = value;
        }

        constructor() {
            super();
            this.skinName = "hall.TopItemSkin";
        }

        public update(data: UserInfo, max: number) {
            if (!data.headimgurl) {
                return;
            }
            RES.getResByUrl(data.headimgurl, function (res) {
                this.img_head.source = res;
            }, this, RES.ResourceItem.TYPE_IMAGE);
            this.group_progress.percentWidth = (+data.num / max) * 100;
            this.lab_top.text = `${data.num}`;
        }
    }
}