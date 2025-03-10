import UploadFile from './vue/UploadFile.vue'
export default {
    name : "App",
    data() {
        return {
            title: "Translate text in an image file"
        }
    },
    components: {
        UploadFile
    },
    methods: {
        setTitle(title) {
            this.title = title
        }
    },
    mounted() {
        console.log(`mounted, ${this.title}`)
    }
}