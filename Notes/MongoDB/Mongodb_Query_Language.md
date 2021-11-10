<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://webimages.mongodb.com/_com_assets/cms/kusb9stg1ndrp7j53-MongoDBLogoBrand1.png?auto=format%252Ccompress">
    <img src="https://webimages.mongodb.com/_com_assets/cms/kusb9stg1ndrp7j53-MongoDBLogoBrand1.png?auto=format%252Ccompress" alt="Logo" >
  </a>

INTRODUCTION TO MONGO QUERY LANGUAGE - NOTES BY ISHAAN DWIVEDI <h3 align="center">

</h3>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
  <li>
      <a href="#datatypes">MongoDB Data types</a>
      </li>
    <li>
      <a href="#collections">Collections & Documents</a>
      </li>
         <li>
      <a href="#create">Create,Show & Delete A Database</a>
      </li>
    <li>
      <a href="#create_collection">Create A Collection</a>
      </li>
         <li>
      <a href="#insert">Insert Into A Collection</a>
      </li>
         <li>
      <a href="#read">Read/Find & Filter Document(s)</a>
      </li>
        <li>
      <a href="#update">Updating A Document </a>
      </li>
              <li>
      <a href="#delete">Delete Document/Collections/Database </a>
      </li>
   
  </ol>
</details>

<p id="datatypes">

## MongoDB Data Types

</p>
  
MongoDB supports many datatypes. Some of them are −

- **String** − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.
- **Integer** − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.
- **Boolean** − This type is used to store a boolean (true/ false) value.
- **Double** − This type is used to store floating point values.
- **Min/ Max keys** − This type is used to compare a value against the lowest and highest BSON elements.
- **Arrays** − This type is used to store arrays or list or multiple values into one key.
- **Timestamp** − ctimestamp. This can be handy for recording when a document has been modified or added.
- **Object** − This datatype is used for embedded documents.
- **Null** − This type is used to store a Null value.
- **Symbol** − This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.
- **Date** − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.
- **Object ID** − This datatype is used to store the document’s ID.
- **Binary data** − This datatype is used to store binary data.
- **Code** − This datatype is used to store JavaScript code into the document.
- **Regular expression** − This datatype is used to store regular expression

<p id="collections">

## Collections, Documents & Fields

</p>

