module hall {
    export class DataManager extends egret.EventDispatcher {
        public global: GlobalData;

        constructor() {
            super();
            this.global = new GlobalData();
        }
    }
}