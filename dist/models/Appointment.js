"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Patient_1 = __importDefault(require("./Patient"));
var Phisician_1 = __importDefault(require("./Phisician"));
var Appointment = /** @class */ (function () {
    function Appointment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Appointment.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('uuid'),
        __metadata("design:type", String)
    ], Appointment.prototype, "patient_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Patient_1.default; }, {
            eager: true,
        }),
        typeorm_1.JoinColumn({ name: 'patient_id' }),
        __metadata("design:type", Patient_1.default)
    ], Appointment.prototype, "patient", void 0);
    __decorate([
        typeorm_1.Column('uuid'),
        __metadata("design:type", String)
    ], Appointment.prototype, "phisician_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Phisician_1.default; }, {
            eager: true,
        }),
        typeorm_1.JoinColumn({ name: 'phisician_id' }),
        __metadata("design:type", Phisician_1.default)
    ], Appointment.prototype, "phisician", void 0);
    __decorate([
        typeorm_1.Column('timestamp without time zone'),
        __metadata("design:type", Date)
    ], Appointment.prototype, "start", void 0);
    __decorate([
        typeorm_1.Column('timestamp without time zone'),
        __metadata("design:type", Date)
    ], Appointment.prototype, "end", void 0);
    Appointment = __decorate([
        typeorm_1.Entity('appointments')
    ], Appointment);
    return Appointment;
}());
exports.default = Appointment;
