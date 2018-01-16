using MongoDB.Bson;
using Newtonsoft.Json;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Remoting.Contexts;
using System.Web.Script.Serialization;
using System.IO;
using Newtonsoft.Json.Linq;

namespace WebApplication1
{
    public class DbConnector
    {
        private IMongoDatabase mongoDb;
        private IMongoCollection<Restaurant> restaurantCollection;
        private IMongoCollection<Users> usersCollection;
        private IMongoCollection<Dish> dishCollection;
        private IMongoCollection<Menu> menuCollection;
        private IMongoCollection<SubMenu> subMenuCollection;
        private IMongoCollection<Table> tableCollection;
        private IMongoCollection<Order> orderCollection;



        public class JsonToWebServer
        {
            public string status;
            public string reason;
            public object items;

            public JsonToWebServer()
            {
                status = "Success";
                reason = "";
                items = "";
            }
        }


        public DbConnector(string dbName)
        {
            MongoClient mongoClient = new MongoClient();
            IMongoDatabase mongoDb = mongoClient.GetDatabase(dbName);
            restaurantCollection = mongoDb.GetCollection<Restaurant>("Restaurant");
            usersCollection = mongoDb.GetCollection<Users>("Users");
            dishCollection = mongoDb.GetCollection<Dish>("Dish");
            menuCollection = mongoDb.GetCollection<Menu>("Menu");
            subMenuCollection = mongoDb.GetCollection<SubMenu>("SubMenu");
            tableCollection = mongoDb.GetCollection<Table>("Table");
            orderCollection = mongoDb.GetCollection<Order>("Order");

        }
        // Restaurant // Restaurant // Restaurant // Restaurant // Restaurant // Restaurant // Restaurant // Restaurant // Restaurant // Restaurant // 

        //This Method get a userId, restaurant name and address and add a new restaurant to DB with automatic generation of restaurant _id,
        //#This method should get json represent restaurant. where the userId comming from?
        public void addRestaurantToDb(string userId, string restaurantName, string restaurantAddress)
        {
            Restaurant rest = new Restaurant
            {
                name = restaurantName,
                address = restaurantAddress,
                userId = new ObjectId(userId)
            };

            restaurantCollection.InsertOne(rest); // insert the restaurant into the Restaurants collection in DB
        }

        public string getRestaurantByUserId(string userId)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {

                IQueryable<Restaurant> queryResponse = restaurantCollection.AsQueryable().Where(r => r.userId == new ObjectId(userId));
                // ################### i need to check what is the response when DB is not available ###########################
                finalJsonObj.items = queryResponse;
            }

            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }

            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        public void removeRestaurantByUserId(string user_Id)
        {
            restaurantCollection.DeleteMany(r => r.userId == new ObjectId(user_Id));
        }

        public void removeRestaurantByRestaurantId(string restaurant_Id, string user_Id)
        {
            try
            {
                restaurantCollection.DeleteOne(r => (r._id == new ObjectId(restaurant_Id) && r.userId == new ObjectId(user_Id)));
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            

        }

        // This method get a restaurantId, restaurant name and address 
        //and update the corrsponding entry of that restaurantId in the Restaurant collection in DB
        // All fields will be updated (except the restaurantId and userId)
        public void editRestaurantByRestaurantId(string restId, string name, string address)
        {
            restaurantCollection.UpdateOneAsync(
                                Builders<Restaurant>.Filter.Eq("_id", new ObjectId(restId)),
                                Builders<Restaurant>.Update.Set("name", name).Set("address", address));

        }

        // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // Users // 
        //This Method get a user name and password and add a new user to DB with automatic generation of user _id,
        //#This method should get json represent restaurant. where the userId comming from?
        public void addUserToDb(string userName, string userPassword)
        {
            Users user = new Users
            {
                name = userName,
                password = userPassword
            };

            usersCollection.InsertOne(user); // insert the user into the Users collection in DB
        }

        public void removeUserByUserId(string userIdToDel)
        {
            usersCollection.DeleteOne(u => u._id == new ObjectId(userIdToDel));
        }

        // This method get a userID, name and password and update the corrsponding entry of that userId in the Users collection in DB
        // All fields will be updated (except the userId)
        public void editUserByUserId(string userId, string name, string password)
        {
            usersCollection.UpdateOneAsync(
                                Builders<Users>.Filter.Eq("_id", new ObjectId(userId)),
                                Builders<Users>.Update.Set("name", name).Set("password", password));

        }

        // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish // Dish //

        public string addDishToDb(string user_Id, string dish_Name, string dish_Description, float dish_DefaultPrice)
        {
            
            JsonToWebServer finalJsonObj = new JsonToWebServer(); // Object that contain "Status" "Reason" and "Items" to be sent as a JSON to the Application Server
            try
            {

                Dish dish = new Dish                // create the dish object to be insert to the DB by the method arguments
                {
                    name = dish_Name,
                    description = dish_Description,
                    defaultPrice = dish_DefaultPrice,
                    userId = new ObjectId(user_Id)
                };

                dishCollection.InsertOne(dish);     // insert the dish into the Dish collection in DB
                finalJsonObj.items = dish;          // adding the dish details into a JSON sent the Application Server
            }

            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";       // change status to fail in the JSON sent to the Application Server
                finalJsonObj.reason = ex.Message;   // add the ecxeoption message in the reason field of the JSON sent to the Application Server
            }

            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
           
        }

