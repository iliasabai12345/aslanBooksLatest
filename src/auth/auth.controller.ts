import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "src/auth/auth.service";
import {CreateUserDto} from "src/auth/dto/create-user.dto";
import {User} from "src/auth/schemas/user.schema";

@Controller('auth')
@ApiTags("Auth")

export class AuthController {
    constructor(private readonly authsService: AuthService) {
    }

    //Получение одного елемента оп гет запросу
    @Get("getUser/:username/:password")
    @HttpCode(HttpStatus.OK)
    getOne(@Param("username") username: string, @Param("password") password: string): Promise<{ code: number; data: User; message: string }> {
        return this.authsService.getOne(username, password);
    }

    //Запись данных
    @Post("addUser")
    @ApiBody({type: CreateUserDto})
    @ApiCreatedResponse({
        description: 'Запись юзера на базу .',
        type: CreateUserDto,
    })
    create(@Body() createUserDto: CreateUserDto): Promise<{ code: number; data: User; message: string }> {
        return this.authsService.create(createUserDto);
    }
}
