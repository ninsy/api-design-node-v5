export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

// usage example
// const fetchUser = async (req, res, next) => {
//     const user = await db.query(`SELECT * FROM Users where id = ?`, [req.params.id]);
//     req.user = user;
//     next();
// }

// app.get('/user/:id', asyncHandler(fetchUser), getUser);

