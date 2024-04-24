import swaggerJsDocs from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Product Management Api's Documentations",
            version: '1.0',
            description: 'All api end points',
            servers: ['http://localhost:3000']
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
        produces: ["application/json"]
    },
    apis: [
        "./api/v1/web/*/*.js"
        ]
};
export default swaggerJsDocs(swaggerOptions);