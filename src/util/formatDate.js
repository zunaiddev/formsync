function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    return date
        .toLocaleString("en-GB", options)
        .replace(",", "")
        .replace(" am", "am")
        .replace(" pm", "pm");
}

export default formatDate;