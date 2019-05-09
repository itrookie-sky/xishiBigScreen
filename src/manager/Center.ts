module hall {
    export class Center extends egret.EventDispatcher {
        static data: DataManager;
        static video: VideoManager;
        static dragon: DragonManager;
        static IM: IM;
        static view: ViewManager;
        static net: NetWork;
        static timer: TimerManager;

        constructor() {
            super();
        }

        static init() {
            chaos.startup();
            this.data = new DataManager();
            this.video = new VideoManager();
            this.dragon = new DragonManager();
            this.IM = new IM();
            this.view = new ViewManager();
            this.view.init();
            this.net = new NetWork();
            this.timer = new TimerManager();
            this.timer.init();
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTap, this);
        }

        /**询问 */
        static askMsg(msg: string, func: Function = null, thisObj: any = null, yes: string = "确定", no: string = "取消") {
            this.view.ask.showMsg(msg, func, thisObj, yes, no);
        }

        static onStageTap(e: egret.TouchEvent) {
            chaos.monitor.dispatchEvent(EventType.TAP_STAGE);
        }
    }
}