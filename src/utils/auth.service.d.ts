import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    private generateSalt;
    hashPassword(password: string): Promise<{
        salt: string;
        hashedPassword: string;
    }>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
    generateAccessToken(_id: string, role: string): Promise<string>;
}
