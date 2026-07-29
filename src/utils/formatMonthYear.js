function formatMonthYear(date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export default formatMonthYear;