![enter image description here](https://static.packt-cdn.com/products/9781783280995/graphics/0995OS_12_01.jpg)

A MongoDB Database contains various collections and A collection contains documents and documents are nothing but javascript object consisting of field(Key) and values.

<p id="create">

## Create,Show & Drop Database Using MQL(**MongoDB Query Language**)

</p>

To Create A Database In MongoDB Use Following Commands

**Syntax**

    use <database_name>

**Example**

    use student

**Output**

    switched to db student

<!-- GETTING STARTED -->

## Show All Existing Databases

**Command**
show dbs

**Output**

    admin 0.000GB
    config  0.000GB
    local 0.000GB

## Drop/Delete A Database

**Template**

    use <database_name>
    db.dropDatabase()

**Example**

    use student
    db.dropDatabase()

**Output**

    switched to db student
    { "ok" : 1 }

<p id="create_collection">

## Create A Collection

</p>
After the creation of the database, we can create multiple collections using the following commands/queries

### Syntax

```sh
db.createCollection(name, options)
```

![enter image description here](https://raw.githubusercontent.com/ishaandwivedi1234/Arclight/main/Notes/MongoDB/screentshots/1.png)

### Various Options that can be used are

![enter image description here](https://raw.githubusercontent.com/ishaandwivedi1234/Arclight/main/Notes/MongoDB/screentshots/2.png)

### Example

1.  Creating a simple collection named 'mycollection' without any options.

    db.createCollection("mycollection")

    #### Output

    { "ok" : 1 }

2.  Following example demonstrates the creation of a collection with options

           db.createCollection(
           "myCollection",
           {
            capped :  true,
            size :  6142800,
            max :  10000
           } )

    ### output

           { "ok" : 1 }

    _IMPORTANT - In MongoDB, you don't need to create collection. MongoDB creates collection automatically, when you insert some document . Following example shows how collections are created automatically when document is inserted._

    ### Create a collection while inserting first document

        db.newCollection.insert(
        {'info':'this document create a new collection'})

    #### Output

        WriteResult({ "nInserted" : 1 })

    Now, to verify that our collection is created automatically we can use `show collection` command to view all collections present in the database.

    #### Output

        myCollection
        newCollection

<p id="insert">

## Insert Documents Into Collection

</p>
MongoDB provides the following methods to insert documents into a collection:

- [`db.collection.insertOne()`] _New in version 3.2_
- [`db.collection.insertMany()`] _New in version 3.2_

### Syntax

![enter image description here](https://raw.githubusercontent.com/ishaandwivedi1234/Arclight/main/Notes/MongoDB/screentshots/3.png)

### Insert Single Documents

If we want to insert a single document, then `insert()` or `insertOne()` function can be used .

### Example

    db.myCollection.insertOne({'name':'test','branch':'ECE'})

### Output

    { "acknowledged" : true,
    "insertedId" : ObjectId("618bb6b95b1a26f0c57143fe")}

### Insert Many Documents

If we want to insert more than one document at a time, then `insertMany( )` function is used to accomplish the task.

### Example

    db.myCollection.insertMany([
    {'name':'Ishaan 	Dwivedi','branch':'CSE'},
    {'name':'Abhishek Sharma','branch':'CSE'},
    {'name':'Harsh Modi','branch':'CSE'} ])

### Output

    {
    "acknowledged" : true,
    "insertedIds" : [
    ObjectId("618b6ed510d9ab37cf6d605c"),
    ObjectId("618b6ed510d9ab37cf6d605d"),
    ObjectId("618b6ed510d9ab37cf6d605e")
    ]}


<p id="read">

## Read/Find & Filter Documents

</p>

Read operations retrieve documents from a collection i.e. query a collection for documents. MongoDB provides the following methods to read documents from a collection:

- [`db.collection.find()`]

### Syntax

![enter image description here](https://raw.githubusercontent.com/ishaandwivedi1234/Arclight/main/Notes/MongoDB/screentshots/4.png)

### Example

1.  Retrieve all documents

        db.myCollection.find({})

    ### Output

        { "_id" : ObjectId("618b6ed510d9ab37cf6d605c"), "name" :"Ishaan Dwivedi", "branch" : "CSE" }

        { "_id" : ObjectId("618b6ed510d9ab37cf6d605d"), "name" : "Abhishek Sharma", "branch" : "CSE" }

        { "_id" : ObjectId("618b6ed510d9ab37cf6d605e"), "name" : "Harsh Modi", "branch" : "CSE" }

        { "_id" : ObjectId("618bb6b95b1a26f0c57143fe"), "name" : "test", "branch" : "ECE" }

2.  Filter document

        db.myCollection.find({name:'Ishaan Dwivedi'})

    ### Output

        { "_id" : ObjectId("618b6ed510d9ab37cf6d605c"),
         "name" : "Ishaan Dwivedi", "branch" : "CSE" }

### Query Documents Conditionally

![enter image description here](https://raw.githubusercontent.com/ishaandwivedi1234/Arclight/main/Notes/MongoDB/screentshots/5.png)

<p id="update">

## Update Documents

</p>
MongoDB's **update()** and **save()** methods are used to update document into a collection. The update() method updates the values in the existing document while the save() method replaces the existing document with the document passed in save() method.

### Update Method Syntax

    db.COLLECTION_NAME.update(SELECTION_CRITERIA,UPDATED_DATA)

### Example

    db.myCollection.update({"branch":"ECE"},{$set:{"branch":"CSE"}})

#### Output

    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

### Save() Method Syntax

The **save()** method replaces the existing document with the new document passed in the save() method.

    db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})

### Example

    db.myCollection.save({
    '_id':ObjectId("618b6ed510d9ab37cf6d605c"),
    'name':'Ishaan Dwivedi',
    'branch':'CSE',
    'en' : '191b130'
    })

### Output

    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

Apart from update and save mongoDB also provides following methods to update and replace data

![enter image description here](https://raw.githubusercontent.com/ishaandwivedi1234/Arclight/main/Notes/MongoDB/screentshots/6.png)

<p id="delete">

## Delete Document(s) & Collection

</p>

MongoDB's **remove()** method is used to remove a document from the collection. remove() method accepts two parameters. One is deletion criteria and second is justOne flag.

- **deletion criteria** − (Optional) deletion criteria according to documents will be removed.
- **justOne** − (Optional) if set to true or 1, then remove only one document.

### Syntax

Basic syntax of **remove()** method is as follows −

    db.COLLECTION_NAME.remove(DELLETION_CRITTERIA)

### Example

    db.myCollection.remove({'name':'test'})

### Output

    WriteResult({"nRemoved"  :  1})

### Removing Single Document

### Example

    db.myCollection.remove({'branch':'CSE'},1)
    WriteResult({"nRemoved"  :  1})

## Remove All Documents

If you don't specify deletion criteria, then MongoDB will delete whole documents from the collection. **This is equivalent of SQL's truncate command.**

**Example**

    db.myCollection.remove({})

**Output**
WriteResult({ "nRemoved" : 2 })

## Delete Collection

### Syntax

    db.COLLECTION_NAME.drop()

### Example

    db.myCollection.drop()
    show collections

### Output

    true
    newCollection
