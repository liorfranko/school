﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1
{
    public class Table
    {
        public ObjectId _id;
        public ObjectId restaurantId;
        public int tableNum;
        public bool available;
    }
}