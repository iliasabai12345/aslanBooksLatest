"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const banners_module_1 = require("./banners/banners.module");
const books_module_1 = require("./books/books.module");
const cart_module_1 = require("./cart/cart.module");
const categories_module_1 = require("./categories/categories.module");
const locations_module_1 = require("./locations/locations.module");
const orders_module_1 = require("./orders/orders.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            books_module_1.BooksModule,
            mongoose_1.MongooseModule.forRoot("mongodb+srv://iliasabaiportfolio:XgNf90nFvIJDAlxL@books.apunmnr.mongodb.net/?retryWrites=true&w=majority"),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                host: 'localhost',
                port: 6379,
            }),
            banners_module_1.BannersModule,
            categories_module_1.CategoriesModule,
            locations_module_1.LocationsModule,
            auth_module_1.AuthModule,
            cart_module_1.CartModule,
            orders_module_1.OrdersModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_INTERCEPTOR,
                useClass: cache_manager_1.CacheInterceptor
            }]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map