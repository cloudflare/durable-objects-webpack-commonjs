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
  let url = new URL(request.url)
  let name = url.searchParams.get("name")
  if (!name) {
    return new Response(
      "Select a Durable Object to contact by using" +
        " the `name` URL query string parameter. e.g. ?name=A"
    )
  }

  // Every unique ID refers to an individual instance of the Counter class that
  // has its own state. `idFromName()` always returns the same ID when given the
  // same string as input (and called on the same class), but never the same
  // ID for two different strings (or for different classes).
  let id = env.COUNTER.idFromName(name)

  // Construct the stub for the Durable Object using the ID. A stub is a
  // client object used to send messages to the Durable Object.
  let obj = env.COUNTER.get(id)

  // Send a request to the Durable Object, then await its response.
  let resp = await obj.fetch(request.url)
  let count = parseInt(await resp.text())
  let wasOdd = isOdd(count) ? 'is odd' : 'is even'

  return new Response(`Durable Object '${name}' ${count} ${wasOdd}`)
}
