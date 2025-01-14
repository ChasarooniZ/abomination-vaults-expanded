import { CHANGES_JOURNAL_ID, NAMES_TO_ID } from "./const.js";

Hooks.once('init', async function () {

});

Hooks.once('ready', async function () {
    Hooks.on('renderJournalPageSheet', async function (_journalEntryPage, html, info) {
        const id = info?.document?.id;
        const text = getJournalEntryContent(id);
        if (text) {
            $(html[2]).append($(TextEditor.enrichHTML(text)))
        }
    });
});


function getJournalEntryContent(journalPageId) {
    let journal = {};
    switch (journalPageId) {
        //A
        case "x2NtFguDC8zATVxs": //A
            journal.page = "A: Gauntlight Ruins"; break;

        //B
        case "Jyoads7l6vDaxZyb": //B
            journal.page = "B: Servants' Quarters"; break;
        case "hOMUDNapQMRjV1kQ": //B2
            journal.page = "B02. Magic Mirror"; break;
        case "MY61uS4Lk2va9xoZ": //B6
            journal.page = "B06. Tiger Painting"; break;
        case "CLm67CNpT0gNtor0": //B8
            journal.page = "B08. Extra Traps"; break;
        case "surluLUD8HprMYIw": //B9
            journal.page = "B09. Loyal Dog"; break;
        case "38sQJNsnOb2GTdn5": //B12
            journal.page = "B12. His Other Pet"; break;
        case "3prWqGPJfXW7MXX2": //B22
            journal.page = "B22. Clockwork Hunter"; break;

        //C
        case "b75DStTT45gWbHHu": //C
            journal.page = "C: Library"; break;
        case "sVpphDD0gtGtIlFh": //C8
        case "F229BVFENz1ZjmG1": //C1
        case "wAoRY1yKOiu1ocVU": //C34
            journal = { page: "C: Library", options: { heading: "SACRIFICE AT MIDNIGHT" } }; break;
        case "8X4xF40k06MW0X7q": //C35
            journal = { page: "C: Library", options: { heading: "CALIDDO'S ENTRANCE" } }; break;

        //D
        case "JQIMmnpKcRnVfagd": //D4
            journal.page = "D4. Empty Wine Bottle"; break;
        case "NHY0hh539X658iSG": //D8
            journal.page = "D8. Locks & Volluk Changes"; break;
        case "QCU2xefly79ZVBxj": //D12
            journal.page = "D12. The Barrier"; break;
        case "PuMBjgCkm2ImMyCh": //D14
            journal.page = "D14. Jaul and Moral Decisions"; break;
        case "J8ggyg2kxws3Sa1h": //D18
            journal.page = "D18. Otari Info"; break;


        //E
        case "i0qZbjkOeAyfCkfZ": //E
            journal.page = "E: Arena"; break;
        case "ZTmdXcYBW7UvNwZy": //E16
            journal.page = "E16. Shrinking Trap"; break;
        case "H9gIpvOZl2rpDM2R": //E23
            journal.page = "E23. Under the Mattress"; break;
        case "gPJ4Hrw4cAGuyDqT": //E26
            journal.page = "E26. The Cheery Man & The Red Holiday"; break;
        case "6EE3LBjSntNQeK8i": //The Theft
            journal.page = "The Theft Jr."; break;

        //F
        case "HspvTIqCvN1zvdso": //F
            journal.page = "F: Labs"; break;
        case "KsyiHaPqAr00LTzA": //F23
            journal.page = "F23. Spectral Reflection"; break;
        case "UN22cd7cKrXm0UJT": //F24
            journal.page = "F24. Loose Tile"; break;

        //G
        case "8V5lwumIxcPPnYMP": //G
        case "YSOnwMgSJVzVm31U": // G10
            journal.page = "G: Prison"; break;
        case "JLM4Hwqvk9V8qvbp": //G3
            journal.page = "G3. Drill Puzzle"; break;
        case "fK6B6GmATzvRIuh4": //G7
            journal.page = "G7. Under the Disc"; break;
        case "Aob08m2bfrkArmJ2": //G8
            journal.page = "G8. Genderflipped"; break;
        case "9ggvXDV6BvojMVBZ": //G17
            journal.page = "G17. Stasis Expanded"; break;

        //H
        case "1XuJhsT16oGbuLc8": //H
            journal.page = "H: Farm"; break;
        case "4gMUpcEFebuDe1Tf": //H17
            journal.page = "H17. Broken Lift"; break;
        case "MFktSOxcOfKGkbb2": //H39
            journal.page = "H39. Body Mixup"; break;

        //I
        case "LYgvrg4SI95a4KqP": //I
            journal.page = "I: Hunting Grounds"; break;
        case "eR8zzQKxdR0jU0zH": //I26
            journal.page = "I26. Dr. Quagmire I Presume"; break;
        case "nhabEoBxFslXb39s": //I46
            journal.page = "I46. Bottomless Pit"; break;
        case "ih4G2q4q9sJ699qR": //I48
            journal.page = "I48. Flumps!"; break;
        case "y01cpsV2Dti3KZwt": //I50
            journal.page = "I50. A Puzzle"; break;
        case "cwYDvlHWV3sCAa1r": //I51
            journal.page = "I51. Ravirex's Grief"; break;

        //J
        case "56ulq98tpQQP3Jup": //J16
            journal.page = "J16. The Veiled Master"; break;
        case "a9b40LjI7QwLgirk": //J20
            journal.page = "J20. Belcorra's Changes"; break;

        default: //
            journal = null
    }
    if (!journal) return;

    const content = journal?.options ? getJournalContent(NAMES_TO_ID[journal?.page], journal?.options) : getJournalContent(NAMES_TO_ID[journal?.page]);
    return content;
}

function getJournalContent(page, options = { heading: "", journalID: CHANGES_JOURNAL_ID }) {
    const journalPage = game.journal.get(options.journalID)?.pages?.get(page);
    if (!journalPage) return null;
    let content = journalPage?.text?.content;
    if (options.heading) content = splitTextAtHeader(options.heading, content);
    return `<hr><b>AV:E: ${journalPage.link}</b><br>${content}`
}

function splitTextAtHeader(headerName, htmlText) {
    // Create a case-insensitive regular expression for the header
    const headerRegex = new RegExp(`<h([1-6])[^>]*>${headerName}</h\\1>`, 'i');

    // Find the match for the header
    const headerMatch = htmlText.match(headerRegex);

    // If the header is not found, return null
    if (!headerMatch) {
        return null;
    }

    const headerIndex = headerMatch.index;
    const headerLevel = parseInt(headerMatch[1]);

    // Create a regex to find the next header of the same level or higher
    const nextHeaderRegex = new RegExp(`<h([1-${headerLevel}])[^>]*>`, 'i');

    // Find the index of the next header
    const remainingText = htmlText.slice(headerIndex + headerMatch[0].length);
    const nextHeaderMatch = remainingText.match(nextHeaderRegex);

    let endIndex = htmlText.length;
    if (nextHeaderMatch) {
        endIndex = headerIndex + headerMatch[0].length + nextHeaderMatch.index;
    }

    // Return the substring from the header to the next header or end of text
    return htmlText.slice(headerIndex, endIndex);
}
