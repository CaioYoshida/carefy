import { Router } from 'express';

import TelephoneController from '../controllers/TelephoneController';
import PatientController from '../controllers/PatientController';

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

export default routes;
