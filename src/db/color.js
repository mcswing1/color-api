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
    let color = await Color.find({ key });

    /* Update the color if it exists */
    if (color) {
        color.toLocaleString({ value });
    } else {
        /* Save the new color */
        color = new Color({ key, value});
    }

    await color.save();
};

const getColors = async () => Color.find({ key });

const getColor = async ({ key }) => {
    let color = await Color.findOne({ key }); // Returns an object with a key, value

    if (!color) {
        return color.value || 'blue';
    } 
        
    return process.env.DEFAULT_COLOR || 'blue';
};

module.exports = {
    saveColor,
    getColor,
    getColors,
};