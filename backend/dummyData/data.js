const users = [
    {
        "_id": "user_101",
        "username": "Amit Sharma",
        "email": "amit@example.com"
    },
    {
        "_id": "user_102",
        "username": "Priya Verma",
        "email": "priya@example.com"
    },
    {
        "_id": "user_103",
        "username": "Rohan Singh",
        "email": "rohan@example.com"
    },
    {
        "_id": "user_104",
        "username": "Neha Kapoor",
        "email": "neha@example.com"
    },
    {
        "_id": "user_105",
        "username": "Vikas Mehra",
        "email": "vikas@example.com"
    }
]

const transactions = [
    {
        "_id": "exp_001",
        "userId": "user_101",
        "description": "Grocery shopping",
        "paymentType": "UPI",
        "category": "Food",
        "amount": 840,
        "location": "Mumbai, India",
        "date": "2025-02-01"
    },
    {
        "_id": "exp_002",
        "userId": "user_101",
        "description": "Auto fare",
        "paymentType": "Cash",
        "category": "Transport",
        "amount": 120,
        "location": "Mumbai, India",
        "date": "2025-02-02"
    },
    {
        "_id": "exp_003",
        "userId": "user_102",
        "description": "Mobile recharge",
        "paymentType": "UPI",
        "category": "Utilities",
        "amount": 299,
        "location": "Delhi, India",
        "date": "2025-02-03"
    },
    {
        "_id": "exp_004",
        "userId": "user_102",
        "description": "Lunch at restaurant",
        "paymentType": "Card",
        "category": "Food",
        "amount": 560,
        "location": "Delhi, India",
        "date": "2025-02-04"
    },
    {
        "_id": "exp_005",
        "userId": "user_103",
        "description": "Movie tickets",
        "paymentType": "Card",
        "category": "Entertainment",
        "amount": 450,
        "location": "Pune, India",
        "date": "2025-02-05"
    },
    {
        "_id": "exp_006",
        "userId": "user_103",
        "description": "Bus pass renewal",
        "paymentType": "UPI",
        "category": "Transport",
        "amount": 600,
        "location": "Pune, India",
        "date": "2025-02-06"
    },
    {
        "_id": "exp_007",
        "userId": "user_104",
        "description": "Gym membership",
        "paymentType": "Card",
        "category": "Fitness",
        "amount": 1500,
        "location": "Bangalore, India",
        "date": "2025-02-07"
    },
    {
        "_id": "exp_008",
        "userId": "user_104",
        "description": "Coffee",
        "paymentType": "Cash",
        "category": "Food",
        "amount": 150,
        "location": "Bangalore, India",
        "date": "2025-02-07"
    },
    {
        "_id": "exp_009",
        "userId": "user_105",
        "description": "Electricity bill",
        "paymentType": "NetBanking",
        "category": "Utilities",
        "amount": 1350,
        "location": "Hyderabad, India",
        "date": "2025-02-08"
    },
    {
        "_id": "exp_010",
        "userId": "user_105",
        "description": "Dinner at restaurant",
        "paymentType": "UPI",
        "category": "Food",
        "amount": 780,
        "location": "Hyderabad, India",
        "date": "2025-02-08"
    }
]

export { users, transactions }