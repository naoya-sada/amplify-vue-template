export default {
    name: "Modal",
    props: {
        contents: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            open: false
        }
    }
}