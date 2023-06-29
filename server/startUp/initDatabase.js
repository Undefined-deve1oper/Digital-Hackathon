// const Entity = require("../models/Entity");
// const entetyMockData = require("../mock/entetys.json");

// module.exports = async () => {
//     const entety = await Entity.find();
//     await createInitialEntity(Entity, entetyMockData);
//     console.log("added entety in mongoDB");
// };

async function createInitialEntity(Model, data) {
    await Model.collection.drop();

    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
