let cache = new Map()
let escapeRe = /[\\^$.*+?()[\]{}|]/g
let paramRe = /:\w+/

export default function matchPath(pathname, { path, exact }) {
	let key = path + !!exact
	let regex
	let names
	if (cache.has(key)) {
		({ regex, names } = cache.get(key))
	} else {
		let rest = path
		regex = '^'
		names = []
		let match
		while ((match = rest.match(paramRe))) {
			regex += rest.slice(0, match.index).replace(escapeRe, '\\$&') + '([^/]+)'
			names.push(match[0].slice(1))
			rest = rest.slice(match.index + match[0].length)
		}
		regex += rest.replace(escapeRe, '\\$&') + (exact ? '$' : '(?=\\/|$)')
		regex = new RegExp(regex)
		cache.set(key, { regex, names })
	}
	let match = pathname.match(regex)
	if (!match) {
		return null
	}
	let params = {}
	for (let i = 0; i < names.length; i++) {
		params[names[i]] = match[i + 1]
	}
	return { path, url: match[0], params }
}
