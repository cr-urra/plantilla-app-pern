import jwt from 'jsonwebtoken';
import config from '../config';
import users from '../models/users';
import roles from '../models/roles';

export const verifyToken = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        !token && res.json({resul: null, message: "Ha ocurrido un problema con la autenticación"});
        const decoded = jwt.verify(token, config.SECRET);
        const id = decoded.id;
        req.id = id;
        const user = await users.findOne({
            where: {id},
            attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
        });
        !user && res.json({resul: null, message: "No se encuentra el usuario"});
        next();
    }catch(error){
        console.log(error);
        res.json({resul: false, message: "Ha ocurrido un problema, token expirado"});
    };
};

export const administrador = async (req, res, next) => {
    const {rut} = req.params;
    const user = await users.findOne({
        where: {rut},
        attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
    });
    let id = user.roles_id;
    const rol = await roles.findOne({
        where: {id},
        attributes: ['id', 'cod_rol', 'nombre']
    });
    rol.cod_rol === "adm" ? next() : res.json({resul: false, message: "Su usuario no se encuentra autorizado"});
};

export const superUsuario = async (req, res, next) => {
    let {rut} = req.body;
    const user = await users.findOne({
        where: {rut},
        attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
    });
    let id = user.roles_id;
    const rol = await roles.findOne({
        where: {id},
        attributes: ['id', 'cod_rol', 'nombre']
    });
    rol.cod_rol === "sup" ? next() : res.json({resul: false, message: "Su usuario no se encuentra autorizado"});
};

export const usuario = async (req, res, next) => {
    let {rut} = req.body;
    const user = await users.findOne({
        where: {rut},
        attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
    });
    let id = user.roles_id;
    const rol = await roles.findOne({
        where: {id},
        attributes: ['id', 'cod_rol', 'nombre']
    });
    rol.cod_rol === "usr" ? next() : res.json({resul: false, message: "Su usuario no se encuentra autorizado"});
};