module hall {
    export class MainScence extends chaos.Scene {
        public top_men: TopComponent;
        public top_women: TopComponent;
        public pro_home: eui.ProgressBar;
        public lab_man: eui.Label;
        public lab_women: eui.Label;

        constructor() {
            super();
            this.skinName = "hall.MainScenceSkin";
        }
    }
}