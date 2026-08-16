export const CEREMONY_DATE = new Date("2026-03-15T17:00:00-07:00");

export const NAV_LINKS = [
    { label: "The Night", href: "#the-night" },
    { label: "Contenders", href: "#contenders" },
    { label: "The Carpet", href: "#carpet" },
    { label: "Venue", href: "#venue" },
    { label: "RSVP", href: "#rsvp" },
];

export const MARQUEE_ITEMS = [
    "The 98th Academy Awards",
    "March Fifteenth · MMXXVI",
    "Dolby Theatre · Hollywood",
    "Excellence in Cinema",
    "One Night in Gold",
];

export const MANIFESTO_CHAPTERS = [
    {
        number: "01",
        title: "The Craft",
        body: "Cinema is the only art that dreams while awake. Every frame honoured on this stage is a devotion — years of obsession distilled into light, performance, and sound. The gold is merely the punctuation.",
    },
    {
        number: "02",
        title: "The Night",
        body: "On March fifteenth, the Dolby Theatre holds its breath. Ninety feet of crimson carpet, two thousand flashes, one envelope at a time. For a few hours, all of Hollywood stands still.",
    },
    {
        number: "03",
        title: "The Gold",
        body: "Thirteen and a half inches. Eight and a half pounds of britannium beneath twenty-four-karat gold. Since 1929 it has asked only one thing of those who hold it — that they earned it.",
    },
];

export const CATEGORIES = [
    {
        id: "picture",
        label: "Best Picture",
        nominees: [
            { name: "One Battle After Another", detail: "Warner Bros. · Paul Thomas Anderson" },
            { name: "Sinners", detail: "Warner Bros. · Ryan Coogler" },
            { name: "Hamnet", detail: "Focus Features · Chloé Zhao" },
            { name: "Marty Supreme", detail: "A24 · Josh Safdie" },
            { name: "Frankenstein", detail: "Netflix · Guillermo del Toro" },
            { name: "Sentimental Value", detail: "Neon · Joachim Trier" },
        ],
    },
    {
        id: "directing",
        label: "Directing",
        nominees: [
            { name: "Paul Thomas Anderson", detail: "One Battle After Another" },
            { name: "Ryan Coogler", detail: "Sinners" },
            { name: "Chloé Zhao", detail: "Hamnet" },
            { name: "Josh Safdie", detail: "Marty Supreme" },
            { name: "Joachim Trier", detail: "Sentimental Value" },
        ],
    },
    {
        id: "actor",
        label: "Actor in a Leading Role",
        nominees: [
            { name: "Timothée Chalamet", detail: "Marty Supreme" },
            { name: "Leonardo DiCaprio", detail: "One Battle After Another" },
            { name: "Michael B. Jordan", detail: "Sinners" },
            { name: "Wagner Moura", detail: "The Secret Agent" },
            { name: "Ethan Hawke", detail: "Blue Moon" },
        ],
    },
    {
        id: "actress",
        label: "Actress in a Leading Role",
        nominees: [
            { name: "Jessie Buckley", detail: "Hamnet" },
            { name: "Rose Byrne", detail: "If I Had Legs I'd Kick You" },
            { name: "Renate Reinsve", detail: "Sentimental Value" },
            { name: "Cynthia Erivo", detail: "Wicked: For Good" },
            { name: "Emma Stone", detail: "Bugonia" },
        ],
    },
];

export const GALLERY_IMAGES = [
    {
        url: "https://images.unsplash.com/photo-1778356192459-40546f005dc6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHw0fHxyZWQlMjBjYXJwZXQlMjBnbGFtb3VyfGVufDB8fHx8MTc4Njg3NDY1Mnww&ixlib=rb-4.1.0&q=85",
        caption: "The Arrival",
        span: "md:col-span-7 md:row-span-2",
        ratio: "aspect-[4/3] md:aspect-auto md:h-full",
    },
    {
        url: "https://images.unsplash.com/photo-1614080035039-af24354a6478?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxyZWQlMjBjYXJwZXQlMjBnbGFtb3VyfGVufDB8fHx8MTc4Njg3NDY1Mnww&ixlib=rb-4.1.0&q=85",
        caption: "The Steps",
        span: "md:col-span-5",
        ratio: "aspect-[16/10]",
    },
    {
        url: "https://images.unsplash.com/photo-1650240852447-46505dba4726?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHxnb2xkZW4lMjBhd2FyZCUyMHRyb3BoeXxlbnwwfHx8fDE3ODY4NzQ2NTJ8MA&ixlib=rb-4.1.0&q=85",
        caption: "The Icons",
        span: "md:col-span-5",
        ratio: "aspect-[16/10]",
    },
    {
        url: "https://images.unsplash.com/photo-1738081613098-caea4cb0a035?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxob2xseXdvb2QlMjB0aGVhdHJlJTIwbmlnaHR8ZW58MHx8fHwxNzg2ODc0NjUyfDA&ixlib=rb-4.1.0&q=85",
        caption: "The Marquee",
        span: "md:col-span-4",
        ratio: "aspect-[4/3]",
    },
    {
        url: "https://images.unsplash.com/photo-1657649549501-f0a887addd7c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxob2xseXdvb2QlMjB0aGVhdHJlJTIwbmlnaHR8ZW58MHx8fHwxNzg2ODc0NjUyfDA&ixlib=rb-4.1.0&q=85",
        caption: "The Hills",
        span: "md:col-span-8",
        ratio: "aspect-[16/8]",
    },
];

export const VENUE_FACTS = [
    { label: "Date", value: "Sunday, March 15 · 2026" },
    { label: "Ceremony", value: "4:00 PM PT · Red carpet from 1:30 PM" },
    { label: "Venue", value: "Dolby Theatre · Ovation Hollywood" },
    { label: "Address", value: "6801 Hollywood Blvd, Los Angeles" },
    { label: "Broadcast", value: "Live on ABC · Streaming on Hulu" },
];
