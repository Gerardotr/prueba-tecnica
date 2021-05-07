import {Router, Response} from 'express';

const index = Router();

index.get('/', (req, res: Response) => {

    res.json({
        ok: true,
        message: 'API Working',
        routing: 'Security'
    });

});

export default index;