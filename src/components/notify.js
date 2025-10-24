import toast from "react-hot-toast";

const notify = {
    success: msg => toast.success(msg, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    }),
    error: msg => toast.error(msg, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    })
}

export default notify;