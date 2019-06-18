module hall {
    export class TimerManager extends egret.EventDispatcher {
        public map: TimerItem[];
        public timeId: number;

        constructor() {
            super();
            this.map = [];
        }

        init() {
            if (this.timeId) egret.clearInterval(this.timeId);
            this.timeId = egret.setInterval(this.update, this, MainConfig.pollingTime);
        }

        update() {
            if (!this.map.length) return;
            this.map.forEach((val, idx) => {
                val.func.call(val.thisObj);
            });
        }

        rgTimer(func: Function, thisObj: any) {
            if (this.find(func, thisObj)) return;
            let timer: TimerItem = TimerItem.create();
            timer.update(func, thisObj);
            this.map.push(timer);
        }

        rmTimer(func: Function, thisObj: any): boolean {
            let timer: TimerItem = this.find(func, thisObj);
            if (timer) {
                let idx: number = this.map.indexOf(timer);
                this.map.splice(idx, 1);
                TimerItem.remove(timer);
                return true;
            }
            return false;
        }

        find(func: Function, thisObj: any): TimerItem {
            let item: TimerItem;
            for (let i = 0; i < this.map.length; i++) {
                item = this.map[i];
                if (item.thisObj == thisObj && item.func == func) {
                    return item;
                }
            }
            return null;
        }
    }


    export class TimerItem {
        static pool: TimerItem[] = [];

        static create() {
            return this.pool.length ? this.pool.shift() : new TimerItem();
        }

        static remove(timer: TimerItem) {
            timer.clean();
            this.pool.push(timer);
        }


        public func: Function;
        public thisObj: any;

        constructor() {
        }

        clean() {
            this.thisObj = null;
            this.func = null;
        }

        update(func: Function, thisObj: any) {
            this.thisObj = thisObj;
            this.func = func;
        }
    }
}