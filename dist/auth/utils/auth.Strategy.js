"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor() {
        super();
    }
    async validate(username, password) {
        console.log("strategy is working...");
        return null;
    }
}
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=auth.Strategy.js.map