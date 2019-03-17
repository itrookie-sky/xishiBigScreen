module hall {
    export class TopComponent extends chaos.Sprite {
        public group_top: eui.Group;

        constructor() {
            super();
            this.skinName = "TopComponentSkin";
        }

        public update(data: mod.TopItemData[]) {
            
        }
    }
}