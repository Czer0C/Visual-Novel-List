# Enhanced Visual Novel List from VNDB

Tech stacks: NextJS ~~+ Firebase~~ + TailwindCSS
------------


Pretty acceptable so far.

~~Database management is a bit wonky and in need of a better approach but for now it goes as:~~

~~- Fetch the main batch of info from [queryVNDB](https://query.vndb.org)~~

~~- Export the file into CSV~~

~~- Upload the file to Firebase (Cloud Firestore)~~

~~- When rendering the detail view [VNstat API](https://vnstat.net/) is called to gather the remaining info.~~

**Update 1: the DB problem has been solved**, ~~managed to developed a NodeJS Backend server to handle the complicated querying process~~ so Firebase is no longer needed and from now I can solely work on the Frontend without having to worry much about the API, unless the creator of VNDB would make some changes in the future but who knows.

**Update 2: say goodbye to Heroku and hello Serverless**, but damn if only I had figured this out a bit earlier it would have saved me a lot more work but welp, here it is, fully operational site hosted on Vercel alone, both "backend" and frontend

**Update 3: usability at acceptable rate for now**. I have pretty much covered the majority of high priority features that I had envisioned early on, albeit at great cost of effort and time (no really, it's A LOT for something that is meant to be super simple). I guess TypeScript really is a pain (and overkilled) for a small scale project like this but whatever. One thing that has yet to be perfect is the filtering and sorting logic, but that can be improved at some point later. Floating action button is more or less bonus so not a big deal for now. To sum it up, working with table is no fun but I just wanted to have a taste of TailwindCSS in general so welp. NextJS is still a bomb though and I really look forward to more upgrade later on.
### Stuff to improve later:

- ~~**Refactoring into proper component and layout** !!~~
- ~~Hide NSFW cover~~
- ~~Modal for detail (no longer requires a detail page [id])~~
- ~~Sort by status or by tag (enhanced filter in general)~~
- ~~Some Typography~~
- ~~Better color pallete maybe~~
- ~~Animation~~
- ~~TypeScript~~
- FAB
- ~~Map import into config~~
