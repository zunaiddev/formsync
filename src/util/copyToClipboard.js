import toast from "react-hot-toast";

function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => toast.success("Copied!"))
        .catch((err) => toast.error("Failed to copy:" + err));
}

export default copyToClipboard;