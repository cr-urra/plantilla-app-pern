import users from '../models/users';

export const verifyUser = async (req, res, next) => {
    const {rut} = req.body;
    console.log(rut);
    const user = await users.findOne({
        where: {rut},
        attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
    });
    user ? res.json({message: "El rut ingresado ya se encuentra registrado", rut: user.rut}) : next();
};