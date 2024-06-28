import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres.oquooeoesnsjlsrpprgr', 'testDBsupabase1234', {
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  port: 6543,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('Conexión establecida correctamente.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

export default sequelize;