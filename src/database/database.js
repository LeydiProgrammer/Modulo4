import {Sequelize} from 'sequelize';
import 'dotenv/config';

const sequelize=new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {

        host:process.env.DB_HOST,
        //port: process.env.DB_PORT, 
        dialect:process.env.DB_DIALECT, // mysql o squilte
        logging:console.log,

        //para deploy
        dialectOptions:{
            ssl:{
                require:true,
                rejectUnauthorized:false,
            }
        }
    }
) ;

export default sequelize;