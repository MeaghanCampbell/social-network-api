const { Thought, User } = require('../models')

const thoughtController = {
    
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    //get a thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' })
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    // post a thought
    addThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true, runValidators: true }
          );
      })
      .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    // update a thought
    // updateThought({ params, body }, res) {
    //     Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    //     .then(({ _id }) => {
    //         return User.findOneAndUpdate(
    //           { _id: params.userId },
    //           { $ : { thoughts: _id } },
    //           { new: true }
    //         );
    //       })
    //       .then(dbUserData => {
    //         if (!dbUserData) {
    //           res.status(404).json({ message: 'No user found with this id!' });
    //           return;
    //         }
    //         res.json(dbUserData);
    //       })
    //       .catch(err => res.json(err));
    // },

    // delete a thought
    removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
          if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
          );
      })
      .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController