const appObj = {
  el: "#app",
  data: {
    message: "",
    buckets: false,
    files: false,
    accessKeyId: "",
    secretAccessKey: "",
    region: "eu-west-2"
  },
  created() {
    this.loadBuckets();
  },
  methods: {
    async postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await this.fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      });
      return response.json();
    },
    async loadBuckets() {
      this.buckets = [];
      let buckets = await this.fetch("/list-buckets");
      buckets = await buckets.json();
      if (buckets.error) {
        this.message = buckets.error.message;
      } else {
        this.buckets = buckets;
      }
      return buckets;
    },
    async loadFiles(bucket, name, type, key) {
      let files;
      if (type === "folder") {
        files = await this.fetch(
          "/list-files?bucket=" + bucket + "&prefix=" + name
        );
      } else {
        if (name) {
          window.open("/download?key=" + key + "&bucket=" + bucket);
        } else {
          files = await this.fetch("/list-files?bucket=" + bucket);
        }
      }
      files = await files.json();
      this.buckets = false;
      this.files = files;
      return files;
    },
    async changeCredentials() {
      let response = await this.postData("/change-config", {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        region: this.region
      });

      this.message = response.message;
      this.loadBuckets();
      this.files = false;
      return { message: this.message };
    },
    async fetch(url, data) {
      return fetch(url, data);
    }
  }
};

module.exports = appObj;
