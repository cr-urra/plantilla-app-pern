import sequelize from 'sequelize';

export const database = new sequelize(
    'db_02', //Nombre bd
    'postgres', //Usuario
    'pass123', //Contraseña
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 1000
        },
        logging: false
    }
)