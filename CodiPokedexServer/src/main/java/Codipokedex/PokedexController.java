package Codipokedex;

import java.util.*;

import javax.swing.text.Document;

import org.bson.BsonDocument;
import org.bson.conversions.Bson;
import org.springframework.boot.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DB.*;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.operation.OrderBy;

@RestController
public class PokedexController {
	MongoClient mongoClient = new MongoClient("localhost", 27017);;
	DB pokemonDB = mongoClient.getDB("pokemonDB");
	DBCollection pokemonCollection = (DBCollection) pokemonDB.getCollection("pokemonCollection");
	
	@PostMapping(value = "/getPokemon")
	public List<DBObject> GetPokemon(@RequestBody Pokemon query){	
		List<DBObject> all = new ArrayList<DBObject>(); 
		
		BasicDBObject whereQuery = new BasicDBObject();
		if(query.generation != "") {
			whereQuery.put("generation", Integer.parseInt(query.generation));
		}
		if(query.type1 != "") {
			whereQuery.put("type1", query.type1);
		}
		if(query.type2 != "") {
			whereQuery.put("type2", query.type2);
		}
		if(query.is_legendary != "") {
			whereQuery.put("is_legendary", Integer.parseInt(query.is_legendary));
		}
			
		
		DBCursor cursor = pokemonCollection.find(whereQuery);
		cursor.sort(new BasicDBObject("pokedex_number ", -1));
		
		try {
		    while(cursor.hasNext()) {
		    	DBObject c = cursor.next();
				//String s = c.toString();
				all.add((c));
		    }
		} finally {
		    cursor.close();
		}
		//DBObject dbObj = pokemonCollection.find(query);
		
	    return all;
	}

}
