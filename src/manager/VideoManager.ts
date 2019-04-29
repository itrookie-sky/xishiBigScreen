module hall {
    export class VideoManager {
        private videos: egret.Video[];

        constructor() {
            this.videos = [];
        }

        creatVideo(): egret.Video {
            let video: egret.Video = this.videos.shift();
            if (!video) video = new egret.Video();
            return video;
        }

        destory(v: egret.Video) {
            v.close();
            this.videos.push(v);
        }

        
    }
}