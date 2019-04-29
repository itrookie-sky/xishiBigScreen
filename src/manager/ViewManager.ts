module hall {
    export class ViewManager {
        public ask: AskPanel;
        constructor() {

        }

        init() {
            this.ask = new AskPanel();
        }
    }
}