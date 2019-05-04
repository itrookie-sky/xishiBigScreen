module hall {
    export class System {
        /**舞台 */
        public static get stage(): egret.Stage {
            return egret.MainContext.instance.stage;
        }
        
        public static get stageWidth(): number {
            return egret.MainContext.instance.stage.stageWidth;
        }

        public static get stageHeight(): number {
            return egret.MainContext.instance.stage.stageHeight;
        }

        constructor() {
        }
    }
}