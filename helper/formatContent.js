function formatContent(content) {
    if (content === "Photography") {
        return "Amazing " + content;
    } else if (content === "Architecture") {
        return "The " + content;
    } else if (content === "Ocean") {
        return "The Wide " + content;
    } else if (content === "Korean Singer") {
        return "The Greatest " + content;
    } else {
        return content;
    }
}

module.exports = formatContent