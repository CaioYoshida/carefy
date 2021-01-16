"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Telephone_1 = __importDefault(require("../models/Telephone"));
var TelephoneController = /** @class */ (function () {
    function TelephoneController() {
    }
    TelephoneController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var telephoneRepository, owner, telephones, allTelephones, ownerTelephones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        telephoneRepository = typeorm_1.getRepository(Telephone_1.default);
                        owner = request.query.owner;
                        telephones = [];
                        if (!!owner) return [3 /*break*/, 2];
                        return [4 /*yield*/, telephoneRepository.find()];
                    case 1:
                        allTelephones = _a.sent();
                        telephones = allTelephones;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, telephoneRepository.find({
                            where: { owner_id: owner },
                        })];
                    case 3:
                        ownerTelephones = _a.sent();
                        telephones = ownerTelephones;
                        _a.label = 4;
                    case 4:
                        if (telephones.length === 0) {
                            return [2 /*return*/, response.status(404).json({ message: 'not found' })];
                        }
                        return [2 /*return*/, response.status(200).json(telephones)];
                }
            });
        });
    };
    TelephoneController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var telephoneRepository, telephone_id, telephone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        telephoneRepository = typeorm_1.getRepository(Telephone_1.default);
                        telephone_id = request.params.id;
                        return [4 /*yield*/, telephoneRepository.findOne(telephone_id)];
                    case 1:
                        telephone = _a.sent();
                        if (!telephone) {
                            return [2 /*return*/, response.status(404)];
                        }
                        return [2 /*return*/, response.status(200).json(telephone)];
                }
            });
        });
    };
    TelephoneController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var telephoneRepository, _a, area_code, number, description, owner_id, telephone;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        telephoneRepository = typeorm_1.getRepository(Telephone_1.default);
                        _a = request.body, area_code = _a.area_code, number = _a.number, description = _a.description, owner_id = _a.owner_id;
                        telephone = telephoneRepository.create({
                            area_code: area_code,
                            number: number,
                            description: description,
                            owner_id: owner_id,
                        });
                        return [4 /*yield*/, telephoneRepository.save(telephone)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json(telephone)];
                }
            });
        });
    };
    TelephoneController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var telephoneRepository, telephone_id, telephone, _a, area_code, number, description;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        telephoneRepository = typeorm_1.getRepository(Telephone_1.default);
                        telephone_id = request.params.id;
                        return [4 /*yield*/, telephoneRepository.findOne(telephone_id)];
                    case 1:
                        telephone = _b.sent();
                        if (!telephone) {
                            return [2 /*return*/, response.status(404).json({ message: 'not found' })];
                        }
                        _a = request.body, area_code = _a.area_code, number = _a.number, description = _a.description;
                        telephone.area_code = area_code;
                        telephone.number = number;
                        telephone.description = description;
                        return [4 /*yield*/, telephoneRepository.save(telephone)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(204).json(telephone)];
                }
            });
        });
    };
    TelephoneController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var telephoneRepository, telephone_id, telephone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        telephoneRepository = typeorm_1.getRepository(Telephone_1.default);
                        telephone_id = request.params.id;
                        return [4 /*yield*/, telephoneRepository.findOne(telephone_id)];
                    case 1:
                        telephone = _a.sent();
                        if (!telephone) {
                            return [2 /*return*/, response.status(404).json({ message: 'not found' })];
                        }
                        return [4 /*yield*/, telephoneRepository.remove(telephone)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(204).json({ message: 'remove succeed' })];
                }
            });
        });
    };
    return TelephoneController;
}());
exports.default = new TelephoneController();
