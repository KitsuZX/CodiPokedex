package Codipokedex;

import java.util.*;

import javax.swing.text.Document;

import org.bson.BsonDocument;
import org.springframework.boot.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.mongodb.DB;
import com.mongodb.DB.*;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@RestController
public class PokedexController {
	MongoClient mongoClient = new MongoClient("localhost", 27017);;
	DB pokemonDB = mongoClient.getDB("pokemonDB");
	DBCollection pokemonCollection = (DBCollection) pokemonDB.getCollection("pokemonCollection");
	
	@GetMapping(value = "/getPokemon")
	public DBObject GetPokemon(){	
		DBObject doc = pokemonCollection.findOne();
		return doc;
	}

}
