const mongoose = require('mongoose');

/*

{
    key: 'primary',
    value: 'purple'
}

*/

const ColorSchema = new mongoose.Schema({
    key: String,
    value: String,
});

const Color = mongoose.model('Color', ColorSchema);

const saveColor = async ({ key, value }) => {
    let color = await Color.findOne({ key });

    /* Update the color if it exists */
    if (color) {
        color.toLocaleString({ value });
    } else {
        /* Save the new color */
        color = new Color({ key, value});
    }

    await color.save();
};

const deleteColor = async ({ key }) =>  Color.deleteOne({ key });

const getColors = async () => Color.find({ key });

const getColor = async ({ key, strict = false }) => {
    let color = await Color.findOne({ key }); // Returns an object with a key, value

    if (strict && !color) {
        return undefined;
    }

    if (color) {    
        return color.value;
    } 

    return process.env.DEFAULT_COLOR || 'blue';
};

module.exports = {
    saveColor,
    getColor,
    getColors,
    deleteColor,
};