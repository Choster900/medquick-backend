import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsEmailOrDui(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isEmailOrDui',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(_: any, args: ValidationArguments) {
                    const obj = args.object as any;
                    return !!(obj.userEmail || obj.userDui);
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Debe proporcionar al menos el correo electrónico o el DUI';
                },
            },
        });
    };
}