        public string getDishesByUserId(string user_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                IQueryable<Dish> queryResponse = dishCollection.AsQueryable().Where(d => d.userId == new ObjectId(user_Id));
                // ################### i need to check what is the response when DB is not available ###########################
                finalJsonObj.items = queryResponse;
            }

            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }

            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        public void removeDishByUserId(string user_Id)
        {
            dishCollection.DeleteMany(d => d.userId == new ObjectId(user_Id));
        }

        public string removeDishByDishId(string dish_Id, string user_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                var deletedDishToReturn = dishCollection.DeleteOne(d => (d._id == new ObjectId(dish_Id) && d.userId == new ObjectId(user_Id)));
                finalJsonObj.items = deletedDishToReturn;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }

            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

    
        // This method get a DishId, Dish name, Dish description and Dish default price
        // and update the corrsponding entry of that dishId in the Dish collection in DB
        // All fields will be updated (except the dishId and userId)
        public string editDishByDishId(string dish_Id, string name, string description, float default_price)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                dishCollection.UpdateOneAsync(
                                    Builders<Dish>.Filter.Eq("_id", new ObjectId(dish_Id)),
                                    Builders<Dish>.Update.Set("name", name).Set("description", description).Set("defaultPrice", default_price));

                Dish newEditedDish = dishCollection.AsQueryable().First(d => d._id == new ObjectId(dish_Id));
                finalJsonObj.items = newEditedDish;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }

            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu // Menu 
        public string addMenuToDb(string restaurant_Id, string menu_Name)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer(); // Object that contain "Status" "Reason" and "Items" to be sent as a JSON to the Application Server
            try
            {
                Menu menu = new Menu // create the menu object to be insert to the DB by the method arguments
                {
                    name = menu_Name,
                    restaurantId = new ObjectId(restaurant_Id)
                };
                menuCollection.InsertOne(menu);     // insert the menu into the Menu collection in DB
                finalJsonObj.items = menu;          // adding the menu details into a JSON sent the Application Server
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";       // change status to fail in the JSON sent to the Application Server
                finalJsonObj.reason = ex.Message;   // add the ecxeoption message in the reason field of the JSON sent to the Application Server
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        public string getMenusByRestaurantId(string restaurant_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                IQueryable<Menu> queryResponse = menuCollection.AsQueryable().Where(m => m.restaurantId == new ObjectId(restaurant_Id));
                // ################### i need to check what is the response when DB is not available ###########################
                if (queryResponse.Count() != 0) // if restaurant_Id has menus 
                {
                    finalJsonObj.items = queryResponse; // put the menus into items.
                }
                else finalJsonObj.reason = restaurant_Id; // put the restaurant_Id on the reason field
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        public void removeMenuByRestaurantId(string restaurant_Id)
        {
            menuCollection.DeleteMany(m => m.restaurantId == new ObjectId(restaurant_Id));
        }

        public string removeMenuByMenuId(string menu_Id, string restaurant_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                var deletedMenuToReturn = menuCollection.DeleteOne(m => (m._id == new ObjectId(menu_Id) && m.restaurantId == new ObjectId(restaurant_Id)));
                finalJsonObj.items = deletedMenuToReturn;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }

            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        // This method get a Menu Id and  Menu name
        // and update the corrsponding entry of that menuId in the Menu collection in DB
        // All fields will be updated (except the menuId and restaurantId)
        public string editMenuByMenuId(string menu_Id, string name)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                menuCollection.UpdateOneAsync(
                                    Builders<Menu>.Filter.Eq("_id", new ObjectId(menu_Id)),
                                    Builders<Menu>.Update.Set("name", name));

                Menu newEditedMenu = menuCollection.AsQueryable().First(m => m._id == new ObjectId(menu_Id));
                finalJsonObj.items = newEditedMenu;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu // SubMenu 
        public string addSubMenuToDb(string menu_Id, string subMenu_Name)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer(); // Object that contain "Status" "Reason" and "Items" to be sent as a JSON to the Application Server
            try
            {
                SubMenu subMenu = new SubMenu // create the SubMenu object to be insert to the DB by the method arguments
                {
                    name = subMenu_Name,
                    menuId = new ObjectId(menu_Id)
                };
                subMenuCollection.InsertOne(subMenu);     // insert the subMenu into the subMenu collection in DB
                finalJsonObj.items = subMenu;          // adding the subMenu details into a JSON sent the Application Server
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";       // change status to fail in the JSON sent to the Application Server
                finalJsonObj.reason = ex.Message;   // add the ecxeoption message in the reason field of the JSON sent to the Application Server
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        public string getSubMenusByMenuId(string menu_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                IQueryable<SubMenu> queryResponse = subMenuCollection.AsQueryable().Where(sm => sm.menuId == new ObjectId(menu_Id));
                // ################### i need to check what is the response when DB is not available ###########################
                finalJsonObj.items = queryResponse;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        public void removeSubMenuByMenuId(string menu_Id)
        {
            subMenuCollection.DeleteMany(sm => sm.menuId == new ObjectId(menu_Id));
        }

        public string removeSubMenuBySubMenuId(string subMenu_Id, string menu_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                var deletedSubMenuToReturn = subMenuCollection.DeleteOne(sm => (sm._id == new ObjectId(subMenu_Id) && sm.menuId == new ObjectId(menu_Id)));
                finalJsonObj.items = deletedSubMenuToReturn;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }

            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        // This method get a SubMenu Id and  SubMenu name
        // and update the corrsponding entry of that subMenuId in the SubMenu collection in DB
        // All fields will be updated (except the subMenuId and menuId)
        public string editSubMenuBySubMenuId(string subMenu_Id, string name)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                subMenuCollection.UpdateOneAsync(
                                    Builders<SubMenu>.Filter.Eq("_id", new ObjectId(subMenu_Id)),
                                    Builders<SubMenu>.Update.Set("name", name));

                SubMenu newEditedSubMenu = subMenuCollection.AsQueryable().First(sm => sm._id == new ObjectId(subMenu_Id));
                finalJsonObj.items = newEditedSubMenu;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }



        // Template for testing: {"subMenu_Id":"583cb590422ce433e4abec81","items":[{"Id":"ABCD"},{"Id":"EFGH"},{"Id":"IJKL"}]}
        public string updateSubMenuDishList(string json)
        {
            // Create a temoplate of Json i get from Lior
            dynamic jsonObjectItems = new JObject();
            dynamic jsonObjectID1 = new JObject();
            jsonObjectID1.Id = "aa";
            dynamic jsonObjectID2 = new JObject();
            jsonObjectID2.Id = "bb";
            dynamic jsonObjectID3 = new JObject();
            jsonObjectID3.Id = "cc";

            JArray idList = new JArray();
            idList.Add(jsonObjectID1);
            idList.Add(jsonObjectID2);
            idList.Add(jsonObjectID3);
            //jsonObjectItems.subMenu_Id = subMenu_Id;
            jsonObjectItems.items = idList;

            // Beginning of actual method

            string updateDishesJsonString = JsonConvert.SerializeObject(jsonObjectItems);
            dynamic updateDishesJsonObj = JsonConvert.DeserializeObject(json);
            List<string> dishesList = new List<string>(); // A list to hold all new updated dishes
           
            foreach (var obj in updateDishesJsonObj.items) // for every dish in under items key in updateDishesJsonObj
            {
                dishesList.Add((string)obj.Id); // add the id to the dishesList
            }

            string[] dishesArray = dishesList.ToArray();
            //return dishesArray[2];

            JsonToWebServer finalJsonObj = new JsonToWebServer();
            string subMenu_Id = (string)updateDishesJsonObj.subMenu_Id; // extract the subMenu_Id from the json string argument
            try
            {
                subMenuCollection.UpdateOneAsync(
                                    Builders<SubMenu>.Filter.Eq("_id", new ObjectId(subMenu_Id)),
                                    Builders<SubMenu>.Update.Set("dishArray", dishesArray));
            
                SubMenu newEditedSubMenu = subMenuCollection.AsQueryable().First(sm => sm._id == new ObjectId(subMenu_Id));
                finalJsonObj.items = newEditedSubMenu;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;

        }

        // Table // Table // Table // Table // Table // Table // Table // Table // Table // Table // Table // Table  Table // Table // Table // Table  // Table // Table  // Table 
        public string addTableToDb(string restaurant_Id, int table_Num)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer(); // Object that contain "Status" "Reason" and "Items" to be sent as a JSON to the Application Server
            try
            {
                Table table = new Table // create the table object to be insert to the DB by the method arguments
                {
                    tableNum = table_Num,
                    restaurantId = new ObjectId(restaurant_Id),
                    available = true
                };
                tableCollection.InsertOne(table);     // insert the table into the Table collection in DB
                finalJsonObj.items = table;          // adding the table details into a JSON sent the Application Server
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";       // change status to fail in the JSON sent to the Application Server
                finalJsonObj.reason = ex.Message;   // add the ecxeoption message in the reason field of the JSON sent to the Application Server
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }
    
        public string getTablesByRestaurantId(string restaurant_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                IQueryable<Table> queryResponse = tableCollection.AsQueryable().Where(m => m.restaurantId == new ObjectId(restaurant_Id));
                // ################### i need to check what is the response when DB is not available ###########################
                if (queryResponse.Count() != 0) // if restaurant_Id has tables 
                {
                    finalJsonObj.items = queryResponse; // put the tables into items.
                }
                else finalJsonObj.reason = restaurant_Id; // put the restaurant_Id on the reason field
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }
    
        public void removeTableByRestaurantId(string restaurant_Id)
        {
            tableCollection.DeleteMany(m => m.restaurantId == new ObjectId(restaurant_Id));
        }
    
        public string removeTableByTableId(string table_Id, string restaurant_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                var deletedTableToReturn = tableCollection.DeleteOne(t => (t._id == new ObjectId(table_Id) && t.restaurantId == new ObjectId(restaurant_Id)));
                finalJsonObj.items = deletedTableToReturn;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
    
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        // This method get a Table Id, Table number and table status (Available)
        // and update the corrsponding entry of that tableId in the Table collection in DB
        // All fields will be updated (except the tableId and restaurantId)
        public string editTableByTableId(string table_Id, int table_Num, bool table_Available)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                tableCollection.UpdateOneAsync(
                                    Builders<Table>.Filter.Eq("_id", new ObjectId(table_Id)),
                                    Builders<Table>.Update.Set("tableNum", table_Num).Set("available", table_Available));


                Table newEditedTable = tableCollection.AsQueryable().First(t => t._id == new ObjectId(table_Id));
                finalJsonObj.items = newEditedTable;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        //This method change the table status. If available is true it change it to false and vice versa.
        // it will return the table details (id, number and status after the change)
          public string changeTableStatusByTableId(string table_Id)
          {
              Table table = tableCollection.AsQueryable().First(t => t._id == new ObjectId(table_Id)); // put the table parameters into table object to use later
        
              JsonToWebServer finalJsonObj = new JsonToWebServer();
              try
              {
                  tableCollection.UpdateOneAsync(
                                      Builders<Table>.Filter.Eq("_id", new ObjectId(table_Id)),
                                      Builders<Table>.Update.Set("available", !table.available)); // change the table status
        
        
                  Table newEditedTable = tableCollection.AsQueryable().First(t => t._id == new ObjectId(table_Id));
                  finalJsonObj.items = newEditedTable;
              }
              catch (Exception ex)
              {
                  finalJsonObj.status = "Fail";
                  finalJsonObj.reason = ex.Message;
              }
              string finalJson = JsonConvert.SerializeObject(finalJsonObj);
              return finalJson;
          }


        //This method change the table status to Not Available (False)
        public string changeTableStatusFalseByTableId(string table_Id)
        
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                tableCollection.UpdateOneAsync(
                                    Builders<Table>.Filter.Eq("_id", new ObjectId(table_Id)),
                                    Builders<Table>.Update.Set("available", false)); // change the table status to False


                Table newEditedTable = tableCollection.AsQueryable().First(t => t._id == new ObjectId(table_Id));
                finalJsonObj.items = newEditedTable;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        //This method change the table status to Not Available (True)
        public string changeTableStatusTrueByTableId(string table_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer();
            try
            {
                tableCollection.UpdateOneAsync(
                                    Builders<Table>.Filter.Eq("_id", new ObjectId(table_Id)),
                                    Builders<Table>.Update.Set("available", true)); // change the table status to False


                Table newEditedTable = tableCollection.AsQueryable().First(t => t._id == new ObjectId(table_Id));
                finalJsonObj.items = newEditedTable;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }
        // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order // Order 
        public string addOrderToDb(string table_Id)
        {
            JsonToWebServer finalJsonObj = new JsonToWebServer(); // Object that contain "Status" "Reason" and "Items" to be sent as a JSON to the Application Server
            try
            {
                Order order = new Order // create the Order object to be insert to the DB by the method arguments
                {
                    tableId = new ObjectId(table_Id),
                    date = DateTime.Now, // set the date to the current date when order was issued 
                    orderSum = 0 // initialize the order sum to "0"
                };
                changeTableStatusFalseByTableId(table_Id);
                orderCollection.InsertOne(order);     // insert the subMenu into the subMenu collection in DB
                finalJsonObj.items = order;          // adding the subMenu details into a JSON sent the Application Server
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";       // change status to fail in the JSON sent to the Application Server
                finalJsonObj.reason = ex.Message;   // add the ecxeoption message in the reason field of the JSON sent to the Application Server
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;
        }

        // Template for testing: {"order_Id":"583cb590422ce433e4abec81","order_Sum":"45.7","items":[{"Id":"ABCD"},{"Id":"EFGH"},{"Id":"IJKL"}]}
        public string updateOrderDishList(string updatedOrderJson)
        {
            dynamic jsonObjectItems = new JObject();


            string updateDishesJsonString = JsonConvert.SerializeObject(jsonObjectItems);
            dynamic updateDishesJsonObj = JsonConvert.DeserializeObject(updatedOrderJson);
            List<string> dishesList = new List<string>(); // A list to hold all new updated dishes

            foreach (var obj in updateDishesJsonObj.items) // for every dish in under items key in updateDishesJsonObj
            {
                dishesList.Add((string)obj.Id); // add the id to the dishesList
            }

            JsonToWebServer finalJsonObj = new JsonToWebServer();
            string order_Id = (string)updateDishesJsonObj.order_Id; // extract the order_Id from the json string argument
            float newOrderSum = (float)updateDishesJsonObj.order_Sum; // extract the new order sum from the json string argument
            try
            {
                orderCollection.UpdateOneAsync(
                                    Builders<Order>.Filter.Eq("_id", new ObjectId(order_Id)),
                                    Builders<Order>.Update.Set("dishList", dishesList)
                                                          .Set("orderSum", newOrderSum));

                Order newEditedOrder = orderCollection.AsQueryable().First(o => o._id == new ObjectId(order_Id));
                finalJsonObj.items = newEditedOrder;
            }
            catch (Exception ex)
            {
                finalJsonObj.status = "Fail";
                finalJsonObj.reason = ex.Message;
            }
            string finalJson = JsonConvert.SerializeObject(finalJsonObj);
            return finalJson;

        }



        // General Methods // General Methods // General Methods // General Methods // General Methods // General Methods // General Methods // General Methods // General Methods // 
        private string convertQueryToJson(IQueryable<Restaurant> query)
        {
            var json = JsonConvert.SerializeObject(query); // Turn the query into Json String
            return json;
        }

    }
}