import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import {
  UserInputError,
  AuthenticationError,
  ApolloError
} from "apollo-server-micro";

const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const secret = "supersecret";
const movies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
  "The Good, the Bad and the Ugly",
  "Fight Club",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Star Wars: Episode V - The Empire Strikes Back",
  "Forrest Gump",
  "Inception",
  "The Lord of the Rings: The Two Towers",
  "One Flew Over the Cuckoo's Nest",
  "Goodfellas",
  "The Matrix",
  "Seven Samurai",
  "Star Wars: Episode IV - A New Hope",
  "City of God",
  "Se7en",
  "The Silence of the Lambs",
  "It's a Wonderful Life",
  "Life Is Beautiful",
  "The Usual Suspects",
  "Léon: The Professional",
  "Spirited Away",
  "Saving Private Ryan",
  "Once Upon a Time in the West",
  "American History X",
  "Interstellar",
  "Casablanca",
  "City Lights",
  "Psycho",
  "The Green Mile",
  "The Intouchables",
  "Modern Times",
  "Raiders of the Lost Ark",
  "Rear Window",
  "The Pianist",
  "The Departed",
  "Terminator 2: Judgment Day",
  "Back to the Future",
  "Whiplash",
  "Gladiator",
  "Memento",
  "The Prestige",
  "The Lion King",
  "Apocalypse Now",
  "Alien",
  "Sunset Boulevard",

  "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",

  "The Great Dictator",
  "Cinema Paradiso",
  "The Lives of Others",
  "Grave of the Fireflies",
  "Paths of Glory",
  "Django Unchained",
  "The Shining",
  "WALL·E",
  "American Beauty",
  "The Dark Knight Rises",
  "Princess Mononoke",
  "Aliens",
  "Oldboy",
  "Once Upon a Time in America",
  "Witness for the Prosecution",
  "Das Boot",
  "Citizen Kane",
  "North by Northwest",
  "Vertigo",
  "Star Wars: Episode VI - Return of the Jedi",
  "Reservoir Dogs",
  "Braveheart",
  "M",
  "Requiem for a Dream",
  "Amélie",
  "A Clockwork Orange",
  "Like Stars on Earth",
  "Taxi Driver",
  "Lawrence of Arabia",
  "Double Indemnity",
  "Eternal Sunshine of the Spotless Mind",
  "Amadeus",
  "To Kill a Mockingbird",
  "Toy Story 3",
  "Logan",
  "Full Metal Jacket",
  "Dangal",
  "The Sting",
  "2001: A Space Odyssey",
  "Singin' in the Rain",
  "Toy Story",
  "Bicycle Thieves",
  "The Kid",
  "Inglourious Basterds",
  "Snatch",
  "3 Idiots",
  "Monty Python and the Holy Grail"
];

const setTokens = ({ dataValues: { id, email } }) => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    id: id
  };

  const accessToken = jwt.sign({ user: accessUser }, secret, {
    expiresIn: fifteenMins
  });

  const refreshUser = {
    id: id
  };

  const refreshToken = jwt.sign({ user: refreshUser }, secret, {
    expiresIn: sevenDays
  });

  return { accessToken, refreshToken };
};

