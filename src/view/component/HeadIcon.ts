module hall {
    export class HeadIcon extends chaos.Sprite {
        public img_head: eui.Image;
        public lab_nick: eui.Label;

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

    }
}