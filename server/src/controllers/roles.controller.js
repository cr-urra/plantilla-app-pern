import roles from '../models/roles';

export const getAllRoles = async (req, res) => {
    const allRoles = await roles.findAll({
        attributes: ['id', 'cod_rol', 'nombre'],
        order: [
            ['id', 'DESC']
        ]
    });
    res.json({allRoles});
};