const authenticated = next => (root, args, context, info) => {
  if (!context.currentUserId) {
    throw new AuthenticationError("No user detected, please log in.");
  }

  return next(root, args, context, info);
};

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  }),

  Query: {
    verifyUser: (parent, args, { dataSources: { db }, currentUserId }) =>
      db.user.findByPk(currentUserId),
    getUser: (parent, { id }, { dataSources: { db } }) => db.user.findByPk(id),
    getUsers: authenticated(
      (parent, args, { dataSources: { db }, currentUser }) => db.user.findAll()
    ),

    getArticle: (parent, { id }, { dataSources: { db } }) =>
      db.article.findByPk(id),
    getArticles: authenticated((parent, args, { dataSources: { db } }) =>
      db.article.findAll()
    ),

    getArticleModifications: authenticated(
      (parent, { id }, { dataSources: { db } }) =>
        db.articleModification.findAll({ where: { articleId: id } })
    ),

    getSearchFiltered: authenticated(
      (parent, { value }, { dataSources: { db } }) => {
        console.log(value);
        if (value.length > 2) {
          return movies;
        }
      }
    ),

    getTag: (parent, { id }, { dataSources: { db } }) => db.tag.findByPk(id),
    getTags: (parent, args, { dataSources: { db } }) => db.tag.findAll()
  },

  Mutation: {
    signUpUser: (parent, { userInput }, { dataSources: { db }, res }) =>
      db.user
        .create(userInput)
        .then(user => {
          const tokens = setTokens(user);
          res.setHeader("Set-Cookie", `token=${tokens.accessToken}; httpOnly`);
          return user;
        })
        .catch(err => {
          throw new UserInputError(
            "There's already an account with this email"
          );
        }),
    logInUser: (
      parent,
      { userInput: { email, password } },
      { dataSources: { db }, res }
    ) =>
      db.user
        .findOne({ where: { email: email } })
        .then(user => {
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              const tokens = setTokens(user);
              res.setHeader(
                "Set-Cookie",
                `token=${tokens.accessToken}; httpOnly`
              );
              return user;
            } else {
              throw null;
            }
          } else {
            throw null;
          }
        })
        .catch(err => {
          throw new UserInputError(
            "The email and password you entered did not match our records. Please double-check and try again."
          );
        }),
    createArticle: authenticated(
      (parent, { articleInput }, { dataSources: { db }, currentUserId }) =>
        db.article.create({ ...articleInput, authorId: currentUserId })
    ),
    updateArticle: authenticated(
      (parent, { articleInput }, { dataSources: { db }, currentUserId }) =>
        db.article
          .findByPk(articleInput.id)
          .then(article =>
            article.update(articleInput).then(updated =>
              db.articleModification
                .findOne({
                  where: {
                    userId: currentUserId,
                    articleId: article.dataValues.id
                  },
                  order: [["updatedAt", "DESC"]]
                })
                .then(articleModification => {
                  const updatedArticle = updated.dataValues;
                  const updatedData = {
                    userId: currentUserId,
                    articleId: updatedArticle.id,
                    title: updatedArticle.title,
                    body: updatedArticle.body,
                    authorId: updatedArticle.authorId
                  };

                  if (
                    articleModification?.dataValues &&
                    moment(articleModification.dataValues.updatedAt).isSame(
                      moment(),
                      "minute"
                    )
                  ) {
                    articleModification.update(updatedData);
                  } else {
                    db.articleModification.create(updatedData);
                  }

                  return updated;
                })
            )
          )
          .catch(err => {
            throw new ApolloError(err);
          })
    ),
    toggleFavourite: authenticated(
      (parent, { articleId }, { dataSources: { db }, currentUserId }) =>
        db.favouriteArticle
          .findOne({ where: { userId: currentUserId, articleId: articleId } })
          .then(favouriteArticle => {
            if (favouriteArticle) {
              favouriteArticle.destroy();
              return false;
            } else {
              db.favouriteArticle.create({
                userId: currentUserId,
                articleId: articleId
              });
              return true;
            }
          })
    )
  },
  User: {
    articles: user => user.getArticles(),
    favourites: user => user.getFavourites()
  },
  Article: {
    author: article => article.getAuthor(),
    tags: article => article.getTags(),
    parent: article => article.getParent(),
    children: article => article.getChildren(),
    favourited: (article, args, { dataSources: { db }, currentUserId }) =>
      db.favouriteArticle
        .findOne({ where: { userId: currentUserId, articleId: article.id } })
        .then(favouriteArticle => !!favouriteArticle),
    rootPath: async article => {
      const path = [];

      var parent = article.parentId ? article : null;

      while (parent) {
        const newParent = await parent.getParent();
        if (newParent?.dataValues) {
          path.push(`${newParent.dataValues.title}-${newParent.dataValues.id}`);
          parent = newParent;
        } else {
          parent = null;
        }
      }

      return path.reverse();
    }
  },
  ArticleModification: {
    user: articleModification => articleModification.getUser(),
    author: articleModification => articleModification.getAuthor()
  },
  Tag: {
    articles: tag => tag.getArticles()
  }
};

export default resolvers;
