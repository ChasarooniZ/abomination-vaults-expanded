import { CHANGES_JOURNAL_ID, MODULE_ID, NAMES_TO_ID } from "./const.js";

Hooks.once("init", async function () {
  game.settings.register(MODULE_ID, "insert-journal", {
    name: game.i18n.localize(
      `${MODULE_ID}.module-settings.insert-journal.name`
    ),
    hint: game.i18n.localize(
      `${MODULE_ID}.module-settings.insert-journal.hint`
    ),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
});

Hooks.once("ready", async function () {
  Hooks.on(
    "renderJournalPageSheet",
    async function (_journalEntryPage, html, info) {
      if (!game.settings.get(MODULE_ID, "insert-journal")) return;
      const uuid = info?.document?.uuid;
      const text = getJournalEntryContent(uuid);
      if (text) {
        const content = await TextEditor.enrichHTML(text);
        $(html[2]).append($(content));
      }
    }
  );
});

function getJournalEntryContent(journalPageUUID) {
  let journal = {};
  switch (journalPageUUID) {
    //A
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.x2NtFguDC8zATVxs": //A
      journal.page = "A: Gauntlight Ruins";
      break;

    //B
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.Jyoads7l6vDaxZyb": //B
      journal.page = "B: Servants' Quarters";
      break;
    case "JournalEntry.uMZ0RiCcPSqsx1Nm.JournalEntryPage.hOMUDNapQMRjV1kQ": //B2
      journal.page = "B02. Magic Mirror";
      break;
    case "JournalEntry.uMZ0RiCcPSqsx1Nm.JournalEntryPage.MY61uS4Lk2va9xoZ": //B6
      journal.page = "B06. Tiger Painting";
      break;
    case "JournalEntry.uMZ0RiCcPSqsx1Nm.JournalEntryPage.CLm67CNpT0gNtor0": //B8
      journal.page = "B08. Extra Traps";
      break;
    case "JournalEntry.uMZ0RiCcPSqsx1Nm.JournalEntryPage.KSCa8Wx2rSKuzHC1": //B9
      journal.page = "B09. Loyal Dog";
      break;
    case "JournalEntry.uMZ0RiCcPSqsx1Nm.JournalEntryPage.38sQJNsnOb2GTdn5": //B12
      journal.page = "B12. His Other Pet";
      break;
    case "JournalEntry.uMZ0RiCcPSqsx1Nm.JournalEntryPage.3prWqGPJfXW7MXX2": //B22
      journal.page = "B22. Clockwork Hunter";
      break;

    //C
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.b75DStTT45gWbHHu": //C
      journal.page = "C: Library";
      break;
    case "JournalEntry.KeWKr2yd8dbppeS5.JournalEntryPage.sVpphDD0gtGtIlFh": //C8
    case "JournalEntry.KeWKr2yd8dbppeS5.JournalEntryPage.F229BVFENz1ZjmG1": //C1
    case "JournalEntry.KeWKr2yd8dbppeS5.JournalEntryPage.wAoRY1yKOiu1ocVU": //C34
      journal = {
        page: "C: Library",
        options: { heading: "SACRIFICE AT MIDNIGHT" },
      };
      break;
    case "JournalEntry.KeWKr2yd8dbppeS5.JournalEntryPage.8X4xF40k06MW0X7q": //C35
      journal = {
        page: "C: Library",
        options: { heading: "CALIDDO'S ENTRANCE" },
      };
      break;

    //D
    case "JournalEntry.Os5bHdzCDiXgJBQ6.JournalEntryPage.JQIMmnpKcRnVfagd": //D4
      journal.page = "D4. Empty Wine Bottle";
      break;
    case "JournalEntry.Os5bHdzCDiXgJBQ6.JournalEntryPage.NHY0hh539X658iSG": //D8
      journal.page = "D8. Locks & Volluk Changes";
      break;
    case "JournalEntry.Os5bHdzCDiXgJBQ6.JournalEntryPage.QCU2xefly79ZVBxj": //D12
      journal.page = "D12. The Barrier";
      break;
    case "JournalEntry.Os5bHdzCDiXgJBQ6.JournalEntryPage.PuMBjgCkm2ImMyCh": //D14
      journal.page = "D14. Jaul and Moral Decisions";
      break;
    case "JournalEntry.Os5bHdzCDiXgJBQ6.JournalEntryPage.J8ggyg2kxws3Sa1h": //D18
      journal.page = "D18. Otari Info";
      break;

    //E
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.i0qZbjkOeAyfCkfZ": //E
      journal.page = "E: Arena";
      break;
    case "JournalEntry.JT0zCcIwsSpKnbB5.JournalEntryPage.ZTmdXcYBW7UvNwZy": //E16
      journal.page = "E16. Shrinking Trap";
      break;
    case "JournalEntry.JT0zCcIwsSpKnbB5.JournalEntryPage.H9gIpvOZl2rpDM2R": //E23
      journal.page = "E23. Under the Mattress";
      break;
    case "JournalEntry.JT0zCcIwsSpKnbB5.JournalEntryPage.gPJ4Hrw4cAGuyDqT": //E26
      journal.page = "E26. The Cheery Man & The Red Holiday";
      break;
    case "JournalEntry.JT0zCcIwsSpKnbB5.JournalEntryPage.6EE3LBjSntNQeK8i": //The Theft
      journal.page = "The Theft Jr.";
      break;

    //F
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.HspvTIqCvN1zvdso": //F
      journal.page = "F: Labs";
      break;
    case "JournalEntry.KI33EAGPVHP4zyFZ.JournalEntryPage.KsyiHaPqAr00LTzA": //F23
      journal.page = "F23. Spectral Reflection";
      break;
    case "JournalEntry.KI33EAGPVHP4zyFZ.JournalEntryPage.UN22cd7cKrXm0UJT": //F24
      journal.page = "F24. Loose Tile";
      break;

    //G
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.8V5lwumIxcPPnYMP": //G
    case "JournalEntry.OyNcqrpRClyhr8BJ.JournalEntryPage.YSOnwMgSJVzVm31U": // G10
      journal.page = "G: Prison";
      break;
    case "JournalEntry.OyNcqrpRClyhr8BJ.JournalEntryPage.JLM4Hwqvk9V8qvbp": //G3
      journal.page = "G3. Drill Puzzle";
      break;
    case "JournalEntry.OyNcqrpRClyhr8BJ.JournalEntryPage.fK6B6GmATzvRIuh4": //G7
      journal.page = "G7. Under the Disc";
      break;
    case "JournalEntry.OyNcqrpRClyhr8BJ.JournalEntryPage.Aob08m2bfrkArmJ2": //G8
      journal.page = "G8. Genderflipped";
      break;
    case "JournalEntry.OyNcqrpRClyhr8BJ.JournalEntryPage.9ggvXDV6BvojMVBZ": //G17
      journal.page = "G17. Stasis Expanded";
      break;

    //H
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.1XuJhsT16oGbuLc8": //H
      journal.page = "H: Farm";
      break;
    case "JournalEntry.FwWmtOBFHhvM2gtf.JournalEntryPage.4gMUpcEFebuDe1Tf": //H17
      journal.page = "H17. Broken Lift";
      break;
    case "JournalEntry.FwWmtOBFHhvM2gtf.JournalEntryPage.MFktSOxcOfKGkbb2": //H39
      journal.page = "H39. Body Mixup";
      break;

    //I
    case "JournalEntry.3T1M395V6J75OsEp.JournalEntryPage.LYgvrg4SI95a4KqP": //I
      journal.page = "I: Hunting Grounds";
      break;
    case "JournalEntry.1vlzl3NJsftNB9Dc.JournalEntryPage.eR8zzQKxdR0jU0zH": //I26
      journal.page = "I26. Dr. Quagmire I Presume";
      break;
    case "JournalEntry.1vlzl3NJsftNB9Dc.JournalEntryPage.nhabEoBxFslXb39s": //I46
      journal.page = "I46. Bottomless Pit";
      break;
    case "JournalEntry.1vlzl3NJsftNB9Dc.JournalEntryPage.ih4G2q4q9sJ699qR": //I48
      journal.page = "I48. Flumps!";
      break;
    case "JournalEntry.1vlzl3NJsftNB9Dc.JournalEntryPage.y01cpsV2Dti3KZwt": //I50
      journal.page = "I50. A Puzzle";
      break;
    case "JournalEntry.1vlzl3NJsftNB9Dc.JournalEntryPage.cwYDvlHWV3sCAa1r": //I51
      journal.page = "I51. Ravirex's Grief";
      break;

    //J
    case "JournalEntry.yn21bNM6kpV4xRol.JournalEntryPage.IRSNx7dn1ps2j7R3": //J16
      journal.page = "J16. The Veiled Master";
      break;
    case "JournalEntry.yn21bNM6kpV4xRol.JournalEntryPage.a9b40LjI7QwLgirk": //J20
      journal.page = "J20. Belcorra's Changes";
      break;

    default: //
      journal = null;
  }
  if (!journal) return;

  const content = journal?.options
    ? getJournalContent(NAMES_TO_ID[journal?.page], journal?.options)
    : getJournalContent(NAMES_TO_ID[journal?.page]);
  return content;
}

async function getJournalContent(
  page,
  options = { heading: "", journalID: CHANGES_JOURNAL_ID }
) {
  const journalPage = game.journal.get(options.journalID)?.pages?.get(page);
  if (!journalPage) return null;
  let content = await TextEditor.enrichHTML(journalPage?.text?.content);
  if (options.heading) content = splitTextAtHeader(options.heading, content);
  content = removeUUIDPart(content);
  return await TextEditor.enrichHTML(`<hr><em><strong>Abomination Vaults: Expanded -</strong> ${journalPage.link}</em><hr>${content}`);
}

function splitTextAtHeader(headerName, htmlText) {
  // Create a case-insensitive regular expression for the header
  const headerRegex = new RegExp(`<h([1-6])[^>]*>${headerName}</h\\1>`, "i");

  // Find the match for the header
  const headerMatch = htmlText.match(headerRegex);

  // If the header is not found, return null
  if (!headerMatch) {
    return null;
  }

  const headerIndex = headerMatch.index;
  const headerLevel = parseInt(headerMatch[1]);

  // Create a regex to find the next header of the same level or higher
  const nextHeaderRegex = new RegExp(`<h([1-${headerLevel}])[^>]*>`, "i");

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

function removeUUIDPart(inputString) {
  // Regular expression to match the pattern
  const regex = /<p><strong>Modifies<\/strong> @UUID\[.*?\]{.*?}<\/p>/;

  // Replace the matched pattern with an empty string
  return inputString.replace(regex, "");
}
