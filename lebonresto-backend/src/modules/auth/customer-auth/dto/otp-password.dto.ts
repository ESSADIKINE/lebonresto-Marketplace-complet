import { IsEmail, IsNotEmpty, IsString, MinLength, Length } from 'class-validator';

export class RequestOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    purpose: 'verify' | 'reset';
}

export class VerifyOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 6)
    otp: string;

    @IsString()
    @IsNotEmpty()
    purpose: 'verify';
}

export class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 6)
    otp: string;

    @IsString()
    @MinLength(6)
    newPassword: string;
}

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    message: string = "Refresh token should be in cookies";
}
