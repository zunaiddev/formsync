function formatDate(date) {
    const options = {
        month: "long",      // Full month name (e.g., November)
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    };

    return date
        .toLocaleString("en-US", options)
        .replace(",", "")         // remove comma after day
        .replace(" AM", "am")     // lowercase am
        .replace(" PM", "pm")
        .replace(" at", "");    // lowercase pm
}

export default formatDate;