/* tslint:disable */
import { ValidateParam, FieldErrors, ValidateError } from 'tsoa';
import { Controller } from 'tsoa';
import { iocContainer } from './container';
import { UsersController } from './controllers/testController';

const models: any = {
    "User": {
        properties: {
            "id": { "required": true, "typeName": "double" },
            "email": { "required": true, "typeName": "string" },
            "name": { "required": true, "typeName": "string" },
            "status": { "required": false, "typeName": "string" },
            "phoneNumbers": { "required": true, "typeName": "array", "array": { "typeName": "string" } },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/v1/Users/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "typeName": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<UsersController>(UsersController);


            const promise = controller.getUser.apply(controller, validatedArgs);
            let statusCode: any;
            if (controller instanceof Controller) {
                statusCode = (controller as Controller).getStatus();
            }
            promiseHandler(promise, statusCode, response, next);
        });


    function promiseHandler(promise: any, statusCode: any, response: any, next: any) {
        return promise
            .then((data: any) => {
                if (data) {
                    response.status(statusCode || 200).json(data);;
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }


    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors);
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}


