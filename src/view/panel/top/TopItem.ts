module hall {
    export class TopItem extends chaos.Sprite {
        public img_head: eui.Image;
        public rect_progress: eui.ProgressBar;
        public lab_top: eui.Label;
        /**进度条 */
        public set proWidth(value: number) {
            this.rect_progress.explicitWidth = value;
        }

        constructor() {
            super();
            this.skinName = "TopItemSkin";
        }

        public update(data: mod.TopItemData) {
            RES.getResByUrl(data.link, function (res) {
                this.img_head.source = res;
            }, this, RES.ResourceItem.TYPE_IMAGE);
            this.proWidth = data.percent;
            this.lab_top.text = `${data.count}`;
        }
    }
}