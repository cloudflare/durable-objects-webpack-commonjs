const isOdd = require('is-odd')
const Counter = require('./counter.js')
exports.Counter = Counter

exports.handlers = {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env)
    } catch (e) {
      return new Response(e.message)
    }
  },
}

async function handleRequest(request, env) {
  let id = env.Counter.idFromName('A')
  let obj = env.Counter.get(id)
  let resp = await obj.fetch(request.url)
  let count = await resp.text()
  let wasOdd = isOdd(count) ? ' is odd' : ' is even'

  return new Response(`${count} ${wasOdd}`)
}
