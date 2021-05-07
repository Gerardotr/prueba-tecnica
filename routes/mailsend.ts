import { Router, Response } from 'express';
import Mail from "../services/main.service";
import { Usuario } from '../models/usuario.model';


const MailRoute = Router();


MailRoute.post('/', (req: any, res: Response) => {

    
    
    const message = Object.assign({}, req.body);  

    const email = message.to;
    


    Usuario.findOne( {email}).then(async estudinates => {



        await estudinates


    

        if(estudinates == null){

            res.json({
                ok: false,
                message: 'No hay estudiante registrado con ese email'
                
            });
        }
       
        else {

    

            var estudiante ={ id: estudinates._id, nombre: estudinates.nombre, email: estudinates.email  }; 

            if(estudinates.password == '') {

                
                res.json({
                    ok: false,
                    message: 'Inicia sesión con Google'
                    
                });


            }else {

                Mail.to = message.to;
                Mail.subject = message.subject;
                Mail.message = message.message;
                let result = Mail.sendMail(estudiante.id);
    
                res.status(200).json({ ok: true, emailStatus: 'Send' });


            }


                    
       

        }

      
    });
  
});


export default MailRoute;