"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const hotel_controller_1 = require("./hotel/hotel.controller");
const hotel_module_1 = require("./hotel/hotel.module");
const user_controller_1 = require("./user/user.controller");
const user_module_1 = require("./user/user.module");
const room_controller_1 = require("./room/room.controller");
const room_module_1 = require("./room/room.module");
const passport_1 = require("@nestjs/passport");
const auth_Strategy_1 = require("./auth/utils/auth.Strategy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            hotel_module_1.HotelModule,
            user_module_1.UserModule,
            room_module_1.RoomModule,
            passport_1.PassportModule
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            hotel_controller_1.HotelController,
            user_controller_1.UserController,
            room_controller_1.RoomController,
        ],
        providers: [app_service_1.AppService, auth_Strategy_1.LocalStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map