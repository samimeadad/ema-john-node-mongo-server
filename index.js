const { MongoClient } = require( 'mongodb' );
require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use( cors() );
app.use( express.json() );

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.iezc6.mongodb.net/${ process.env.DATABASE }?retryWrites=true&w=majority`;
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true } );

const run = async () => {
    try {
        await client.connect();
        const database = client.db( 'online_shop' );
        const productCollection = database.collection( 'products' );

        //GET Products API
        app.get( '/products', async ( req, res ) => {
            const cursor = productCollection.find( {} );
            const products = await cursor.toArray();
            const count = await cursor.count();
            res.send( {
                count,
                products
            } );
        } )
    }
    finally {
        // client.close();
    }
}

run().catch( console.dir );

app.get( '/', ( req, res ) => {
    res.send( 'Ema Jon Server is Running' );
} );

app.listen( port, () => {
    console.log( 'Ema Jon Server is Running at Port: ', port );
} );