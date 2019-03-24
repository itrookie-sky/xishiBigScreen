module hall {
    export class TopComponent extends chaos.Sprite {
        public group_top: eui.Group;

        constructor() {
            super();
            this.skinName = "hall.TopComponentSkin";
        }

        public update(data: TopItemData[]) {
            
        }
    }
}