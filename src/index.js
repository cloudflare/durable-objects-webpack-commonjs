const isOdd = require('is-odd')

// In order for our ES6 shim to find the class, we must export it
// from the root of the CommonJS bundle
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
  let id = env.COUNTER.idFromName('A')
  let obj = env.COUNTER.get(id)
  let resp = await obj.fetch(request.url)
  let count = parseInt(await resp.text())
  let wasOdd = isOdd(count) ? 'is odd' : 'is even'

  return new Response(`${count} ${wasOdd}`)
}
