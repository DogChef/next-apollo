const resolvers = {
  Query: {
    getUsers: (parent, args, { db }) => db.user.findAll(),
    getUser: (parent, { id }, { db }) => db.user.findByPk(id)
  },

  Mutation: {
    createUser: (parent, { name }, { db }) =>
      db.user.create({
        name: name
      }),
    updateUser: (parent, { id, name }, { db }) =>
      db.user.update(
        {
          name: name
        },
        { where: { id: id } }
      )
  }
};

export default resolvers;
