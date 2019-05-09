module hall {
	export class PrizeReadyData extends chaos.Data{
		public userCount:number;
		public userArr:UserInfo[];

		public constructor() {
			super();
		}
	}
}