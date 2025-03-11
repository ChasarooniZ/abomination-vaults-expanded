//Gets localization for english
const obj = {}
const journals = game.journal.contents.filter(j => j.folder?.name === 'Abomination Vaults: Expanded')
for (const journ of journals) {
    const pages = {}
    for (const page of journ.pages.contents) {
        pages[game.pf2e.system.sluggify(page.name)] = {
            "title": page.name,
            "content": page.text.content
        }
    }
    obj[game.pf2e.system.sluggify(journ.name)] = {title: journ.name,...JSON.parse(JSON.stringify(pages))};
}
console.log(obj)