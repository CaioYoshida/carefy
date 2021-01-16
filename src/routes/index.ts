import { Router } from 'express';

import TelephoneController from '../controllers/TelephoneController';
import PatientController from '../controllers/PatientController';
import PhisicianController from '../controllers/PhisicianController';
import AppointmentController from '../controllers/AppointmentController';
import PatientAppointments from '../controllers/PatientAppoimentsController';

const routes = Router();

routes.get('/telephones', TelephoneController.index);
routes.get('/telephones/:id', TelephoneController.show);
routes.post('/telephones', TelephoneController.store);
routes.put('/telephones/:id', TelephoneController.update);
routes.delete('/telephones/:id', TelephoneController.delete);

routes.get('/patients', PatientController.index);
routes.get('/patients/:id', PatientController.show);
routes.post('/patients', PatientController.store);
routes.put('/patients/:id', PatientController.update);
routes.delete('/patients/:id', PatientController.delete);

routes.get('/patients/:id/appointments', PatientAppointments.index);

routes.get('/phisicians', PhisicianController.index);
routes.get('/phisicians/:id', PhisicianController.show);
routes.post('/phisicians', PhisicianController.store);
routes.put('/phisicians/:id', PhisicianController.update);
routes.delete('/phisicians/:id', PhisicianController.delete);

routes.get('/appointments', AppointmentController.index);
routes.get('/appointments/:id', AppointmentController.show);
routes.post('/appointments', AppointmentController.store);
routes.put('/appointments/:id', AppointmentController.update);
routes.delete('/appointments/:id', AppointmentController.delete);

export default routes;
