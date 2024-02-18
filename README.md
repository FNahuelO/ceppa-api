# CEPPA

CEPPA es una aplicación backend desarrollada en Node.js para el proyecto del Centro de Psicoterapias con Psicodélicos de Argentina. Proporciona funcionalidades clave para la gestión de usuarios, archivos, correos electrónicos y más.

## Características Principales

- Gestión de usuarios con autenticación utilizando JSON Web Tokens (JWT) y encriptación de contraseñas con bcrypt.
- Integración con servicios de almacenamiento en la nube mediante AWS SDK para DynamoDB y S3, así como con Cloudinary para la manipulación de imágenes.
- Implementación de seguridad CORS para permitir el acceso a recursos desde diferentes orígenes.
- Envío de correos electrónicos mediante el uso de la biblioteca nodemailer.
- Integración con bases de datos PostgreSQL utilizando Sequelize como ORM.

## Tecnologías Utilizadas

- Node.js
- Express.js
- AWS SDK
- Cloudinary
- PostgreSQL
- Sequelize
- bcrypt
- nodemailer
- dotenv
