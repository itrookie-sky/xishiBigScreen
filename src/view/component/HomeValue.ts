module hall {
    export class HomeValue extends chaos.Sprite {
        public pro_value: eui.ProgressBar;
        public lab_man: eui.Label;
        public lab_women: eui.Label;

        constructor() {
            super();
            this.skinName = "hall.HomeValueSkin";
        }

        public updateValue(val: number) {
            this.pro_value.value = val;
            this.lab_man.text = `${val}%`;
            this.lab_women.text = `${100 - val}%`;
        }
    }
}