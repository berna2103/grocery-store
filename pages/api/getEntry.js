// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const client = require('contentful')


client.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
})


export default function getEntry(res, req) {
  const entryId = req.params

  const data = client.getEntry(entryId)
  .then((entry) => console.log(entry))
  .catch(console.error)

  return data


}