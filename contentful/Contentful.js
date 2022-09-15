const client = require("contentful").createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

const getContentfulItems = (entry) =>
  client
    .getEntries({ content_type: entry, include: 2 })
    .then((response) => response.items);
const getContentfulItem = (entryId) =>
  client.getEntry(entryId).then((response) => response.fields);
const getContentfulSingleItem = (slug, entry) =>
  client
    .getEntries({
      "fields.slug": slug,
      content_type: entry,
    })
    .then((response) => response.items);

export { getContentfulItems, getContentfulItem, getContentfulSingleItem };
