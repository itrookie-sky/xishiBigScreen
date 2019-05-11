module hall {
    export class TopComponent extends chaos.Sprite {
        public group_top: eui.Group;

        constructor() {
            super();
            this.skinName = "hall.TopComponentSkin";
        }

        public update(data: UserInfo[]) {
            if (!data) return;
            function sortRank(a, b) {
                return b - a;
            }
            data.sort(sortRank);
            if (data.length) {
                var max: number = +data[0].num;
                this.group_top.removeChildren();
                for (let i = 0; i < data.length; i++) {
                    let user: UserInfo = data[i];
                    let item: TopItem = new TopItem();
                    item.update(user, max);
                    this.group_top.addChild(item);
                }
            }

        }
    }
}