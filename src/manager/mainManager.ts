module hall {
    export class MainManager {
        static data: DataManager;

        constructor() {

        }

        static init() {
            chaos.startup();
            this.data = new DataManager();
        }
    }
}