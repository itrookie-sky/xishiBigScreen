module hall {
    export class DragonManager extends egret.EventDispatcher {
        dragonbones: { string?: dragonBones.EgretArmatureDisplay[] }

        constructor() {
            super();
            this.dragonbones = {};
        }

        /**
        *  初始化动画
        */
        public initDragonbones(name: string): dragonBones.EgretArmatureDisplay {
            if (!name) return null;

            let dragonbonesData;
            let textureData;
            let texture;

            dragonbonesData = RES.getRes(name + "_ske_json");
            textureData = RES.getRes(name + "_tex_json");
            texture = RES.getRes(name + "_tex_png");

            let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;

            egretFactory.parseDragonBonesData(dragonbonesData);

            egretFactory.parseTextureAtlasData(textureData, texture);

            this.dragonbones[name] = egretFactory.buildArmatureDisplay(name);

            return this.dragonbones[name];
        }

        /**
         *   获取一个龙骨动画
         */
        public getDragonbones(name: string = ""): dragonBones.EgretArmatureDisplay {
            if (!this.dragonbones[name]) this.initDragonbones(name);
            return this.dragonbones[name];
        }

        /**释放一个龙骨 */
        public destoryDragonbones(name: string, d: dragonBones.EgretArmatureDisplay) {
            d.animation.stop();
            this.dragonbones[name].push(d);
        }

        /**固定位置 且可传回调的播放 */
        public playDragon(name: string, display: any, thisObj: any = this, callBack: Function = null, time: number = 1, ...params: any[]): dragonBones.EgretArmatureDisplay {

            let dragon = this.getDragonbones(name);
            if (!dragon) {
                console.log("获取不到动画：" + name);
                return;
            }
            if (!display) {
                console.log("未指定容器!");
                return;
            }

            if (!display.contains(dragon)) display.addChild(dragon);

            dragon.y = display.height / 2;
            dragon.x = display.width / 2;

            let curIndex: number = 0;
            function onComplete() {
                curIndex++;
                if (curIndex >= time) {
                    dragon.removeEventListener(dragonBones.EventObject.LOOP_COMPLETE, onComplete, this);
                    if (display.contains(dragon)) display.removeChild(dragon);
                    callBack && callBack.apply(thisObj, params);
                }
            }

            dragon.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, onComplete, this);
            dragon.animation.play("play", time);
            return dragon;
        }
    }


}

