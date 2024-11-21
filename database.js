require('dotenv').config()
const mongoose = require('mongoose')
const db_name = 'gomycode';
uri = process.env.MONGO_URI
const User = require('./src/models/user')


// I didn't use the options  { useNewUrlParser : true, useUnifiedTopology : true } because they are deprecated in recent in late nodejs versions
mongoose.connect(uri).then(()=>{
    console.log(`Successfully connected to the ${db_name} database.\n--------------------------------------------------`)
}).catch(error=>{
    console.error(error);
})

//Create a new user with the model User
const newUser = new User({
    name:"Mary",
    age:50,
    favoriteFoods:["deukhine"]
});

//Save the user in the db
newUser.save().then(()=>{
    console.log(`User ${newUser.name} successfully created`)
}).catch(error=>{
    console.error(error);
})

//Create new users with model.create()
User.create(
    [
        {name:"Joe",age:26,favoriteFoods:["Burger","Mbaxal"]},
        {name:"Karim",age:26,favoriteFoods:["Chawarma","thieeb"]},
        {name:"Musaa",age:26,favoriteFoods:["Pizza"]}
    ]
).then((users)=>{
    users.forEach(user => {
        console.log(`User ${user.name} successfully created`)
    });
})


//Function to search users by name
const searchByName = async (name) => {
    try {
        const users = await User.find({name:name});
        console.log("Utilisateurs trouves: "+users)
    } catch (error) {
        console.log(error)
    }
}

//Function to search a user who likes a given food
const searchByFavoriteFood = async(food)=>{
    try {
        const users = await User.findOne({favoriteFoods:{$in:food}})
        console.log("Utilisateur qui aime le"+food+": "+users);
    } catch (error) {
        console.log(error)
    }
}

//Function to search a user wuth a specific ID
const searchById = async (id) => {
    try {
        const user = await User.findById(id)
        console.log("User found with the id received: "+user)
    } catch (error) {
        console.log(error);
    }
}




// Let's search users with the name 'Joe'
searchByName("Joe")


//Let's search a user who likes 'Yassa' lol
searchByFavoriteFood("Yaasa")

//Let's search a user with 673f58ee99728b66a235f232 as id
searchById("673f58ee99728b66a235f232")

//Function to search a yuser by his ID and add "Hamburger" to his favprite foods.
const modifyUser = async (id) => {
    const user = await User.findById(id);
    user.favoriteFoods.push("Hamburger");
    user.save().then(()=>{
        console.log("Hamburger added to his fav foods")
    }).catch(error=>{
        console.log(error)
    })
}
//Let's search a user with 673f58ee99728b66a235f232 as id and add "Hamburger" in his favorite foods
modifyUser("673f58ee99728b66a235f232")

//Function to find a user using his name and fix his age to 20
const changeUserAge = async (name) => {
    try {
    const updateUser = await User.findOneAndUpdate({name:name},{age:20},{new:true})
    console.log(updateUser)
    } catch (error) {
        console.log(error)
    }
}

//Let's modify Joe's age.
changeUserAge("Joe")

//Function to find a user with his id and delete it
const removeUserWithId = async (id) => {
    try {
        await User.findByIdAndDelete(id);
        console.log(`user with id ${id} successfully deleted`)
    } catch (error) {
        console.log(error)
    }
}
//Let's find the user with id 673f58ee99728b66a235f232 and delete it
removeUserWithId('673f58ee99728b66a235f232')

//Delete many documents with model.deleteMany() (model.remove() is deprecated)
const removeUserByName = async (name) => {
    User.deleteMany({name:name}).then(()=>{
        console.log(`all users with name ${name} have been successfully deleted`)
    }).catch(error=>{
        console.log(error)
    })
}
//Let's remove Mary
removeUserByName("Mary");

//Function to log two first uers who like burritos ordered by name
const usersLikeBurritos = async () => {
    await User.find({favoriteFoods:{$in:"burritos"}}).sort({name:1}).limit(2).select({age:0}).exec().then(users=>{
        console.log(users)
    }
    ).catch(error=>{
        console.log(error)
    })
}

usersLikeBurritos()