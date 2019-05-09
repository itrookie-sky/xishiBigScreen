module hall {
	export class UserInfo extends chaos.Data {
		live_id: string;
		createtime: number;
		/**以nickname为主 不知道为啥多个name */
		name: string;
		nickname: string;
		openid: string;
		/**中奖 */
		grade: string;
		headimgurl: string;


		public constructor() {
			super();
		}
	}
}