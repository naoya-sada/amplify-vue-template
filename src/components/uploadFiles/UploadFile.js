import Modal from "@/components/Vue/Modal.vue";
import axios from "axios";

export default {
    name: 'UploadFile',
    data() {
        return {
            filename: "",
            text: "No data",
            interval: null,
            showModal: false
        }
    },
    components: {
        Modal
    },
    mounted() {
        console.log(`UploadFile mounted`)
    },
    methods: {
        async uploadFile(event) {
            const file = event.target.files[0];
            this.text = "No data";
            if (!file) {
                alert('Failed to get file object.')
                return;
            }
            // 署名付きURL発行
            console.log(`URL発行開始： ${file.name}, ${file.type}`)
            const newFilename = this.convertFilename(file.name);
            console.log(`new filename: ${newFilename}`);
            if (newFilename == "") {
                alert('Failed to convert filename.');
                return;
            }
            this.filename = newFilename
            const response = await axios.get('https://t8dqdtm6y5.execute-api.ap-northeast-1.amazonaws.com/develop', {
                params: {
                    filename: newFilename
                }
            });

            const presignedUrl = response.data.url;
            console.log(`presignedUrl: ${presignedUrl}`);
            console.log('Upload start!!');
            await axios.put(presignedUrl, file);
            alert(`Upload finish.\n${this.filename}`)
            this.interval = setInterval(() => {
                console.log('Sleep 5sec')
                this.getTextdata();
            }, 5 * 1000)
        },
        convertFilename(filename) {
            const date = new Date().toISOString().replace(/:/g, '-');
            const extensionPos = filename.lastIndexOf('.');
            let extension = "";
            if (extensionPos == -1) {
                console.log('No extension.');
                return ""
            } else {
                extension = filename.slice(extensionPos);
                console.log(`Extension : ${extension}`);
            }
            const noExtensionFilename = filename.split(".").slice(0, -1).join(".");
            const replaceFilename = noExtensionFilename + '_' + date + extension;
            return replaceFilename; 
        },
        // テキストデータ取得
        async getTextdata() {
            const response = await axios.get('https://fb9rqaz5qe.execute-api.ap-northeast-1.amazonaws.com/develop', {
                params: {
                    filename: this.filename + '.txt'
                }
            });
            if (response.data.data) {
                this.text = response.data.data
                clearInterval(this.interval);
                console.log('Interval clear.');
            }
        },
        openModal() {
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
        }
    }
}