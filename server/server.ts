import App from './app'
import { Global } from './global'
require('dotenv').config();
import * as bodyParser from 'body-parser'
import { errorMiddleware } from './middleware'
import { CustomerController,  TicketController,  ActivityController,  TimeentryController, 
   CustContactController,  ChannelController, ClassificationController, ChargetypeController,
    CommentController, ClientattributesController, ClientdynamicController,
  DynamicFormController,MemoriaController} from './controllers'
import { getConnectionManager } from 'typeorm';

const connectionManager = getConnectionManager();
const connection = connectionManager.create(Global.dbConfig);


const app = new App({
  port: parseInt(process.env.PORT),
  controllers: [
    CustomerController,
    TicketController,  
    ActivityController,  
    TimeentryController,
    CustContactController,
    ChannelController,
    ClassificationController,
    ChargetypeController,
    CommentController,
    ClientattributesController,
    ClientdynamicController,
    DynamicFormController,
    MemoriaController
  

  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    errorMiddleware
  ]
})
//app.listen();
connection
  .connect()
  .then(() => {
   app.listen();
   //const server = app.listen();
    //const io = require('socket.io').listen(server);
    //let app = new ChatServer().getApp();
    //export { app };
    //app.sockets();
    
  })
  .catch(error => {
    console.log('connection failed..', error);
  });

