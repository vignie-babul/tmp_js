users = [
	{
		id: 12,
		name: 'Max',
	},
];


export const createItem = async (ctx) => {
	const item = ctx.request.body;
	users.push(item)

	ctx.status = 200;
	ctx.body = 'Success. Item created';
};

export const getItem = async (ctx) => {
	ctx.status = 200;
	ctx.body = users[0];
};

export const deleteItem = async (ctx) => {
	const id = ctx.request.body.id;
	const index = users.findIndex((user) => user.id === id);

	if (!~index) {
		ctx.status = 403;
		ctx.body = 'Failde. Item not found'
	}

	users[index] = null

	ctx.status = 200;
	ctx.body = 'Success. Item deleted';
};

export const updateItem = async (ctx) => {
	const id = ctx.request.body.id;
	const name = ctx.request.body?.name;

	let user;
	if (name) {
		user = user.find((user) => user.id === id);
		user.name = name;
	}

	ctx.status = 200;
	ctx.body = 'Success. Item updated';
};
