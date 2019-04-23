package Codipokedex;

import java.util.*;
import java.util.regex.Pattern;

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
		if(query.name != "") {
			whereQuery.put("name", Pattern.compile("^" + query.name));
		}
			
		
		DBCursor cursor = pokemonCollection.find(whereQuery);
		cursor.sort(new BasicDBObject("pokedex_number", Integer.parseInt(query.orden)));
		all = cursor.toArray();
		
		cursor.close();	

	    return all;
	}
	
	@PostMapping(value = "/addPokemon")
	public String AddPokemon(@RequestBody Pokemon query){	
		String s = new String("");
		
		BasicDBObject whereQuery = new BasicDBObject();
		List<DBObject> all = new ArrayList<DBObject>(); 
		whereQuery.put("pokedex_number", Integer.parseInt(query.pokedex_number));
		DBCursor cursor = pokemonCollection.find(whereQuery);
		all = cursor.toArray();
		if(all.isEmpty()) { 
			BasicDBObject document = new BasicDBObject();
			document.put("name", query.name);
			document.put("type1", query.type1);
			document.put("type2", query.type2);
			document.put("abilities", query.abilities);
			document.put("is_legendary", Integer.parseInt(query.is_legendary));
			document.put("pokedex_number",  Integer.parseInt(query.pokedex_number));
			document.put("generation", 8);
			
			pokemonCollection.insert(document);
			s = "Pokemon insertado con éxito";
		}else {
			s = "Ya existe un pokemon con ese número en la pokedex, ponle uno nuevo";
		}
		
		return s;
	}
	
	@PostMapping(value = "/deletePokemon")
	public String DeletePokemon(@RequestBody Pokemon query){	
		String s = new String("");
		BasicDBObject whereQuery = new BasicDBObject();
		List<DBObject> all = new ArrayList<DBObject>(); 
		whereQuery.put("pokedex_number", Integer.parseInt(query.pokedex_number));
		DBCursor cursor = pokemonCollection.find(whereQuery);
		all = cursor.toArray();
		if(all.isEmpty()) { 
			s = "No hay ningún pokemon con ese número en la pokedex, prueba con otro distinto";
		}else {
			pokemonCollection.remove(new BasicDBObject().append("pokedex_number", Integer.parseInt(query.pokedex_number)));
			s = "Pokemon borrado correctamente";
		}
		
		return s;
	}
	
}
	

