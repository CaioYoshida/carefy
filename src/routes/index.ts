import { Router } from 'express';

import TelephoneController from '../controllers/TelephoneController';

const routes = Router();

routes.get('/telephones', TelephoneController.index);
routes.get('/telephones/:id', TelephoneController.show);
routes.post('/telephones', TelephoneController.store);
routes.put('/telephones/:id', TelephoneController.update);
routes.delete('/telephones/:id', TelephoneController.delete);

export default routes;
