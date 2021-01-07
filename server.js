//importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from 'cors';
import Rooms from "./dbRooms.js"
import Messages from "./dbMessages.js";

//app config
const app=express();
const port =process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1074030',
    key: '3465136c483220aa1a41',
    secret: '1c54de81e3559e41ee37',
    cluster: 'ap2',
    encrypted: true
  });

//middleware
app.use(express.json());
app.use(cors());


//DB config
const connection_url = "mongodb+srv://admin:tpXAGnMlZjVrdBSF@cluster0.daom1.mongodb.net/whatsapp-db?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;

db.once("open", () => {
    console.log("Db connected");
    const msgCollection = db.collection("rooms");
    const changeStream = msgCollection.watch({fullDocument : "updateLookup"});

    changeStream.on("change", (change)=> {
        console.log(change);

        if(change.operationType === 'update') {
            const messageDetails= change.fullDocument;
            console.log("123", messageDetails);
            pusher.trigger('messages', 'updated',
            {
              name : messageDetails.messages.name,
              message: messageDetails.messages.message,
              recieved : messageDetails.messages.recieved,
            });
        }else {
            console.log('error triggering  message Pusher')
        }

    });
});

db.once("open", () => {
    console.log("Db connected");
    const roomCollection = db.collection("rooms");
    const changeStream = roomCollection.watch();

    changeStream.on("change", (change)=> {
        console.log(change);

        if(change.operationType === 'insert') {
            const roomDetails= change.fullDocument;
            pusher.trigger('rooms', 'inserted',
            {
                id : roomDetails.id,
                roomname : roomDetails.roomname,
            });
        }else {
            console.log('error triggering Pusher')
        }

    });
});

//????

//api routes
app.get("/", (req,res) => res.status(200).send("hello world"));

app.get('/rooms/:roomId/messages/sync' , async (req,res) =>{
    const _id = req.params.roomId;
    console.log(_id);
    const room = await Rooms.findById(_id).exec();
    console.log(room);

    const msg = room.messages;
    console.log(msg);
    res.status(200).send(msg);
    
})



app.get('/rooms/sync' , (req,res) =>{
    const dbRooms = req.body;

    Rooms.find(dbRooms, (err,data)=> {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


app.post('/rooms/:roomId/messages/new' , async (req,res) =>{
    const _id = req.params.roomId;
    console.log(_id);
    const room = await Rooms.findById(_id).exec();
    console.log(room);
    room.messages.push({
        _id : new mongoose.Types.ObjectId(),
        message: req.body.message,
        name: req.body.name,
        timestamp:new Date(),
        recieved: req.body.recieved
    });

    room.save(err =>{
        if(err) return handleError(err)
        console.log('Success!');
    });
    res.status(201).send(res.data)
    })    

app.post('/rooms/new' , (req,res) =>{
    const dbRooms = new Rooms({
        _id : new mongoose.Types.ObjectId(),
        roomname: req.body.roomname,
        messages: []
    });

    Rooms.create(dbRooms, (err,data)=> {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})


//listen
app.listen(port,() => console.log(`listening on localhost:${port}`));