module hall {
	/**请求 */
	export class NetWork {
		public axios: any;

		public constructor() {
			this.init();
		}

		public init() {
			var Axios = window["axios"];
			var axios = Axios.create();

			axios.defaults.timeout = 5000;
			axios.interceptors.request.use(
				config => {
					config.data = JSON.stringify(config.data);
					config.headers = {
						'Content-Type': 'Access-Control-Allow-Origin'
					};

					return config;
				},
				err => {
					return Promise.reject(err);
				}
			);

			axios.interceptors.response.use(
				response => {
					return response;
				},
				error => {
					return Promise.reject(error);
				}
			);

			this.axios = axios;
		}

		public getUrl(api: string): string {
			return `${MainConfig.root}${api}`;
		}

		/**
		 * GET 方法
		 * @param {string} url 
		 * @param {any} params 
		 * @return Promise
		 */
		fetch(url, params = {}) {
			url = this.getUrl(url);
			return new Promise((resolve, reject) => {
				console.log(`request<<<${url}`, params);
				this.axios.get(url, {
					params: params
				})
					.then(response => {
						console.log(`response>>>${url}`, response);
						resolve(response);
					})
					.catch(err => {
						reject(err);
					});
			});
		}
		/**
		 * POST 请求
		 * @param {string} url 
		 * @param {Object} data 
		 * @returns Promise
		 */
		post(url, data = {}) {
			url = this.getUrl(url);
			return new Promise((resolve, reject) => {
				console.log(`request<<<${url}`, data);
				this.axios.post(url, data)
					.then(response => {
						console.log(`response>>>${url}`, response);
						resolve(response);
					}, err => {
						reject(err);
					})
			})
		}
		/**
		 * patch 方法封装
		 * @param {string} url 
		 * @param {Object} data 
		 * @returns Promise
		 */
		patch(url, data = {}) {
			url = this.getUrl(url);
			return new Promise((resolve, reject) => {
				this.axios.patch(url, data)
					.then(response => {
						resolve(response);
					}, err => {
						reject(err);
					})
			})
		}
		/**
		 * put 方法封装
		 * @param {string} url 
		 * @param {Object} data 
		 * @returns Promise
		 */
		put(url, data = {}) {
			url = this.getUrl(url);
			return new Promise((resolve, reject) => {
				this.axios.put(url, data)
					.then(response => {
						resolve(response);
					}, err => {
						reject(err);
					})
			})
		}
	}
}