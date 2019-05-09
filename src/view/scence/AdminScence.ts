module hall {
	export class AdminScence extends chaos.Scene {
		public input_pw: eui.TextInput;
		public btn_login: eui.Button;
		public btn_clean: eui.Button;

		public constructor() {
			super();
			this.skinName = "hall.AdminScenceSkin";
		}

		childrenCreated() {
			super.childrenCreated();
			this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.btn_clean.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}

		onClick(e: egret.TouchEvent) {
			var thiz = this;
			switch (e.currentTarget) {
				case this.btn_login:
					let curPw: string = this.input_pw.text;
					if (curPw == "") {
						chaos.DisplayObjectUtils.showTips("请输入密码", 4);
						return;
					}
					Center.net.post(MainConfig.login, {
						liveId: MainConfig.liveId,
						password: curPw
					}).then(function (resp: any) {
						if (resp.data.success) {
							chaos.show("LoginScence");
						}
					});
					break;
				case this.btn_clean:
					this.input_pw.text = ``;
					break;
			}
		}

	}
}