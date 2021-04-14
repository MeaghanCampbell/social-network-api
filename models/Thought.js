const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            // user that created reaction
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
            // use getter method
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
        // use getter method
    },
    username: {
        // user that created thought
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
)

// virtual to get the total reaction count on a thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;