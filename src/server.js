"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT || 3332;
exports.app.use(express_1.default.json());
exports.app.use(routes_1.router);
exports.app.route('/').get((req, res) => {
    res.send('Hello World!');
});
exports.app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});
