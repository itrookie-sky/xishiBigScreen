module hall {
	export class PrizeWinnerItem extends chaos.Sprite {
		public lab_desc: eui.Label;
		public head_group: eui.Group;

		public constructor() {
			super();
			this.skinName = "hall.PrizeWinnerItemSkin";
		}

		public clean() {
			this.lab_desc.text = ``;
			for (let i = this.head_group.numChildren - 1; i >= 0; i--) {
				let head: HeadIcon = this.head_group.getChildAt(i) as HeadIcon;
				if (head) {
					this.head_group.removeChild(head);
				}
			}
		}

		public update(key: string, data: WinnerItemData[]) {
			if (!data) return;
			this.clean();
			this.lab_desc.text = `${PrizeKeyDesc[key]}`;
			let item: WinnerItemData;
			for (let i = 0; i < data.length; i++) {
				item = data[i];
				let head: HeadIcon = HeadIcon.createHead();
				head.src = item.headimgurl;
				this.head_group.addChild(head);
			}
		}
	}
}