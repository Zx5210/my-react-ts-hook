module.exports = (req, res, next) => {
	if (req.method === 'POST' && req.path === '/login') {
		if (req.body.username === 'zx' && req.body.password === '123') {
			return res
				.status(200)
				.json({ user: { token: '222&*212))==', name: 'zx', id: 'zx7382' } })
		} else {
			return res.status(400).json({ message: '用户名或密码错误！' })
		}
	}
	if (req.method === 'POST' && req.path === '/register') {
		if (req.body.username === 'zx' && req.body.password === '123') {
			return res
				.status(200)
				.json({ user: { token: '222&*212))==', name: 'zx', id: 'zx7382' } })
		} else {
			return res.status(400).json({ message: '用户名或密码错误！' })
		}
	}
	next()
}
