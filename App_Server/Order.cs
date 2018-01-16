using MongoDB.Bson;
using System;
using System.Collections.Generic;

namespace WebApplication1
{
    public class Order
    {
        public ObjectId _id;
        public ObjectId tableId;
        public DateTime date;
        public float orderSum;
        public float sumPaid;
        public List<string> dishList;
    }
}